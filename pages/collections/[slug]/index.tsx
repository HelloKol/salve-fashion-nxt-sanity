import React from "react"
import Link from "next/link"
import Head from "next/head"
import groq from "groq"
import { Button, Container, Grid, ImageTag, Section } from "@/components"
import { graphqlClient, sanityClient } from "@/utils"
import styles from "./styles.module.scss"
import { GetStaticPropsResult } from "next/types"
import { gql } from "@apollo/client"
import { COLLECTION_PRODUCTS } from "@/services/queries"

interface props {
  page: any
  collectionByHandle: any
}

export default function Page({ page, collectionByHandle }: props) {
  if (!page) return null
  const { store } = page
  const { collection } = collectionByHandle
  const { products } = collection
  const { title, descriptionHtml, slug, imageUrl } = store
  console.log(products, "products")

  const renderImage = (variant) =>
    variant.map((product) => {
      const { image } = product
      return <ImageTag src={image.transformedSrc} />
    })

  const renderPrice = (variant) =>
    variant.map((product) => {
      const { price } = product
      return price.amount
    })

  const renderProducts = () =>
    products.edges.map((item: any, index: any) => {
      const { node } = item
      const { title, handle, variants } = node

      return (
        <li
          key={index}
          className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <Link href={`/shop/product/${handle}`} className="block">
            <div
              className={`group relative h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[500px] lg:h-[600px] ${styles.imageWrapper}`}
            >
              {renderImage(variants?.nodes)}

              <div
                className={`duration-250 absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 opacity-0 transition-opacity ease-in-out group-hover:opacity-100 ${styles.feedInner}`}
              >
                <div
                  className={`flex items-center justify-center ${styles.feedInner}`}
                >
                  <div className={`flex flex-col gap-4`}>
                    <Button variant={"quaternary"}>Add to cart</Button>
                    <Button variant={"secondary"}>Learn more</Button>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold uppercase text-gray-600 lg:text-lg">
              {title}
            </p>
            <p className="mt-2 text-sm font-bold uppercase lg:text-lg">
              £{renderPrice(variants?.nodes)}
            </p>
          </Link>
        </li>
      )
    })

  return (
    <>
      <Head>
        <title>Collection</title>
      </Head>
      <Section>
        <Container>
          <div className="relative col-span-full h-[330px] w-full sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[600px]">
            <ImageTag src={imageUrl} />

            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-opacity-60 ">
              <div className="absolute bottom-0 top-1/2 flex max-w-4xl -translate-y-1/2 flex-col justify-center px-4 bg-blend-overlay sm:px-14 md:px-36 lg:left-1/2 lg:max-w-2xl lg:-translate-x-1/2 lg:px-0">
                <h1 className="text-center text-3xl uppercase text-gray-400 sm:text-4xl md:text-5xl lg:text-6xl">
                  {title}
                </h1>

                <article
                  className="text-center text-sm text-gray-400 md:mt-2 md:text-lg lg:mt-4 lg:text-xl"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />
              </div>
            </div>
          </div>

          <Grid
            as={"ul"}
            className="col-span-full mt-4 xl:mt-8"
            withRowGap={false}
          >
            <p className="col-span-full mb-4 text-sm font-bold lg:mb-6 xl:mb-8">
              {products.edges.length} products
            </p>
            {renderProducts()}
          </Grid>
        </Container>
      </Section>
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

    const collectionByHandle: any = await graphqlClient.request(
      COLLECTION_PRODUCTS,
      variables
    )

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
