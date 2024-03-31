import { useEffect } from "react"
import { useRouter } from "next/router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchProductsSearch } from "@/lib"

const useFetchSearchProducts = (inView: any) => {
  const router = useRouter()
  const PRODUCT_LIMIT = 20

  // FETCH SHOPIFY DATA
  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQuery(
    ["productsMen", router.query],
    ({ pageParam }) => {
      const title = router.query?.title as string
      const sort = router.query?.sort as string
      const minPrice = parseFloat(router.query?.min_price as string)
      const maxPrice = parseFloat(router.query?.max_price as string)
      const sortVal =
        sort === "relevance"
          ? "RELEVANCE"
          : sort === "highest_price" || sort === "lowest_price"
            ? "PRICE"
            : ""
      const reverse = sort === "highest_price"

      return fetchProductsSearch(
        pageParam,
        PRODUCT_LIMIT,
        title ? `"title:${title}"` : `""`,
        reverse,
        sortVal,
        minPrice,
        maxPrice
      )
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.hasNextPage
          ? lastPage.edges[lastPage.edges.length - 1].cursor
          : undefined
      },
    }
  )
  const products = data?.pages?.[0]?.edges

  useEffect(() => {
    if (inView && hasNextPage && products.length < PRODUCT_LIMIT) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, data?.pages])

  return {
    products,
    isLoading,
  }
}

export default useFetchSearchProducts
