import { ApolloClient, InMemoryCache } from '@apollo/client';
import { env } from '@/utils/env';

// Create a appollo client
const apolloClient = new ApolloClient({
  uri: env.NEXT_PUBLIC_GRAPHQL_URI,
  cache: new InMemoryCache(),
  headers: {
    'X-Shopify-Storefront-Access-Token': env.NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN || ''
  }
});

export { apolloClient };
