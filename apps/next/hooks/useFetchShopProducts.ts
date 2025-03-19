import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/lib';

const useFetchShopProducts = (type: string, inView: boolean) => {
  const router = useRouter();
  const PRODUCT_LIMIT = 200;

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['type', router.query, type],
    // @ts-ignore
    ({ pageParam }) => {
      const q = router.query?.q as string;
      const sort = router.query?.sort as string;
      const sortVal =
        sort === 'latest' || sort === 'oldest'
          ? 'CREATED_AT'
          : sort === 'highest_price' || sort === 'lowest_price'
            ? 'PRICE'
            : '';
      const reverse = sort === 'highest_price' || sort === 'latest';

      return fetchProducts(
        pageParam,
        PRODUCT_LIMIT,
        `tag:${type}${q ? `, title:${q}` : ''}`,
        reverse,
        sortVal
      );
    },
    // @ts-ignore
    {
      getNextPageParam: (lastPage: any) => {
        return lastPage.pageInfo.hasNextPage ? lastPage.edges[lastPage.edges.length - 1].cursor : undefined;
      }
    }
  );
  // @ts-ignore
  const products = data?.pages?.[0]?.edges;

  useEffect(() => {
    if (inView && hasNextPage && products.length < PRODUCT_LIMIT) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, data?.pages]);

  return {
    products,
    isLoading
  };
};

export default useFetchShopProducts;
