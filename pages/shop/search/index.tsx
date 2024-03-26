import React, { useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import {
  Container,
  FilterProduct,
  Grid,
  Main,
  ProductItem,
  RadixPopover,
  RadixSlider,
  Section,
} from "@/components"
import { fetchProductsSearch } from "@/lib"
import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  const { ref, inView } = useInView({ threshold: 0 })
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

  // RENDER ALL PRODUCTS
  const renderProducts = () =>
    products &&
    products.map((product: any, index: number) => {
      const { node } = product
      const { variants } = node
      const lastItem = index === products.length - 1
      // Find the first available variant
      const availableVariant = variants?.edges.find(
        (variant: any) => variant.node.availableForSale
      )
      if (!availableVariant) return null
      const { node: firstVariant } = availableVariant

      if (lastItem)
        return (
          <li
            key={index}
            ref={ref}
            className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
          >
            <ProductItem product={firstVariant} node={node} />
          </li>
        )

      return (
        <li
          key={index}
          className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <ProductItem product={firstVariant} node={node} />
        </li>
      )
    })

  return (
    <>
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <h1 className="col-span-full mt-10 text-3xl md:text-5xl xl:mt-20">
                {router.query.title
                  ? `Search results for "${router.query.title}"`
                  : `All Products`}
              </h1>

              <div className="col-span-full flex items-center justify-between">
                <h2 className="text-sm font-bold">
                  {!!products?.length ? `${products.length} products` : ``}
                </h2>

                <FilterProduct isSearchPage={true} />
              </div>

              <Grid
                as={"ul"}
                className="col-span-full mt-4 xl:mt-8"
                withRowGap={false}
              >
                {isLoading ? (
                  <h3 className="col-span-full text-center text-xl">
                    Loading...
                  </h3>
                ) : !products.length ? (
                  <h3 className="col-span-full text-center text-xl">
                    <b className="mb-2 block">We're sorry,</b>
                    We can't seem to find any results for{" "}
                    {`"${router.query.title}"`}
                  </h3>
                ) : (
                  renderProducts()
                )}
              </Grid>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
