import { useEffect } from "react"
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
import { UPDATE_USER_PHONE_NUMBER, USER_DETAILS } from "@/services/queries"
import { useAuth } from "@/context/User"
import { useToastOpen } from "@/context/Toast"

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
  } = useForm<{
    phone: string
  }>({
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

  const onSubmit = async (data: { phone: string }) => {
    if (!accessToken) return
    const variables = {
      customer: data,
      customerAccessToken: accessToken,
    }
    updatePhoneNumber({ variables })
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
          title: "Change Phone -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />

              <BreadCrumb />

              <div className="col-span-full mb-4 sm:col-span-10 md:col-span-6 lg:col-span-5">
                <p>CHANGE PHONE NUMBER</p>
                <p>A verification code will be sent to the new number</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-full row-start-4 sm:col-span-10 md:col-span-6 lg:col-span-5"
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
                  className="col-span-full mt-6 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                  type="submit"
                  disabled={loading}
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
