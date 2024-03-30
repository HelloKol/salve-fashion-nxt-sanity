import React from "react"
import { GetStaticPropsResult } from "next/types"
import groq from "groq"
import {
  Container,
  Grid,
  ImageTag,
  Main,
  Seo,
  Section,
  FormInputText,
} from "@/components"
import { useDialogBox, useResetPasswordForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { sanityClient } from "@/utils"

interface props {
  page: any
}

export default function Page({ page }: props): JSX.Element | null {
  if (!page) return null
  const { image, seo } = page
  const resetPasswordToast = useDialogBox()
  const {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  } = useResetPasswordForm()

  const message = isLoading ? (
    <>
      <h4>Loading</h4>
      <p>Your password being reset...</p>
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
        <p>Your password reset successfully</p>
      </>
    )
  )

  useToastOpen(isLoading, !!globalError, isSucess, resetPasswordToast.close, {
    description: message,
    duration: 5000,
    type: "foreground",
    onClose: () => null,
  })

  return (
    <>
      <Seo seo={seo} />
      <Main withPadding={false}>
        <Section withPadding={false}>
          <Container>
            <Grid className="lg:min-h-screen">
              <div className="col-span-full h-full w-full lg:col-end-8">
                <ImageTag
                  src={image.asset.url}
                  blurDataURL={image.asset.metadata.lqip}
                  placeholder="blur"
                />
              </div>

              <div className="relative col-span-full mt-24 md:col-start-4 md:col-end-10 md:mt-28 lg:col-start-8 lg:col-end-13 lg:mt-0">
                <div className="z-10 w-full lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2 ">
                  <p className="mb-6 text-3xl uppercase">Reset your password</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                      <FormInputText
                        type="email"
                        placeholder="yourname@gmail.com"
                        label="E-mail"
                        {...register("email")}
                        error={errors.email}
                      />
                    </div>

                    <button
                      className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-md bg-[#171717] py-4 text-sm uppercase text-white"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading...." : "Continue"}
                    </button>

                    {globalError && (
                      <p className="mt-2 text-red-500">{globalError}</p>
                    )}
                  </form>
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
      groq`*[_type == "resetPassword" && !(_id in path('drafts.**'))][0] {
        title,
        subtitle,
        contentTitle,
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
