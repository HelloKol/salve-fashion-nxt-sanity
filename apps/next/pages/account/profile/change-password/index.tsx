import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useMutation } from "@apollo/client"
import {
  AccountNavigation,
  BreadCrumb,
  Container,
  FormInputText,
  Grid,
  Main,
  Section,
  Seo,
} from "@/components"
import { UPDATE_USER_PASSWORD, USER_DETAILS } from "@/services/queries"
import { useState } from "react"
import { useAuth } from "@/context/User"
import { FormDataRegister } from "@/types"
import { useCookies } from "react-cookie"
import { useToastOpen } from "@/context/Toast"

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
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"])
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: yupResolver(schema),
  })

  const [updatePassword, { loading, error, data }] = useMutation(
    UPDATE_USER_PASSWORD,
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

  const onSubmit = async (data: FormDataRegister) => {
    const { password, confirmPassword } = data
    if (password !== confirmPassword) return
    if (!accessToken) return

    const variables = {
      customer: { password: password },
      customerAccessToken: accessToken,
    }
    updatePassword({ variables })
    removeCookie("accessToken", { path: "/" })
  }

  const message = loading ? (
    <>
      <h6 className={"text-deepPurple"}>Loading</h6>
      <p>Updating details...</p>
    </>
  ) : error ? (
    <>
      <h6 className={"text-deepOrange"}>Error</h6>
      <p>{error?.message}</p>
    </>
  ) : (
    !!data && (
      <>
        <h6 className={"text-deepGreen"}>Success</h6>
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
      <Seo
        seo={{
          title: "Change Password -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />

              <BreadCrumb />

              <div className="col-span-full mb-4 sm:col-span-10 md:col-span-6 lg:col-span-5">
                <p>CHANGE PASSWORD</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-full row-start-4 sm:col-span-10 md:col-span-6 lg:col-span-5"
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
                  className="col-span-full mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                  type="submit"
                  disabled={loading}
                >
                  Save
                </button>
              </form>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
