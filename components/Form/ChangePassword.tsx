import React, { useEffect } from "react"
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
import { useDialogBox, useChangePasswordForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { graphqlClient, sanityClient } from "@/utils"
import { gql } from "@apollo/client"

interface props {
  title: string
}

export default function ChangePassword({ title }: props): JSX.Element | null {
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
    duration: 50000,
    type: "foreground",
    onClose: () => null,
  })

  return (
    <div className="relative col-span-full md:col-start-4 md:col-end-10 lg:col-span-6">
      <div className="z-10 w-8/12 w-full rounded-2xl lg:absolute lg:left-1/2 lg:top-1/2 lg:w-9/12 lg:max-w-[520px] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-[#ffffff] lg:p-4">
        <p className="text-center text-3xl uppercase">{title}</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6">
            <FormInputText
              type="password"
              placeholder="123456"
              label="Password"
              {...register("password")}
              error={errors.password}
            />
          </div>

          <button
            className="mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
            type="submit"
          >
            {isLoading ? "Loading...." : "Reset password"}
          </button>

          {globalError && <p className="mt-2 text-red-500">{globalError}</p>}

          <div className="mt-6 hidden h-28 w-full overflow-hidden rounded-2xl lg:block">
            <ImageTag src="/static/images/product1.jpg" />
          </div>
        </form>
      </div>

      <div className="hidden h-full w-full overflow-hidden rounded-2xl lg:block">
        <ImageTag src="/static/images/product1.jpg" />
      </div>
    </div>
  )
}
