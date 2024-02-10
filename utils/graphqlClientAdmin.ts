import { GraphQLClient } from "graphql-request"

// Create a grapqhql client
const graphqlClientAdmin = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_GRAPHQL_URI_ADMIN}`, // Add a random timestamp query parameter
  {
    headers: {
      'Content-Type': 'application/json' ,
      "X-Shopify-Access-Token":
        process.env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN_ADMIN || "",
    },
  }
)

export { graphqlClientAdmin }
