import React, { useEffect } from "react"
import { GetStaticPropsResult } from "next/types"
import Link from "next/link"
import groq from "groq"
import {
  Container,
  ChangePassword,
  FormInputText,
  Grid,
  ImageTag,
  Main,
  MetaTags,
  Section,
} from "@/components"
import { useDialogBox, useResetPasswordForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { graphqlClient, sanityClient } from "@/utils"
import { gql } from "@apollo/client"

interface props {
  page: any
}

export default function Page({ page }: props): JSX.Element | null {
  const { seo } = page

  return (
    <>
      <MetaTags seo={seo} />
      <Main withPadding={false}>
        <Section className="py-24 lg:py-14">
          <Container>
            <Grid className="lg:min-h-screen">
              <div className="col-span-full row-start-2	mt-8 flex flex-col justify-between lg:col-span-6 lg:row-start-1 lg:mt-24">
                <div className="text-center">
                  <p className="hidden text-xl uppercase lg:block">
                    Largest Image Source
                  </p>
                  <h1 className="mt-8 hidden text-xl uppercase lg:block lg:text-7xl xl:text-8xl">
                    Powered by creators aroudn the world
                  </h1>
                  <p className="lg:mt-14 xl:mt-28">
                    Don&apos;t have an account?
                  </p>
                  <Link
                    className="inline-block border-b-2 border-black"
                    href={`/register`}
                  >
                    Create account
                  </Link>
                </div>
                <div className="mt-44 hidden w-full overflow-hidden rounded-2xl lg:block lg:h-56 xl:h-72">
                  <ImageTag src="/static/images/product1.jpg" />
                </div>
              </div>

              <ChangePassword title={"Change password"} />
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
      groq`*[_type == "login" && !(_id in path('drafts.**'))][0] {
        title,
        subtitle,
        contentTitle,
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
