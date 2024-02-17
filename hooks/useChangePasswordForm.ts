import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FormData } from "@/types"
import { useAuth } from "@/context/User"
import { graphqlClient } from "@/utils"
import { gql } from "@apollo/client"

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Enter your password"),
})

const useChangePasswordForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ password }: FormData) => {
    // setIsLoading(true)
    const { query } = router
    if (!query?.reset_url) return

    try {
      const response = graphqlClient.request(
        gql`
          mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
            customerResetByUrl(password: $password, resetUrl: $resetUrl) {
              customer {
                id
                email
                firstName
              }
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `,
        { password: password, resetUrl: query?.reset_url }
      )

      console.log(response)
    } catch (err: any) {
      setGlobalError("An error occurred while changing password")
      setIsLoading(false)
      return setIsSuccess(false)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
    isLoading,
    isSucess,
  }
}

export default useChangePasswordForm
