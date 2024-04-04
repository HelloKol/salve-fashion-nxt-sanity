import React, { useState } from "react"
import groq from "groq"
import { ImageTag, Main, Section, Seo } from "@/components"
import { sanityClient } from "@/utils"
import { GetStaticPropsResult } from "next/types"
import Link from "next/link"
import { SeoType } from "@/types"

interface Collection {
  store: {
    title: string
    slug: string
    imageUrl: string
  }
}

interface props {
  page: {
    seo: SeoType
  }
  collections: Collection[]
}

export default function Page({ page, collections }: props) {
  const [titlePosition, setTitlePosition] = useState({ x: 0, y: 0 })
  if (!page) return null
  const { seo } = page

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setTitlePosition({ x: event.clientX, y: event.clientY })
  }

  const renderCollection = () =>
    collections &&
    collections.map((collection) => {
      const { store } = collection
      if (!store) return null
      const { title, slug, imageUrl } = store
      if (!imageUrl) return null

      return (
        <Link
          href={`/collections/${slug}`}
          key={slug}
          className="max-w-screen relative m-4 block h-screen overflow-hidden rounded-md"
          onMouseMove={handleMouseMove}
        >
          <h1
            className="absolute z-10 text-3xl text-deepPurple md:text-5xl lg:text-6xl xl:text-7xl"
            style={{
              top: `${titlePosition.y}px`,
              left: "20px",
            }}
          >
            {title}
          </h1>
          <ImageTag src={imageUrl || ""} />
        </Link>
      )
    })

  return (
    <>
      <Seo seo={seo} />
      <Main withPadding={false}>
        <Section withPadding={false}>{renderCollection()}</Section>
      </Main>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<props>> {
  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "collectionIndex" && !(_id in path('drafts.**'))][0] {
          seo
      }`
    )

    const collections: Collection[] = await sanityClient.fetch(
      groq`*[_type == "collection" && !(_id in path('drafts.**'))] {
         store {
          title,
          "slug": slug.current,
          imageUrl
         },
        seo {
          ...,
          image {
            ...,
            asset->{
              _id,
              url,
              metadata{
                lqip
              }
            }
          }
        },
      }`
    )

    return {
      props: {
        page,
        collections,
      },
      revalidate: 30,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
