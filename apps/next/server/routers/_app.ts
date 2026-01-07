// apps/web/src/server/routers/_app.ts
import { router } from '../trpc';
import { shopifyRouter } from './shopify';

export const appRouter = router({
  shopify: shopifyRouter
});

// Export type definition of API
export type AppRouter = typeof appRouter;
