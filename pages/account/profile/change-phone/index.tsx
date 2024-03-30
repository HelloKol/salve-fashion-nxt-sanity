import Head from "next/head"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "@apollo/client"
import {
  Main,
  Section,
  Container,
  Grid,
  Button,
  FormInputText,
  BreadCrumb,
} from "@/components"
import { UPDATE_USER_PHONE_NUMBER, USER_DETAILS } from "@/services/queries"
import { useEffect } from "react"
import { useAuth } from "@/context/User"
import { useToastOpen } from "@/context/Toast"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

const schema = yup.object().shape({
  phone: yup.string().required("Enter your new phone number"),
})

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { accessToken, userDetails } = useAuth()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const [updatePhoneNumber, { loading, error, data }] = useMutation(
    UPDATE_USER_PHONE_NUMBER,
    {
      refetchQueries: [
        {
          query: USER_DETAILS,
          variables: {
            customerAccessToken: accessToken,
          },
        },
      ],
    }
  )

  useEffect(() => {
    if (!userDetails?.phone) return
    setValue("phone", userDetails?.phone)
  }, [userDetails])

  const onSubmit = async (data: any) => {
    if (!accessToken) return
    const variables = {
      customer: data,
      customerAccessToken: accessToken,
    }
    updatePhoneNumber({ variables })
  }

  const message = loading ? (
    <>
      <h4>Loading</h4>
      <p>Updating details...</p>
    </>
  ) : error ? (
    <>
      <h4>Error</h4>
      <p>{error?.message}</p>
    </>
  ) : (
    !!data && (
      <>
        <h4>Success</h4>
        <p>Details updated</p>
      </>
    )
  )

  useToastOpen(loading, !!error, !!data, () => null, {
    description: message,
    duration: 5000,
    type: "foreground",
    onClose: () => null,
  })

  return (
    <>
      <Head>
        <title>Change email</title>
      </Head>
      <Main>
        <Section withPadding={false}>
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

              <div className="col-span-full">
                <BreadCrumb />
              </div>

              <div className="col-span-5 mb-4">
                <p>CHANGE PHONE NUMBER</p>
                <p>A verification code will be sent to the new number</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-6 row-start-4"
              >
                <div className="mb-6">
                  <FormInputText
                    type="text"
                    label="Phone number"
                    placeholder="NEW PHONE NUMBER"
                    {...register("phone")}
                    error={errors.phone}
                  />
                </div>

                <button
                  className="col-span-12 mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                  type="submit"
                >
                  Update Phone number
                </button>
              </form>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
