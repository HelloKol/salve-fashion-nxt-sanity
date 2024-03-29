import { useRouter } from "next/router"
import React from "react"
import { PortableText } from "@portabletext/react"
import { useInView } from "react-intersection-observer"
import { Button, FilterProduct, Grid, ProductItem } from "@/components"
import { useFetchShopProducts } from "@/hooks"

// Props
interface Props {
  title: any
  body: any
  suggestedSearch: any
  type: any
}

export default function ShopIndex({
  title,
  body,
  suggestedSearch,
  type,
}: Props) {
  const router = useRouter()
  const { ref, inView } = useInView({ threshold: 0 })
  const { products, isLoading } = useFetchShopProducts(type, inView)

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

  const renderCategory = () =>
    suggestedSearch.map((item: string) => (
      <Button
        className="capitalize"
        variant="primary"
        isActive={router.query.q === item.toLowerCase()}
        href={`/shop/${type}?q=${item.toLowerCase()}`}
      >
        {item}
      </Button>
    ))

  const renderLoader = () => {
    return new Array(15).fill(0).map((_, index) => (
      <div
        role="status"
        className="col-span-6 mb-10 h-60 w-full animate-pulse sm:h-80 md:h-[500px] lg:mb-12 lg:h-[600px] xl:col-span-4 xl:mb-14 xl:h-[700px]"
      >
        <div className="mb-2 flex h-full items-center justify-center rounded-2xl bg-gray-300"></div>
        <div className="mb-4 h-2.5 w-9/12 rounded-full bg-gray-200"></div>
        <span className="sr-only">Loading...</span>
      </div>
    ))
  }

  return (
    <>
      <Grid>
        <h1 className="col-span-full mt-10 text-center text-3xl uppercase md:text-5xl xl:mt-20">
          {title}
        </h1>

        <article className="col-span-full text-center text-sm md:col-start-3 md:col-end-11 md:text-xl xl:col-start-3 xl:col-end-11 xl:mt-2">
          <PortableText value={body} />
        </article>

        <div className="col-span-full mt-2 flex flex-wrap items-center justify-center gap-2 md:gap-4 xl:mt-4">
          <Button
            variant="primary"
            isActive={!router.query.q}
            href={`/shop/${type}`}
          >
            All
          </Button>
          {renderCategory()}
        </div>

        <div className="col-start-8 col-end-13 ml-auto mt-2 md:col-start-10 md:col-end-13 xl:mt-4">
          <FilterProduct />
        </div>

        <Grid
          as={"ul"}
          className="col-span-full mt-4 xl:mt-8"
          withRowGap={false}
        >
          <p className="col-span-full mb-4 text-sm font-bold lg:mb-6 xl:mb-8">
            {!!products?.length ? `${products.length} products` : ``}
          </p>
          {isLoading ? (
            renderLoader()
          ) : !products.length ? (
            <h3 className="col-span-full text-center text-xl">
              <b className="mb-2 block">We're sorry,</b>
              We can't seem to find any results for {`"${type}"`}
            </h3>
          ) : (
            renderProducts()
          )}
        </Grid>
      </Grid>
    </>
  )
}
