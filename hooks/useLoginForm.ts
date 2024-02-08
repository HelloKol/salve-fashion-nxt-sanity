import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FormData } from "@/types"
import { useAuth } from "@/context/User"

const loginSchema = yup.object().shape({
  email: yup.string().email('Enter a valid e-mail address').required('Enter your e-mail address'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Enter your password'),
  rememberMeCheckbox: yup.boolean(),
})

const useLoginForm = () => {
  const { logIn } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async ({ email, password }: FormData) => {
    setIsLoading(true)
    try {
      const response = await logIn({ email, password })
      if (response.status === "OK") {
        setGlobalError("")
        setIsLoading(false)
        router.push("/account/profile")
        return setIsSuccess(true)
      } else {
        setGlobalError(response.message)
        setIsLoading(false)
        return setIsSuccess(false)
      }
    } catch (err: any) {
      setGlobalError("An error occurred while logging in")
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

export default useLoginForm
