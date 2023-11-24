import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { graphqlClient } from "@/utils/graphql"
import { REGISTER_CUSTOMER } from "@/services/queries"
import * as yup from "yup"
import { FormData, CustomerCreateResult } from "@/types"

const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
})

const useRegisterForm = () => {
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit = async (data: FormData) => {
    const input = data
    try {
      const result = await graphqlClient.request<CustomerCreateResult>(
        REGISTER_CUSTOMER,
        { input }
      )
      if (result.customerCreate.customer) {
        console.log(`Customer created: ${result.customerCreate.customer.email}`)
      } else {
        setGlobalError(result.customerCreate.userErrors[0].message)
      }
    } catch (err: any) {
      setGlobalError(err.message)
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
  }
}

export default useRegisterForm
