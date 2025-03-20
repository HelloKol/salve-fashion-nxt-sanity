// /server/routers/shopify.ts
import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { graphqlClient } from '@/utils'; // your existing graphqlClient
import { SINGLE_PRODUCT_BY_HANDLE } from '@/services/queries';

// 🛠 Add the correct type for the Shopify GraphQL query result
type SingleProductByHandleResponse = {
  product: {
    id: string;
    title: string;
    // other fields
  };
};

export const shopifyRouter = router({
  getProductByHandle: publicProcedure.input(z.object({ handle: z.string() })).query(async ({ input }) => {
    const { handle } = input;

    const productByHandle = await graphqlClient.request<SingleProductByHandleResponse>(
      SINGLE_PRODUCT_BY_HANDLE,
      { handle }
    );

    return productByHandle;
  })
});
