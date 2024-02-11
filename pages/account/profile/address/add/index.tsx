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
import { ADD_USER_ADDRESS, USER_DETAILS } from "@/services/queries"
import { useEffect, useState } from "react"
import { graphqlClient } from "@/utils"
import { useAuth } from "@/context/User"
import { useLoginForm } from "@/hooks"
import { AddressFormData } from "@/types"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

const schema = yup.object().shape({
  address1: yup.string(),
  address2: yup.string(),
  city: yup.string(),
  company: yup.string(),
  country: yup.string(),
  firstName: yup.string(),
  lastName: yup.string(),
  phone: yup.string(),
  province: yup.string(),
  zip: yup.string(),
})

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { accessToken } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: AddressFormData) => {
    if (!accessToken) return

    const response = await graphqlClient.request(ADD_USER_ADDRESS, {
      address: data,
      customerAccessToken: accessToken,
    })
  }

  return (
    <>
      <Head>
        <title>Add address</title>
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
                <p>New address</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-6 row-start-3"
              >
                {/* <Grid> */}
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    placeholder="First Name"
                    label="First Name"
                    {...register("firstName")}
                    error={errors.firstName}
                  />
                </div>
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    placeholder="Last Name"
                    label="Last Name"
                    {...register("lastName")}
                    error={errors.lastName}
                  />
                </div>
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    placeholder="Phone"
                    label="Phone"
                    {...register("phone")}
                    error={errors.phone}
                  />
                </div>
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    placeholder="State / Province"
                    label="State / Province"
                    {...register("province")}
                    error={errors.province}
                  />
                </div>
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    placeholder="Zip Code"
                    label="Zip Code"
                    {...register("zip")}
                    error={errors.zip}
                  />
                </div>

                <div className="col-span-5 col-start-9 row-span-full mt-6">
                  <FormInputText
                    type="text"
                    placeholder="Address 1"
                    label="Address 1"
                    {...register("address1")}
                    error={errors.address1}
                  />
                </div>
                <div className="col-span-5 col-start-9 row-span-full mt-6">
                  <FormInputText
                    type="text"
                    placeholder="Address 2"
                    label="Address 2"
                    {...register("address2")}
                    error={errors.address2}
                  />
                </div>
                <div className="col-span-5 col-start-9 row-span-full mt-6">
                  <FormInputText
                    type="text"
                    placeholder="City"
                    label="City"
                    {...register("city")}
                    error={errors.city}
                  />
                </div>
                <div className="col-span-5 col-start-9 row-span-full mt-6">
                  <FormInputText
                    type="text"
                    placeholder="Comapny"
                    label="Comapny"
                    {...register("company")}
                    error={errors.company}
                  />
                </div>
                <div className="col-span-5 col-start-9 row-span-full mt-6">
                  <FormInputText
                    type="text"
                    placeholder="Country"
                    label="Country"
                    {...register("country")}
                    error={errors.country}
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
                {/* </Grid> */}
              </form>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}