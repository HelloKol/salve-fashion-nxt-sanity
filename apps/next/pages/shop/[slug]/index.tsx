import React from "react"
import { PortableTextBlock } from "@portabletext/types"
import { Container, Main, Section, Seo, ShopIndex } from "@/components"
import { sanityClient } from "@/utils"
import { GetStaticPropsResult } from "next/types"
import groq from "groq"
import { SeoType } from "@/types"

interface props {
  page: {
    slug: {
      current: string
    }
    title: string
    body: PortableTextBlock
    suggestedSearch: string[]
    seo: SeoType
  }
}

export default function Page({ page }: props) {
  if (!page) return null
  const { slug, title, body, suggestedSearch, seo } = page
  const { current } = slug

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section withPadding={false}>
          <Container>
            <ShopIndex
              title={title}
              body={body}
              suggestedSearch={suggestedSearch}
              type={current}
            />
          </Container>
        </Section>
      </Main>
    </>
  )
}

export async function getStaticPaths() {
  const response = await sanityClient.fetch(
    groq`*[_type == "shop" && !(_id in path('drafts.**'))] {
      slug
    }`
  )

  const paths = response.map((item: { slug: { current: string } }) => ({
    params: { slug: item.slug.current },
  }))

  return {
    paths,
    fallback: false,
  }
}

interface params {
  params: {
    slug: string
  }
}

export async function getStaticProps({
  params,
}: params): Promise<GetStaticPropsResult<props>> {
  const { slug } = params

  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "shop" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
        slug,
        title,
        body,
        suggestedSearch,
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
      }`,
      { slug: slug }
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
