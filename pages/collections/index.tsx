import React from "react"
import Head from "next/head"
import groq from "groq"
import { ImageTag, Main, Section } from "@/components"
import { sanityClient } from "@/utils"
import { GetStaticPropsResult } from "next/types"
import Link from "next/link"

interface props {
  page: {
    store: {
      title: string
      slug: string
      imageUrl: string
    }
  }[]
}

export default function Page({ page }: props) {
  if (!page) return null

  const renderCollection = () =>
    page &&
    page.map((collection) => {
      const { store } = collection
      const { title, slug, imageUrl } = store
      console.log(collection, "collection")

      return (
        <Link
          href={`/collections/${slug}`}
          className="max-w-screen m-4 block h-screen overflow-hidden rounded-3xl"
        >
          <ImageTag src={imageUrl} />
        </Link>
      )
    })

  return (
    <>
      <Head>
        <title>Collection</title>
      </Head>
      <Main className="pb-0 pt-0">
        <Section className="pb-0 pt-0">{renderCollection()}</Section>
      </Main>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<props>> {
  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "collection" && !(_id in path('drafts.**'))] {
        store {
          title,
          "slug": slug.current,
          imageUrl
        },
      }`
    )

    if (!page) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        page,
      },
      revalidate: 30,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
