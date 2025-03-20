// apps/web/src/utils/trpc.ts
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/routers/_app';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: '/api/trpc'
    })
  ]
});
