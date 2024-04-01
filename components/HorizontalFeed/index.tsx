import React, { useRef } from "react"
// Components
import { Button, Container, Grid, ProductItem, Section } from "@/components"
// Utils
import { useDragScroll, useHorizontalScroll } from "@/hooks"
import { LinksType, ShopifyProduct } from "@/types"

// Props
interface Props {
  productsData: {
    title: string
    text: string
    links: LinksType[]
    productWithVariant: {
      product: {
        store: {
          variants: ShopifyProduct[]
        }
      }
    }[]
  }
}

export default function HorizontalFeed({ productsData }: Props) {
  const feedRef = useRef<HTMLUListElement | null>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const scrollLeft = useHorizontalScroll(feedRef, prevBtnRef, -200, -1000)
  const scrollRight = useHorizontalScroll(feedRef, nextBtnRef, 200, 1000)
  useDragScroll(feedRef)

  if (!productsData) return null
  const { title, text, links, productWithVariant } = productsData

  const renderProduct = () =>
    productWithVariant &&
    productWithVariant.map((item: any, index) => {
      const { product } = item
      const { store } = product
      // Find the first available variant
      const availableVariant = store.variants.find(
        (variant: any) => variant.store.inventory.isAvailable
      )
      if (!availableVariant) return null
      const { store: firstVariant } = availableVariant

      const productDetails = {
        id: firstVariant.gid,
        price: {
          amount: firstVariant.price,
        },
        image: {
          transformedSrc: firstVariant.previewImageUrl,
        },
      }
      const nodeDetails = {
        title: product.store.title,
        handle: product.store.slug.current,
      }

      return (
        <li
          key={index}
          className={`w-[220px] sm:w-[250px] md:w-[340px] lg:w-[400px] xl:w-[500px]`}
        >
          {/* @ts-ignore */}
          <ProductItem product={productDetails} node={nodeDetails} />
        </li>
      )
    })

  return (
    <Section>
      <Container>
        <Grid>
          <div className="relative col-span-full lg:col-start-1 lg:col-end-5 xl:col-start-1 xl:col-end-4">
            <h1 className="row-span-1 text-3xl uppercase md:text-4xl xl:text-5xl">
              {title}
            </h1>

            <div className="mt-6 flex items-center gap-8 lg:mt-12">
              <Button
                variant={"primary"}
                elementRef={prevBtnRef}
                disabled={scrollLeft.scrollX === 0}
              >
                prev
              </Button>
              <Button
                variant={"primary"}
                elementRef={nextBtnRef}
                disabled={scrollRight.scrollEnd}
              >
                next
              </Button>
            </div>

            <div className="lg:absolute lg:bottom-0">
              <article className="py-6">
                <p>{text}</p>
              </article>
              <Button
                className="mt-auto"
                variant={"primary"}
                href={`/shop/${links[0].url.current}`}
              >
                Shop all
              </Button>
            </div>
          </div>

          <ul
            className="grid-cols-[auto auto] col-span-full grid cursor-grab snap-x grid-flow-col gap-4 overflow-x-auto overflow-y-auto overscroll-contain scroll-smooth lg:col-start-5 lg:col-end-13 xl:col-start-4"
            ref={feedRef}
          >
            {renderProduct()}
          </ul>
        </Grid>
      </Container>
    </Section>
  )
}
