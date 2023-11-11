import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider } from "@tanstack/react-query";
import { ApolloProvider } from "@apollo/client";
import { Layout, ComingSoon } from "@/components";
import { ShoppingCartProvider } from "@/context/Cart";
import { AuthProvider } from "@/context/User";
import { apolloClient, queryClient } from "@/utils";

export default function App({ Component, pageProps }: AppProps) {
  return <ComingSoon />;

  return (
    <CookiesProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ShoppingCartProvider>
              {/* <ToastProvider> */}
              <Layout>
                <Component {...pageProps} />
              </Layout>
              {/* </ToastProvider> */}
            </ShoppingCartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </CookiesProvider>
  );
}
