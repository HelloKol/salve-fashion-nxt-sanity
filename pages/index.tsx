import { GetStaticPropsResult } from "next/types"
import groq from "groq"
import {
  AboutUs,
  Carousel,
  Category,
  FollowUs,
  HorizontalFeed,
  Main,
  MetaTags,
  NewArrivals,
  VideoPlayer,
} from "@/components"
import { ShopifyProduct } from "@/types"
import { ALL_PRODUCTS } from "@/services/queries"
import { graphqlClient } from "@/utils/graphql"
import { sanityClient } from "@/utils"

interface props {
  page: any
  products: ShopifyProduct[]
  instagramAccount: any
  instagramPosts: any
}

export default function Page({
  page,
  products,
  instagramAccount,
  instagramPosts,
}: props): JSX.Element | null {
  if (!page) return null
  const {
    seo,
    hero,
    categories,
    newArrivalFeed,
    productFeedMen,
    productFeedWomen,
    videoUrl,
  } = page
  const { collections } = hero
  console.log(page)

  return (
    <>
      <MetaTags seo={seo} />
      <Main withPadding={false}>
        <Carousel collections={collections} />
        <HorizontalFeed
          title={"New In Men"}
          productsData={productFeedMen}
          href={`/shop/men`}
        />
        <AboutUs />
        <NewArrivals data={newArrivalFeed} />
        <Category data={categories} />
        <VideoPlayer videoSrc={videoUrl} />
        {/* <VideoPlayer videoSrc={"/static/video/y2.mp4"} /> */}
        <HorizontalFeed
          title={"New In Women"}
          productsData={productFeedWomen}
          href={`/shop/women`}
        />
        <FollowUs
          title={"Follow us on instagram"}
          instagramAccount={instagramAccount}
          instagramPosts={instagramPosts}
        />
      </Main>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<props>> {
  try {
    const page: any = await sanityClient.fetch(
      groq`*[_type == "home" && !(_id in path('drafts.**'))][0] {
        ...,
        hero {
          collections[]-> {
            ...,
            modules[] {
              ...,
              image{
                _type,
                asset->{
                  _id,
                  url
                }
              }
            }
          }
        },
        categories {
          blockImages {
            _type,
            variant,
            modules[] {
              _type,
              variant,
              callToAction {
                links[] {
                  _key,
                  "url": *[_id == ^.reference._ref][0].slug,
                  _type
                },
              },
              image{
                _type,
                asset->{
                  _id,
                  url
                }
              },
            }
          }
        },
        newArrivalFeed {
          title,
          text,
          productWithVariant[] {
            "product": *[_id == ^.product._ref][0],
            "variant": *[_id == ^.variant._ref][0]
          },
        },
        productFeedMen {
          title,
          text,
          links[] {
            _key,
            title,
            "url": *[_id == ^.reference._ref][0].slug,
            _type
          },
          productWithVariant[] {
            "product": *[_id == ^.product._ref][0],
            "variant": *[_id == ^.variant._ref][0]
          },
        },
        productFeedWomen {
          title,
          text,
          links[] {
            _key,
            title,
            "url": *[_id == ^.reference._ref][0].slug,
            _type
          },
          productWithVariant[] {
            "product": *[_id == ^.product._ref][0],
            "variant": *[_id == ^.variant._ref][0]
          },
        }
      }
    `
    )

    const products: any = await graphqlClient.request(ALL_PRODUCTS)

    const instagramAccountRes = await fetch(
      `https://salvefashion.com/api/instagramAccount?accessToken=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
    )
    const instagramAccount = await instagramAccountRes.json()
    const instagramPostsRes = await fetch(
      `https://salvefashion.com/api/instagramPosts?accessToken=${process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN}`
    )
    const instagramPostsData = await instagramPostsRes.json()
    const instagramPosts = instagramPostsData.data ?? []

    if (!page)
      return {
        notFound: true,
      }

    return {
      props: {
        page,
        products: products.products.edges,
        instagramAccount,
        instagramPosts,
      },
      revalidate: 30,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
