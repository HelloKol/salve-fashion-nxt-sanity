import React from "react"
import { useRouter } from "next/router"
import { useInView } from "react-intersection-observer"
import {
  Container,
  FilterProduct,
  Grid,
  Main,
  ProductItem,
  ProductSkeleton,
  Section,
} from "@/components"
import { useFetchSearchProducts } from "@/hooks"

export default function Page() {
  const router = useRouter()
  const { ref, inView } = useInView({ threshold: 0 })
  const { products, isLoading } = useFetchSearchProducts(inView)

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
              <h1 className="col-span-full text-3xl md:text-5xl">
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
                  <ProductSkeleton />
                ) : !products.length ? (
                  <h3 className="col-span-full text-center text-xl">
                    <b className="mb-2 block">We&apos;re sorry,</b>
                    We can&apos;t seem to find any results for{" "}
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
