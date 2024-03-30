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
import { UPDATE_USER_EMAIL, USER_DETAILS } from "@/services/queries"
import { useAuth } from "@/context/User"
import { FormData } from "@/types"
import { useToastOpen } from "@/context/Toast"

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
})

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { accessToken, userDetails } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [updateEmailAddress, { loading, error, data }] = useMutation(
    UPDATE_USER_EMAIL,
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

  const onSubmit = async (data: FormData) => {
    if (!accessToken) return
    const variables = {
      customer: data,
      customerAccessToken: accessToken,
    }
    updateEmailAddress({ variables })
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
                <p>CHANGE E-MAIL</p>
                <p>Your current email address is: {userDetails?.email}</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-6 row-start-4"
              >
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
                  disabled={loading}
                >
                  Update e-mail
                </button>
              </form>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
