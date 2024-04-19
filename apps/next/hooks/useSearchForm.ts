import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const loginSchema = yup.object().shape({
  search: yup.string().required(),
})

const useSearchForm = (setIsOpen: Function) => {
  const router = useRouter()
  const [globalError, setGlobalError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async ({ search }: { search: string }) => {
    try {
      router.push(`/shop/search?title=${encodeURIComponent(search)}`)
    } catch (err: any) {
      setGlobalError("An error occurred while searching for products.")
    }
    setIsOpen(false)
  }

  return {
    register,
    handleSubmit,
    errors,
    globalError,
    onSubmit,
  }
}

export default useSearchForm
