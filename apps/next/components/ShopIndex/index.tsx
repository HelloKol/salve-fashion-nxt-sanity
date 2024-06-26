import { useRouter } from "next/router"
import React from "react"
import { PortableText } from "@portabletext/react"
import { PortableTextBlock } from "@portabletext/types"
import { useInView } from "react-intersection-observer"
import {
  Button,
  FilterProduct,
  Grid,
  ProductItem,
  ProductSkeleton,
} from "@/components"
import { useFetchShopProducts } from "@/hooks"
import { ShopifyProduct } from "@/types"

// Props
interface Props {
  title: string
  body: PortableTextBlock
  suggestedSearch: string[]
  type: string
}

export default function ShopIndex({
  title,
  body,
  suggestedSearch,
  type,
}: Props) {
  const router = useRouter()
  const { ref, inView } = useInView({ threshold: 0 })
  const {
    products,
    isLoading,
  }: {
    products: {
      node: ShopifyProduct
    }[]
    isLoading: boolean
  } = useFetchShopProducts(type, inView)

  const renderProducts = () =>
    products &&
    products.map((product, index) => {
      const { node } = product
      const { variants } = node
      const lastItem = index === products.length - 1
      // Find the first available variant
      const availableVariant = variants?.edges.find(
        (variant) => variant.node.availableForSale
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
    suggestedSearch.map((item: string, index) => (
      <Button
        key={index}
        className="capitalize"
        variant="primary"
        isActive={router.query.q === item.toLowerCase()}
        href={`/shop/${type}?q=${item.toLowerCase()}`}
      >
        {item}
      </Button>
    ))

  return (
    <>
      <Grid>
        <h1 className="col-span-full text-center text-3xl uppercase md:text-5xl">
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
            <ProductSkeleton />
          ) : !products.length ? (
            <h3 className="col-span-full text-center text-xl">
              <b className="mb-2 block">We&apos;re sorry,</b>
              We can&apos;t seem to find any results for {`"${type}"`}
            </h3>
          ) : (
            renderProducts()
          )}
        </Grid>
      </Grid>
    </>
  )
}
