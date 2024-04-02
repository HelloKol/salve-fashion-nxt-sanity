import { GetStaticPropsResult } from "next"
import React from "react"
import groq from "groq"
import Link from "next/link"
import {
  Container,
  FormInputCheckbox,
  FormInputText,
  Grid,
  ImageTag,
  Main,
  Seo,
  Section,
} from "@/components"
import { useDialogBox, useRegisterForm } from "@/hooks"
import { sanityClient } from "@/utils"
import { useToastOpen } from "@/context/Toast"
import { Media, SeoType } from "@/types"

interface props {
  page: {
    title: string
    image: Media
    seo: SeoType
  }
}

export default function Page({ page }: props): JSX.Element | null {
  const registerToast = useDialogBox()
  const {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  } = useRegisterForm()

  const message = isLoading ? (
    <>
      <h6 className={"text-deepPurple"}>Loading</h6>
      <p>Your account is being created...</p>
    </>
  ) : !!globalError ? (
    <>
      <h6 className={"text-deepOrange"}>Error</h6>
      <p>{globalError}</p>
    </>
  ) : (
    isSucess && (
      <>
        <h6 className={"text-deepGreen"}>Success</h6>
        <p>Your account is successfully created</p>
      </>
    )
  )

  useToastOpen(isLoading, !!globalError, isSucess, registerToast.close, {
    description: message,
    duration: 5000,
    type: "foreground",
    onClose: () => null,
  })

  if (!page) return null
  const { title, image, seo } = page

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
                <div className="z-10 w-full rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2 ">
                  <p className="mb-6 text-3xl uppercase">Register account</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                      <FormInputText
                        type="text"
                        placeholder="Alex"
                        label="First name"
                        {...register("firstName")}
                        error={errors.firstName}
                      />
                    </div>

                    <div className="mb-6">
                      <FormInputText
                        type="text"
                        placeholder="James"
                        label="Last name"
                        {...register("lastName")}
                        error={errors.lastName}
                      />
                    </div>

                    <div className="mb-6">
                      <FormInputText
                        type="email"
                        placeholder="yourname@gmail.com"
                        label="E-mail"
                        {...register("email")}
                        error={errors.email}
                      />
                    </div>

                    <div className="mb-6">
                      <FormInputText
                        type="password"
                        placeholder="******"
                        label="Password"
                        {...register("password")}
                        error={errors.password}
                      />
                    </div>

                    <div className="mt-6 flex items-center">
                      <input
                        id="link-checkbox-sub"
                        type="checkbox"
                        value=""
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label
                        htmlFor="link-checkbox-sub"
                        className="ml-2 text-sm font-medium"
                      >
                        I want to receive personalised commercial communications
                        from Salve Fashion by email.
                      </label>
                    </div>

                    <div className="mt-6 flex items-center">
                      <FormInputCheckbox
                        label={
                          <article>
                            <p className="mb-0">
                              I have read and agree to the{" "}
                              <Link href={"/pages/terms-of-service"}>
                                Terms Of Service
                              </Link>{" "}
                              and{" "}
                              <Link href={"/pages/privacy-policy"}>
                                Privacy Policy
                              </Link>
                            </p>
                          </article>
                        }
                        {...register("acceptPrivacy")}
                        error={errors.acceptPrivacy}
                      />
                    </div>

                    <button className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-md bg-[#171717] py-4 text-sm uppercase text-white">
                      {isLoading ? "Loading...." : "Create account"}
                    </button>
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
    const page = await sanityClient.fetch(
      groq`*[_type == "register" && !(_id in path('drafts.**'))][0] {
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
