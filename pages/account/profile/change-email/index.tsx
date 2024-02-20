import Head from "next/head"
import { useRouter } from "next/router"
import { GetStaticPropsResult } from "next"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation, useQuery } from "@apollo/client"
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
import { sanityClient } from "@/utils"
import styles from "./styles.module.scss"
import {
  UPDATE_USER_ADDRESS,
  UPDATE_USER_EMAIL,
  USER_DETAILS,
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
  email: yup
    .string()
    .email("Enter a valid e-mail address")
    .required("Enter your e-mail address"),
  // password: yup
  //   .string()
  //   .min(6, "Password must be at least 6 characters")
  //   .required("Enter your password"),
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

  const [updateEmailAddress, {}] = useMutation(UPDATE_USER_EMAIL, {
    refetchQueries: [
      {
        query: USER_DETAILS,
        variables: {
          customerAccessToken: accessToken,
        },
      },
    ],
  })

  const onSubmit = async (data: FormData) => {
    if (!accessToken) return
    const variables = {
      customer: data,
      customerAccessToken: accessToken,
    }

    updateEmailAddress({ variables })
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
                <p>CHANGE E-MAIL</p>
                <p>Your current email address is: {userDetails?.email}</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-6 row-start-3"
              >
                {/* <div className="mb-6">
                  <FormInputText
                    type="text"
                    placeholder="Current password"
                    label="Password"
                    {...register("password")}
                    error={errors.password}
                  />
                </div> */}
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    label="E-mail"
                    placeholder="New e-mail address"
                    {...register("email")}
                    error={errors.email}
                  />
                </div>

                <button
                  className="col-span-12 mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                  type="submit"
                >
                  {isLoading ? "Loading...." : "Update e-mail"}
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
