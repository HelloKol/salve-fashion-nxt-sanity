import React, { useRef } from "react"
// Components
import { Grid, ProductItem, Section } from "@/components"
// Utils
import { useDragScroll } from "@/hooks"
import { ShopifyProduct } from "@/types"

// Props
interface Props {
  title?: string
  productsData: {
    products: ShopifyProduct[]
  }
}

export default function HorizontalFeedBasic({ title, productsData }: Props) {
  const feedRef = useRef<HTMLUListElement | null>(null)
  useDragScroll(feedRef)

  if (!productsData?.products) return null
  const { products } = productsData

  const renderProduct = () =>
    products.map((product) => {
      const { id, variants } = product
      const { edges } = variants
      // Find the first available variant
      const availableVariant = edges.find(
        (variant) => variant.node.availableForSale
      )
      if (!availableVariant) return null
      const { node: firstVariant } = availableVariant

      return (
        firstVariant && (
          <li
            key={id}
            className={`w-[220px] sm:w-[250px] md:w-[340px] lg:w-[400px] xl:w-[500px]`}
          >
            <ProductItem product={firstVariant} node={product} />
          </li>
        )
      )
    })

  return (
    <Section withPadding={false}>
      <Grid>
        <h1 className="col-span-full row-span-1 text-2xl uppercase sm:text-3xl md:text-4xl xl:text-5xl">
          {title}
        </h1>

        <ul
          className="grid-cols-[auto auto] col-start-1 col-end-13 mt-5 grid cursor-grab snap-x grid-flow-col gap-4 overflow-x-auto overflow-y-auto overscroll-contain scroll-smooth"
          ref={feedRef}
        >
          {renderProduct()}
        </ul>
      </Grid>
    </Section>
  )
}
