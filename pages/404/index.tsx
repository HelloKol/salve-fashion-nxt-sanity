import Head from "next/head"
import { GetStaticPropsResult } from "next/types"
import { Container, Main, Section } from "@/components"
import { sanityClient } from "@/utils"
import groq from "groq"

interface props {
  page: any
}

export default function Page({ page }: { page: any }): JSX.Element | null {
  if (!page) return null
  const { title, seo } = page

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Main withPadding={true}>
        <Section>
          <Container>
            <h1>{title}</h1>
          </Container>
        </Section>
      </Main>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<props>> {
  try {
    const page: any = await sanityClient.fetch(
      groq`*[_type == "page404" && !(_id in path('drafts.**'))][0] {
        ...,
      }
    `
    )

    if (!page)
      return {
        props: {
          page: null,
        },
      }

    return {
      props: {
        page,
      },
      revalidate: 30,
    }
  } catch (error) {
    return {
      props: {
        page: null,
      },
    }
  }
}
