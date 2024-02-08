import { FormData } from "@/types";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { authHooks } from "./hooks";

type ProviderProps = {
  children: ReactNode | ReactNode[];
};

type AuthContextType = {
  accessToken: string | undefined;
  isAuthenticated: boolean;
  signUp: (inputs: FormData) => Promise<any>;
  logIn: (inputs: FormData) => Promise<any>;
  logOut: () => Promise<any>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: ProviderProps) => {
  const auth = AuthFuncHooks();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function AuthFuncHooks() {
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!cookies["accessToken"]
  );
  const [checkoutIdCookie, setCheckoutId, removeCheckoutId] = useCookies([
    "checkoutId",
  ]);
  const token: string = cookies["accessToken"];

  const setToken = (accessToken: string, expiresAt: string) =>
    setCookie("accessToken", accessToken, {
      path: "/",
      expires: new Date(expiresAt),
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      //   httpOnly: true
    });

  const removeTokenCallback = () => removeCookie("accessToken", { path: "/" });
  const isLoggedInCallback = (callback: boolean) =>
    setIsAuthenticated(callback);
  const removeCheckoutIdCallback = () =>
    removeCheckoutId("checkoutId", { path: "/" });

  const authFuncs = authHooks(
    token,
    setToken,
    removeTokenCallback,
    removeCheckoutIdCallback,
    isLoggedInCallback
  );

  return {
    accessToken: token,
    isAuthenticated,
    ...authFuncs,
  };
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
