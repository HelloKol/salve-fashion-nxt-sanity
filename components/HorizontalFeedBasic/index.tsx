import React, { useRef } from "react"
// Components
import { AddToCart, Button, Grid, ImageTag, Section } from "@/components"
// Utils
import { useDragScroll, useTruncateString } from "@/hooks"
import styles from "./styles.module.scss"

// Props
interface Props {
  title?: string
  productsData: any
}

export default function HorizontalFeedBasic({ title, productsData }: Props) {
  if (!productsData?.products) return null
  const { products } = productsData
  const feedRef = useRef<HTMLUListElement | null>(null)
  useDragScroll(feedRef)

  const renderProduct = () =>
    products.map((product: any) => {
      const { id, handle, variants } = product
      const { edges } = variants
      const title = useTruncateString(product.title, 45)
      const firstVariant = edges?.[0]?.node

      return (
        firstVariant && (
          <li
            key={id}
            className={`w-[220px] sm:w-[250px] md:w-[340px] lg:w-[400px] xl:w-[500px]`}
          >
            <div
              className={`h-[300px] overflow-hidden rounded-2xl sm:h-[360px] md:h-[450px] lg:h-[550px] xl:h-[650px] ${styles.imageWrapper}`}
            >
              <ImageTag src={firstVariant.image.transformedSrc} />
              <div
                className={`flex items-center justify-center ${styles.feedInner}`}
              >
                <div className={`flex flex-col gap-4`}>
                  {/* @ts-ignore */}
                  <AddToCart
                    productTitle={product.title}
                    selectedVariant={firstVariant}
                    disabled={false}
                  />
                  <Button
                    variant={"secondary"}
                    href={`/shop/product/${handle}`}
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between gap-4">
              <p className="break-all text-sm uppercase">{title}</p>
              <p className="text-sm uppercase">£{firstVariant.price.amount}</p>
            </div>
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
