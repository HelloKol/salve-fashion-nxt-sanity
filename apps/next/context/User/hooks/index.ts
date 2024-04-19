import { graphqlClient } from "@/utils"
import {
  FormDataRegister,
  FormDataLogin,
  CustomerAccessTokenCreateResult,
  CustomerCreateResult,
} from "@/types"
import {
  LOGIN_CUSTOMER,
  LOGOUT_CUSTOMER,
  REGISTER_CUSTOMER,
  VERIFY_TOKEN,
} from "@/services/queries"

export const authHooks = (
  token: string,
  setToken: (token: string, expiresAt: string) => void,
  removeToken: () => void,
  removeCartId: () => void,
  setIsLoggedIn: (isLoggedIn: boolean) => void
) => {
  // USER REGISTER
  const signUp = async (input: FormDataRegister) => {
    try {
      const result = await graphqlClient.request<CustomerCreateResult>(
        REGISTER_CUSTOMER,
        { input }
      )
      if (result.customerCreate.customer) {
        return {
          status: "OK",
          message: "Rgister successful",
        }
      } else {
        return {
          status: "ERROR",
          message:
            result.customerCreate.userErrors[0].message || "Could not register",
        }
      }
    } catch (error: any) {
      return {
        status: "ERROR",
        message:
          error?.response?.errors?.[0]?.message ||
          "An error occurred while registering user",
      }
    }
  }

  // USER LOG IN
  const signIn = async (details: FormDataLogin) => {
    try {
      const result =
        await graphqlClient.request<CustomerAccessTokenCreateResult>(
          LOGIN_CUSTOMER,
          details
        )
      if (result.customerAccessTokenCreate.customerAccessToken) {
        const { accessToken, expiresAt } =
          result.customerAccessTokenCreate.customerAccessToken
        setToken(accessToken, expiresAt)
        setIsLoggedIn(true)
        return {
          status: "OK",
          message: "Login successful",
        }
      } else {
        return {
          status: "ERROR",
          message:
            result?.customerAccessTokenCreate?.customerUserErrors?.[0]
              ?.message || "Incorrect email or password",
        }
      }
    } catch (error: any) {
      return {
        status: "ERROR",
        message:
          error?.response?.errors?.[0]?.message ||
          "An error occurred while logging in",
      }
    }
  }

  // USER LOG OUT
  const logOut = async () => {
    try {
      const result = await graphqlClient.request<any>(LOGOUT_CUSTOMER, {
        customerAccessToken: token,
      })
      if (result?.customerAccessTokenDelete?.deletedAccessToken) {
        removeToken()
        removeCartId()
        setIsLoggedIn(false)
        return {
          status: "OK",
          message: "Logout successful",
        }
      } else {
        return {
          status: "ERROR",
          message: "User already logged out",
        }
      }
    } catch (error) {
      return {
        status: "ERROR",
        message: "An error occurred while logging out.",
      }
    }
  }

  return {
    signUp,
    signIn,
    logOut,
  }
}
