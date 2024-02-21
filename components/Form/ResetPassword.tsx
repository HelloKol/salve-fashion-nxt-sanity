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
import { useDialogBox, useResetPasswordForm } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { graphqlClient, sanityClient } from "@/utils"
import { gql } from "@apollo/client"

interface props {
  title: string
}

export default function ResetPassword({ title }: props): JSX.Element | null {
  return null
}
