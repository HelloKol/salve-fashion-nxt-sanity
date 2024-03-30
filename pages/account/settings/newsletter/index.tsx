import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as yup from "yup"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@apollo/client"
import {
  Main,
  Section,
  Container,
  Grid,
  Button,
  FormInputCheckbox,
  BreadCrumb,
} from "@/components"
import { UPDATE_USER_NEWSLETTER, USER_DETAILS } from "@/services/queries"
import { useAuth } from "@/context/User"
import { useToastOpen } from "@/context/Toast"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

const schema = yup.object().shape({
  acceptsMarketing: yup.boolean(),
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

  const [updateNewsletter, { loading, error, data }] = useMutation(
    UPDATE_USER_NEWSLETTER,
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

  const message = loading ? (
    <>
      <h4>Loading</h4>
      <p>Updating settings...</p>
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
        <p>Settings updated</p>
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

              <div className="col-span-5">
                <p>NEWSLETTER</p>
                <p>
                  Select your interests and receive the latest news and trends
                  each week.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="col-span-6 row-start-4"
                >
                  <div className="mb-6">
                    <FormInputCheckbox
                      label={
                        "I have read and understand the Privacy and Cookies Policy and agree to receive personalised commercial communications from Salve Fashion by email."
                      }
                      {...register("acceptsMarketing")}
                      error={errors.acceptsMarketing}
                    />
                  </div>

                  <button
                    className="col-span-12 mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                    type="submit"
                    disabled={loading}
                  >
                    Save
                  </button>
                </form>
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
