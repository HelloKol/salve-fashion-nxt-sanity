import { useState } from "react"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FormDataRegister } from "@/types"
import { graphqlClient } from "@/utils"
import { gql } from "@apollo/client"

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid e-mail address")
    .required("Enter your e-mail address"),
})

const useResetPasswordForm = () => {
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

  const onSubmit = async ({ email }: FormDataRegister) => {
    try {
      graphqlClient.request(
        gql`
          mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
              customerUserErrors {
                message
              }
            }
          }
        `,
        { email: email }
      )
    } catch (err: any) {
      setGlobalError("An error occurred while resetting password ")
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

export default useResetPasswordForm
