import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { QueryClientProvider } from '@tanstack/react-query';
import { ApolloProvider } from '@apollo/client';
import { Layout, CookiesModal, Cart } from '@/components';
import { ShoppingCartProvider } from '@/context/Cart';
import { ToastProvider } from '@/context/Toast';
import { AuthProvider } from '@/context/User';
import { apolloClient, queryClient } from '@/utils';
import { trpc, trpcClient } from '@/utils/trpc';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <CookiesProvider>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ShoppingCartProvider>
                <ToastProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                  <Cart />
                  <CookiesModal />
                </ToastProvider>
              </ShoppingCartProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </CookiesProvider>
    </trpc.Provider>
  );
}
