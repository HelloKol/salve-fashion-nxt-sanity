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
import { UPDATE_USER_EMAIL, USER_DETAILS } from "@/services/queries"
import { useAuth } from "@/context/User"
import { FormDataRegister } from "@/types"
import { useToastOpen } from "@/context/Toast"

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
  } = useForm<FormDataRegister>({
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

  const onSubmit = async (data: FormDataRegister) => {
    if (!accessToken) return
    const variables = {
      customer: data,
      customerAccessToken: accessToken,
    }
    updateEmailAddress({ variables })
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
          title: "Change Email -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />

              <BreadCrumb />

              <div className="col-span-full mb-4 sm:col-span-10 md:col-span-6 lg:col-span-5">
                <p>CHANGE E-MAIL</p>
                <p>Your current email address is: {userDetails?.email}</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-full row-start-4 sm:col-span-10 md:col-span-6 lg:col-span-5"
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
                  className="col-span-full mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
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
