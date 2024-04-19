import { GraphQLClient } from "graphql-request"

// Create a grapqhql client
const graphqlClientPrivate = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_GRAPHQL_URI}?t=${Date.now()}`, // Add a random timestamp query parameter
  {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || "",
      "Shopify-Storefront-Buyer-IP": "::1",
    },
  }
)

export { graphqlClientPrivate }
