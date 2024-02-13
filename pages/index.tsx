import Head from "next/head"
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
  const { seo, collections } = page

  return (
    <>
      <MetaTags seo={seo} />
      <Main withPadding={false}>
        <Carousel collections={collections} />
        <HorizontalFeed title={"New In Men"} data={[]} href={`/shop/men`} />
        <AboutUs />
        <NewArrivals />
        <Category />
        <VideoPlayer videoSrc={"/static/video/y2.mp4"} />
        <HorizontalFeed title={"New In Women"} data={[]} href={`/shop/women`} />
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
      body,
      hero,
      seo,
      modules[] {
        ...
      },
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
          },
      },
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
