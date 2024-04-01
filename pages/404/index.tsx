import { GetStaticPropsResult } from "next/types"
import groq from "groq"
import { Container, Main, Seo, Section, Grid, Button } from "@/components"
import { sanityClient } from "@/utils"
import { LinksType } from "@/types"

interface props {
  page: {
    title: string
    links: LinksType[]
    seo: {
      metaTitle: string
      metaDescription: string
      shareTitle: string
      shareDescription: string
      shareGraphic: {
        asset: {
          url: string
        }
      }
    }
  }
}

export default function Page({ page }: props): JSX.Element | null {
  if (!page) return null
  const { title, links, seo } = page

  const renderLinks = () => {
    return (
      links &&
      links.map((link, index: number) => {
        const { title, url } = link

        return (
          <Button key={index} href={url.current}>
            {title}
          </Button>
        )
      })
    )
  }

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section>
          <Container>
            <Grid>
              <h1 className="col-start-1 col-end-12 text-4xl md:text-6xl xl:text-8xl">
                {title}
              </h1>
              <div className="col-span-full">{renderLinks()}</div>
            </Grid>
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
        title,
        body,
        links[] {
          _key,
          title,
          "url": *[_id == ^.reference._ref][0].slug,
          _type
        },
        seo
      }
    `
    )

    if (!page)
      return {
        props: {
          page: {
            title: "404",
            links: [],
            seo: {
              metaTitle: "404",
              metaDescription: "404",
              shareTitle: "404",
              shareDescription: "404",
              shareGraphic: {
                asset: {
                  url: "",
                },
              },
            },
          },
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
        page: {
          title: "404",
          links: [],
          seo: {
            metaTitle: "404",
            metaDescription: "404",
            shareTitle: "404",
            shareDescription: "404",
            shareGraphic: {
              asset: {
                url: "",
              },
            },
          },
        },
      },
    }
  }
}
