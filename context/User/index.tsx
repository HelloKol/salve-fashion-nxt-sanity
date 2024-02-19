import { FormData } from "@/types"
import React, { createContext, ReactNode, useContext, useState } from "react"
import { useCookies } from "react-cookie"
import { authHooks } from "./hooks"
import { useQuery } from "@apollo/client"
import { USER_DETAILS } from "@/services/queries"

type ProviderProps = {
  children: ReactNode | ReactNode[]
}

type AuthContextType = {
  userDetails: any
  accessToken: string | undefined
  isAuthenticated: boolean
  signUp: (inputs: FormData) => Promise<any>
  signIn: (inputs: FormData) => Promise<any>
  logOut: () => Promise<any>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: ProviderProps) => {
  const auth = AuthFuncHooks()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function AuthFuncHooks() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "cartId",
  ])
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!cookies["accessToken"]
  )
  const token: string = cookies["accessToken"]

  const { loading, error, data } = useQuery(USER_DETAILS, {
    variables: { customerAccessToken: token },
    skip: !isAuthenticated,
  })

  const setToken = (accessToken: string, expiresAt: string) =>
    setCookie("accessToken", accessToken, {
      path: "/",
      expires: new Date(expiresAt),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      //   httpOnly: true
    })

  const removeTokenCallback = () => removeCookie("accessToken", { path: "/" })
  const isLoggedInCallback = (callback: boolean) => setIsAuthenticated(callback)
  const removeCartIDCallback = () => removeCookie("cartId", { path: "/" })

  const authFuncs = authHooks(
    token,
    setToken,
    removeTokenCallback,
    removeCartIDCallback,
    isLoggedInCallback
  )

  return {
    userDetails: data?.customer,
    accessToken: token,
    isAuthenticated,
    ...authFuncs,
  }
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
