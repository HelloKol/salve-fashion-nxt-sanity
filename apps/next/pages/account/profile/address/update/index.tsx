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
import { UPDATE_USER_ADDRESS, USER_DETAILS } from "@/services/queries"
import { useEffect } from "react"
import { useAuth } from "@/context/User"
import { AddressFormRecord } from "@/types"
import { useToastOpen } from "@/context/Toast"

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
  const { accessToken, userDetails } = useAuth()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormRecord>({
    resolver: yupResolver(schema),
  })

  const [updateAddress, { loading, error, data }] = useMutation(
    UPDATE_USER_ADDRESS,
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
    if (!userDetails?.defaultAddress) return
    const { defaultAddress } = userDetails
    setValue("address1", defaultAddress?.address1)
    setValue("address2", defaultAddress?.address2)
    setValue("city", defaultAddress?.city)
    setValue("company", defaultAddress?.company)
    setValue("country", defaultAddress?.country)
    setValue("firstName", defaultAddress?.firstName)
    setValue("lastName", defaultAddress?.lastName)
    setValue("phone", defaultAddress?.phone)
    setValue("province", defaultAddress?.province)
    setValue("zip", defaultAddress?.zip)
  }, [userDetails?.defaultAddress])

  const onSubmit = async (data: AddressFormRecord) => {
    if (!accessToken || !userDetails?.defaultAddress?.id) return
    const variables = {
      address: data,
      customerAccessToken: accessToken,
      id: userDetails?.defaultAddress?.id,
    }
    updateAddress({ variables })
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
          title: "Update Address -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />

              <BreadCrumb />

              <div className="col-span-full mb-4 sm:col-span-10 md:col-span-6 lg:col-span-5">
                <p>Update address</p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="col-span-full row-start-4 sm:col-span-10 md:col-span-6 lg:col-span-5"
              >
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
