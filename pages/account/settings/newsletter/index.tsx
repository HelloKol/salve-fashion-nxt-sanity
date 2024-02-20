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
  FormInputCheckbox,
} from "@/components"
import { sanityClient } from "@/utils"
import styles from "./styles.module.scss"
import {
  UPDATE_USER_ADDRESS,
  UPDATE_USER_EMAIL,
  UPDATE_USER_NEWSLETTER,
  UPDATE_USER_PHONE_NUMBER,
  USER_DETAILS,
} from "@/services/queries"
import { useEffect, useState } from "react"
import { graphqlClient } from "@/utils"
import { useAuth } from "@/context/User"
import { useLoginForm } from "@/hooks"
import { FormData } from "@/types"
import Link from "next/link"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

const SvgRight = () => (
  <svg
    className="h-4 w-4 text-gray-800"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m9 5 7 7-7 7"
    />
  </svg>
)

const schema = yup.object().shape({
  acceptsMarketing: yup.boolean(),
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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const [updateNewsletter, {}] = useMutation(UPDATE_USER_NEWSLETTER, {
    refetchQueries: [
      {
        query: USER_DETAILS,
        variables: {
          customerAccessToken: accessToken,
        },
      },
    ],
  })

  useEffect(() => {
    if (!userDetails?.acceptsMarketing) return
    setValue("acceptsMarketing", userDetails?.acceptsMarketing)
  }, [userDetails])

  const onSubmit = async (data: any) => {
    if (!accessToken) return
    const variables = {
      customer: data,
      customerAccessToken: accessToken,
    }

    updateNewsletter({ variables })
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

              <div className="col-span-5 border border-black">
                <Link
                  href={"/account/settings/newsletter"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <span className="uppercase">NEWSLETTER</span>
                    <p>
                      Select your interests and receive the latest news and
                      trends each week.
                    </p>
                  </div>
                  <SvgRight />
                </Link>

                <p>NEWSLETTER</p>
                <p>
                  Select your interests and receive the latest news and trends
                  each week.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="col-span-6 row-start-3"
                >
                  <div className="mb-6">
                    <FormInputCheckbox
                      label={
                        "I have read and understand the Privacy and Cookies Policy and agree to receive personalised commercial communications from Zara by email."
                      }
                      {...register("acceptsMarketing")}
                      error={errors.acceptsMarketing}
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
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
