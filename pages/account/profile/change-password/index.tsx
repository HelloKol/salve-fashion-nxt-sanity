import Head from "next/head"
import { useRouter } from "next/router"
import { GetStaticPropsResult } from "next"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import {
  Main,
  Section,
  Container,
  Grid,
  Button,
  Logout,
  FormInputText,
} from "@/components"
import { sanityClient } from "@/utils/sanity"
import styles from "./styles.module.scss"
import {
  UPDATE_USER_ADDRESS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
} from "@/services/queries"
import { useEffect, useState } from "react"
import { graphqlClient } from "@/utils"
import { useAuth } from "@/context/User"
import { useLoginForm } from "@/hooks"
import { FormData } from "@/types"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter your password"),
  confirmPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter your confirm password"),
})

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { accessToken, userDetails } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const { password, confirmPassword } = data
    if (password !== confirmPassword) return
    if (!accessToken) return

    const response = await graphqlClient.request(UPDATE_USER_PASSWORD, {
      customer: { password: password },
      customerAccessToken: accessToken,
    })

    console.log(response)
  }

  return (
    <>
      <Head>
        <title>Change email</title>
      </Head>
      <Main withPadding>
        <Section>
          <Container>
            <Grid>
              <ul className="col-span-12 flex gap-4">
                {navigationLinks.map((link, index) => (
                  <Button
                    key={index}
                    href={link.href}
                    variant="tertiary"
                    isActive={router.pathname === link.href}
                  >
                    {link.text}
                  </Button>
                ))}
              </ul>

              <div className="col-span-5 mb-4">
                <p>CHANGE PASSWORD</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-6 row-start-3"
              >
                <div className="mb-6">
                  <FormInputText
                    type="password"
                    placeholder="New password"
                    label="New Password"
                    {...register("password")}
                    error={errors.password}
                  />
                </div>
                <div className="mb-6">
                  <FormInputText
                    type="password"
                    placeholder="Confirm password"
                    label="Confirm Password"
                    {...register("confirmPassword")}
                    error={errors.confirmPassword}
                  />
                </div>

                <button
                  className="col-span-12 mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                  type="submit"
                >
                  {isLoading ? "Loading...." : "Save"}
                </button>

                {globalError && (
                  <p className="mt-2 text-red-500">{globalError}</p>
                )}
              </form>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
