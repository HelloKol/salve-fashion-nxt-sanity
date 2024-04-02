import React from "react"
import groq from "groq"
import {
  Container,
  Grid,
  ImageTag,
  Main,
  Section,
  ProductItem,
  Seo,
} from "@/components"
import { graphqlClient, sanityClient } from "@/utils"
import { GetStaticPropsResult } from "next/types"
import { COLLECTION_PRODUCTS } from "@/services/queries"
import { SeoType, ShopifyProduct } from "@/types"

interface props {
  page: {
    store: {
      title: string
      descriptionHtml: string
      imageUrl: string
    }
    seo: SeoType
  }
  collectionByHandle: {
    collection: {
      products: {
        edges: {
          node: ShopifyProduct
        }[]
      }
    }
  }
}

export default function Page({ page, collectionByHandle }: props) {
  if (!page) return null
  const { store, seo } = page
  const { collection } = collectionByHandle
  const { title, descriptionHtml, imageUrl } = store

  const renderProducts = () =>
    collection?.products &&
    collection.products.edges.map((product: any, index: any) => {
      const { node } = product
      const { variants } = node
      // Find the first available variant
      const availableVariant = variants?.edges.find(
        (variant: any) => variant.node.availableForSale
      )
      if (!availableVariant) return null
      const { node: firstVariant } = availableVariant

      return (
        <li
          key={index}
          className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <ProductItem product={firstVariant} node={node} />
        </li>
      )
    })

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid withRowGap={false}>
              <h1 className="col-span-full mb-7 text-center text-5xl text-deepPurple md:text-6xl lg:text-7xl xl:text-8xl">
                {title}
              </h1>

              <div className="text-md col-span-full mb-8 text-center md:col-start-2 md:col-end-12 lg:col-start-3 lg:col-end-11 xl:col-start-4 xl:col-end-10">
                <article
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>

              <div className="col-span-full mb-8 h-screen w-full overflow-hidden rounded-md xl:mb-14">
                <ImageTag src={imageUrl} />
              </div>

              <Grid
                as={"ul"}
                className="col-span-full mt-4 xl:mt-8"
                withRowGap={false}
              >
                {!collection?.products?.edges.length ? (
                  <h3 className="col-span-full mb-8 text-center text-xl">
                    <b className="mb-2 block">We&apos;re sorry,</b>
                    We can&apos;t seem to find any results
                  </h3>
                ) : (
                  renderProducts()
                )}
              </Grid>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}

export async function getStaticPaths() {
  const response = await sanityClient.fetch(
    groq`*[_type == "collection" && !(_id in path('drafts.**'))] {
      store {
        slug
      }
    }`
  )

  const paths = response.map(
    (item: { store: { slug: { current: string } } }) => ({
      params: { slug: item.store.slug.current },
    })
  )

  return {
    paths: paths,
    fallback: false,
  }
}

interface params {
  params: any
}

export async function getStaticProps({
  params,
}: params): Promise<GetStaticPropsResult<props>> {
  const { slug } = params

  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "collection" && store.slug.current == $slug && !(_id in path('drafts.**'))][0] {
        ...
      }`,
      { slug: slug }
    )

    const variables = {
      handle: page.store.slug.current,
    }

    const collectionByHandle: {
      collection: {
        products: {
          edges: {
            node: ShopifyProduct
          }[]
        }
      }
    } = await graphqlClient.request(COLLECTION_PRODUCTS, variables)

    if (!page) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        page,
        collectionByHandle,
      },
      revalidate: 30,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
