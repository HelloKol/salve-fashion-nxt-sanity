import Link from "next/link"
import { GetStaticPropsResult } from "next"
import groq from "groq"
import { PortableTextBlock } from "@portabletext/types"
import {
  Main,
  Section,
  Container,
  Grid,
  RadixAccordion,
  Seo,
} from "@/components"
import { sanityClient } from "@/utils"
import MessageChat from "@/components/svg/MessageChat"
import MessageSmile from "@/components/svg/MessageSmile"
import Location from "@/components/svg/Location"
import Phone from "@/components/svg/Phone"
import { SeoType } from "@/types"

interface props {
  page: {
    title: string
    slug: string
    blockAccordion: {
      groups: {
        title: string
        body: PortableTextBlock
        htmlText: string
      }[]
    }
    seo: SeoType
  }
}

export default function Page({ page }: props): JSX.Element | null {
  if (!page) return null
  const { title, slug, blockAccordion, seo } = page

  return (
    <>
      <Seo seo={seo} />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <h1 className="col-span-full text-center text-4xl md:text-5xl lg:text-6xl">
                Contact our friendly team
              </h1>

              <h3 className="col-span-full mb-8 text-center text-xl lg:mb-10">
                Let us know how we can help.
              </h3>

              <div className="col-span-full rounded-2xl border-2 border-deepPurple p-5 sm:col-span-6 md:col-span-3">
                <span className="block w-min rounded-2xl border-2 border-gray-600 p-2">
                  <MessageSmile className="h-8 rounded-2xl fill-[#E9EBE0]" />
                </span>
                <p className="mt-10 text-xl font-semibold lg:mt-16">
                  Chat to sales
                </p>
                <p className="mt-3 text-sm">Speak to our friendly team.</p>
                <Link href={`/`} className="mt-5 block text-deepPurple">
                  sales@example.com
                </Link>
              </div>
              <div className="col-span-full rounded-2xl border-2 border-deepPurple p-5 sm:col-span-6 md:col-span-3">
                <span className="block w-min rounded-2xl border-2 border-gray-600 p-2">
                  <MessageChat className="h-8 rounded-2xl fill-[#E9EBE0]" />
                </span>
                <p className="mt-10 text-xl font-semibold lg:mt-16">
                  Chat to support
                </p>
                <p className="mt-3 text-sm">We`re here to help.</p>
                <Link href={`/`} className="mt-5 block text-deepPurple">
                  sales@example.com
                </Link>
              </div>
              <div className="col-span-full rounded-2xl border-2 border-deepPurple p-5 sm:col-span-6 md:col-span-3">
                <span className="block w-min rounded-2xl border-2 border-gray-600 p-2">
                  <Location className="h-8 rounded-2xl fill-[#E9EBE0]" />
                </span>
                <p className="mt-10 text-xl font-semibold lg:mt-16">Visit us</p>
                <p className="mt-3 text-sm">Visit our office HQ.</p>
                <Link href={`/`} className="mt-5 block text-deepPurple">
                  sales@example.com
                </Link>
              </div>
              <div className="col-span-full rounded-2xl border-2 border-deepPurple p-5 sm:col-span-6 md:col-span-3">
                <span className="block w-min rounded-2xl border-2 border-gray-600 p-2">
                  <Phone className="h-8 rounded-2xl fill-[#E9EBE0]" />
                </span>
                <p className="mt-10 text-xl font-semibold lg:mt-16">Call us</p>
                <p className="mt-3 text-sm">Mon-Fri from 9am to 5am</p>
                <Link href={`/`} className="mt-5 block text-deepPurple">
                  sales@example.com
                </Link>
              </div>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <Grid>
              <h1 className="md:text-md col-span-full mb-4 text-center text-3xl md:mb-0">
                Frequently asked questions
              </h1>
              <div className="col-span-full lg:col-start-3 lg:col-end-11 xl:col-start-4 xl:col-end-10">
                <RadixAccordion data={blockAccordion.groups} />
              </div>
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
      groq`*[_type == "contact" && !(_id in path('drafts.**'))][0] {
      ...
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
