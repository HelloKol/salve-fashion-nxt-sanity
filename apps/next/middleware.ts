import { NextRequest, NextResponse } from "next/server";
import fetch from "isomorphic-unfetch";
import { VERIFY_TOKEN } from "./services/queries";

export default async function userAuthMiddleware(request: NextRequest) {
  const token = request.cookies.get("accessToken");

  const verifyToken = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN ?? "",
      };

      const variables = { accessToken: token?.value || "" };
      const body = JSON.stringify({ query: VERIFY_TOKEN, variables });
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URI ?? "", {
        method: "POST",
        headers,
        body,
      });
      const { data, errors } = await response.json();

      if (errors) throw new Error(errors[0].message);
      if (data && data.customer) {
        return {
          isValid: true,
          customer: data.customer,
        };
      } else {
        return {
          isValid: false,
          error: "Invalid token",
        };
      }
    } catch (err: any) {
      console.error(err);
      return {
        isValid: false,
        error: err.message,
      };
    }
  };

  const isAuthenticated = await verifyToken();
  if (isAuthenticated.isValid) {
    if (request.url.includes("/login") || request.url.includes("/register"))
      return NextResponse.redirect(new URL("/account", request.url));
  } else {
    if (request.url.includes("/account"))
      return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
