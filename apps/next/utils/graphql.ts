import { GraphQLClient } from 'graphql-request';
import { env } from '@/utils/env';

// Create a grapqhql client
const graphqlClient = new GraphQLClient(
  `${env.NEXT_PUBLIC_GRAPHQL_URI}?t=${Date.now()}`, // Add a random timestamp query parameter
  {
    headers: {
      'X-Shopify-Storefront-Access-Token': env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN,
      'Shopify-Storefront-Buyer-IP': '::1'
    }
  }
);

export { graphqlClient };
