import { ApolloClient, InMemoryCache } from "@apollo/client"

// Create a appollo client
const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || "",
  },
})

export { apolloClient }
