import { graphqlClient } from "@/utils/graphql";
import { FormData, CustomerAccessTokenCreateResult } from "@/types";
import {
  LOGIN_CUSTOMER,
  LOGOUT_CUSTOMER,
  VERIFY_TOKEN,
} from "@/services/queries";

export const authHooks = (
  token: string,
  setToken: (token: string, expiresAt: string) => void,
  removeToken: () => void,
  removeCheckoutId: () => void,
  setIsLoggedIn: (isLoggedIn: boolean) => void
) => {
  // USER LOG IN
  const logIn = async (details: FormData) => {
    try {
      const result =
        await graphqlClient.request<CustomerAccessTokenCreateResult>(
          LOGIN_CUSTOMER,
          details
        );
      if (result.customerAccessTokenCreate.customerAccessToken) {
        const { accessToken, expiresAt } =
          result.customerAccessTokenCreate.customerAccessToken;
        setToken(accessToken, expiresAt);
        setIsLoggedIn(true);
        return {
          status: "OK",
          message: "Login successful",
        };
      } else {
        return {
          status: "ERROR",
          message: "Incorrect email or password.",
        };
      }
    } catch (error) {
      return {
        status: "ERROR",
        message: "An error occurred while logging in.",
      };
    }
  };

  // USER LOG OUT
  const logOut = async () => {
    try {
      const result = await graphqlClient.request<any>(LOGOUT_CUSTOMER, {
        customerAccessToken: token,
      });
      if (result?.customerAccessTokenDelete?.deletedAccessToken) {
        removeToken();
        removeCheckoutId();
        setIsLoggedIn(false);
        return {
          status: "OK",
          message: "Logout successful",
        };
      } else {
        return {
          status: "ERROR",
          message: "User already logged out",
        };
      }
    } catch (error) {
      return {
        status: "ERROR",
        message: "An error occurred while logging out.",
      };
    }
  };

  // USER TOKEN VALIDATE
  const verifyToken = async (accessToken: string) => {
    return null;
    try {
      const result = await graphqlClient.request<any>(VERIFY_TOKEN, {
        accessToken,
      });
      if (result.customer)
        return {
          isValid: true,
          customer: result.customer,
        };
      else
        return {
          isValid: false,
          error: "Invalid token",
        };
    } catch (err: any) {
      return {
        isValid: false,
        error: err.message,
      };
    }
  };

  return {
    logIn,
    logOut,
    verifyToken,
  };
};
