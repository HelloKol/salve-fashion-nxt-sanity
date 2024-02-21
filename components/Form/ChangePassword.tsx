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

  return null
}
