import React from "react"
import { Container, Grid, Main, Section, Seo } from "@/components"
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "@portabletext/types"
import { GetStaticPropsResult } from "next"
import { sanityClient } from "@/utils"
import groq from "groq"
import { SeoType } from "@/types"

interface props {
  page: {
    title: string
    body: PortableTextBlock
    seo: SeoType
  }
}

export default function Page({ page }: props) {
  if (!page) return null
  const { title, body, seo } = page

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <h1 className="col-span-full text-4xl md:col-start-3 md:col-end-11">
                {title}
              </h1>
              <article className="col-span-full md:col-start-3 md:col-end-11">
                <PortableText value={body} />
              </article>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}

export async function getStaticPaths() {
  const response = await sanityClient.fetch(
    groq`*[_type == "page" && !(_id in path('drafts.**'))] {
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
      groq`*[_type == "page" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
        slug,
        title,
        body,
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
