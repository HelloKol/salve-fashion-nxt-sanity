import { GetStaticPropsResult } from "next"
import React from "react"
import groq from "groq"
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "@portabletext/types"
import { Container, Grid, ImageTag, Main, Seo, Section } from "@/components"
import { sanityClient } from "@/utils"
import { Media, SeoType } from "@/types"

interface props {
  page: {
    title: string
    standfirst: PortableTextBlock
    body: PortableTextBlock
    image: Media
    blockImages: {
      modules: {
        body: PortableTextBlock
        image: Media
      }[]
    }
    seo: SeoType
  }
}

export default function Page({ page }: props): JSX.Element | null {
  if (!page) return null
  const { title, standfirst, body, image, blockImages, seo } = page

  const renderBlockImages = () => {
    return (
      blockImages &&
      blockImages.modules.map((block, index: number) => {
        const { image, body } = block

        if (index === 0)
          return (
            <React.Fragment key={index}>
              <div className="col-span-full mt-14 h-[500px] w-full sm:col-end-10 md:col-end-7 lg:col-start-2 lg:col-end-7 lg:row-start-1 lg:mt-24 lg:h-[600px] xl:col-start-3 xl:col-end-7 xl:h-[850px]">
                <ImageTag
                  src={image.asset.url}
                  blurDataURL={image.asset.metadata.lqip}
                  placeholder="blur"
                />
              </div>
              <article className="prose col-start-2 col-end-13 mt-10 text-lg md:col-start-3 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-24 lg:text-xl xl:col-start-8 xl:col-end-12">
                <PortableText value={body} />
              </article>
            </React.Fragment>
          )

        return (
          <React.Fragment key={index}>
            <div className="col-span-full mt-6 h-[500px] w-full sm:col-start-4 md:col-start-7 lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-[400px] lg:h-[600px] xl:col-start-8 xl:col-end-12 xl:h-[850px]">
              <ImageTag
                src={image.asset.url}
                blurDataURL={image.asset.metadata.lqip}
                placeholder="blur"
              />
            </div>
            <article className="col-span-full mt-10 text-2xl md:col-start-1 md:col-end-12 md:text-3xl lg:col-start-2 lg:col-end-13 lg:mt-24 lg:text-5xl xl:col-start-3 xl:col-end-12">
              <PortableText value={body} />
            </article>
          </React.Fragment>
        )
      })
    )
  }

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <h1 className="col-span-full text-center text-5xl uppercase lg:text-6xl">
                {title}
              </h1>

              <div className="col-span-full h-[200px] w-full md:h-[300px] lg:h-[600px]">
                <ImageTag
                  src={image.asset.url}
                  blurDataURL={image.asset.metadata.lqip}
                  placeholder="blur"
                />
              </div>

              <article className="col-span-full mt-10 text-2xl md:col-start-1 md:col-end-12 md:text-3xl lg:col-start-2 lg:col-end-13 lg:mt-24 lg:text-5xl xl:col-start-3 xl:col-end-10">
                <PortableText value={standfirst} />
              </article>

              <article className="col-start-2 col-end-13 text-lg md:col-start-3 lg:col-start-7 lg:col-end-13 lg:text-xl xl:col-start-8 xl:col-end-12">
                <PortableText value={body} />
              </article>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <Grid>{renderBlockImages()} </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<props>> {
  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "about" && !(_id in path('drafts.**'))][0] {
      title,
      body,
      standfirst,
      image {
        _type,
        asset->{
          _id,
          url,
          metadata{
            lqip
          }
        }
      },
      blockImages {
        variant,
        modules [] {
          _key,
          _type,
          body,
          image {
            _type,
            asset->{
              _id,
              url,
              metadata{
                lqip
              }
            }
          }
        }
      },
      seo
    }
    `
    )

    if (!page)
      return {
        notFound: true,
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
