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
  Seo,
  Section,
} from "@/components"
import { useDialogBox, useChangePasswordForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { graphqlClient, sanityClient } from "@/utils"
import { gql } from "@apollo/client"

interface props {}

export default function Page({}: props): JSX.Element | null {
  const changePasswordToast = useDialogBox()
  const {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  } = useChangePasswordForm()

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

  useToastOpen(isLoading, !!globalError, isSucess, changePasswordToast.close, {
    description: message,
    duration: 5000,
    type: "foreground",
    onClose: () => null,
  })

  return (
    <>
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid className="lg:min-h-screen">
              <div className="col-span-full h-full w-full lg:col-end-8">
                <ImageTag src="/static/images/product1.jpg" />
              </div>

              <div className="relative col-span-full md:col-start-4 md:col-end-10 lg:col-start-8 lg:col-end-13">
                <div className="z-10 w-full rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-4">
                  <p className="mb-6 text-3xl uppercase">Change password</p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                      <FormInputText
                        type="password"
                        placeholder="******"
                        label="New Password"
                        {...register("password")}
                        error={errors.password}
                      />
                    </div>
                    <div className="mb-6">
                      <FormInputText
                        type="password"
                        placeholder="******"
                        label="Confirm Password"
                        {...register("password")}
                        error={errors.password}
                      />
                    </div>

                    <button
                      className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-md bg-[#171717] py-4 text-sm uppercase text-white"
                      type="submit"
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
