import React from "react"
import { GetStaticPropsResult } from "next/types"
import Link from "next/link"
import groq from "groq"
import {
  Container,
  FormInputCheckbox,
  FormInputText,
  Grid,
  ImageTag,
  Main,
  MetaTags,
  Section,
} from "@/components"
import { useDialogBox, useLoginForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { sanityClient } from "@/utils"

interface props {
  page: any
}

export default function Page({ page }: props): JSX.Element | null {
  const { seo } = page
  const loginToast = useDialogBox()
  const {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  } = useLoginForm()

  const message = isLoading ? (
    <>
      <h4>Loading</h4>
      <p>Your are being logged in...</p>
    </>
  ) : !!globalError ? (
    <>
      <h4>Error</h4>
      <p>{globalError}</p>
    </>
  ) : (
    isSucess && (
      <>
        <h4>Success</h4>
        <p>You are successfully logged in</p>
      </>
    )
  )

  useToastOpen(isLoading, !!globalError, isSucess, loginToast.close, {
    description: message,
    duration: 50000,
    type: "foreground",
    onClose: () => null,
  })

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

              <div className="relative col-span-full md:col-start-4 md:col-end-10 lg:col-span-6">
                <div className="z-10 w-8/12 w-full rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[520px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-[#ffffff] lg:p-4">
                  <p className="text-center text-3xl uppercase">
                    Reset your password
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-6">
                      <FormInputText
                        type="email"
                        placeholder="Enter your email"
                        label="E-mail"
                        {...register("email")}
                        error={errors.email}
                      />
                    </div>

                    <button
                      className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                      type="submit"
                    >
                      {isLoading ? "Loading...." : "Reset password"}
                    </button>

                    {globalError && (
                      <p className="mt-2 text-red-500">{globalError}</p>
                    )}

                    <div className="mt-6 hidden h-28 w-full overflow-hidden rounded-2xl lg:block">
                      <ImageTag src="/static/images/product1.jpg" />
                    </div>
                  </form>
                </div>

                <div className="hidden h-full w-full overflow-hidden rounded-2xl lg:block">
                  <ImageTag src="/static/images/product1.jpg" />
                </div>
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
