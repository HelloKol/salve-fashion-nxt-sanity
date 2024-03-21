import React, { useRef } from "react"
// Components
import {
  AddToCart,
  AddToCartVariant,
  Button,
  Container,
  Grid,
  ImageTag,
  Section,
} from "@/components"
// Utils
import { useDragScroll, useHorizontalScroll } from "@/hooks"
import styles from "./styles.module.scss"

// Props
interface Props {
  title: string
  productsData: any
  href: string
}

export default function HorizontalFeed({ title, productsData, href }: Props) {
  if (!productsData) return null
  const { productWithVariant } = productsData
  const feedRef = useRef<HTMLUListElement | null>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const scrollLeft = useHorizontalScroll(feedRef, prevBtnRef, -200, -1000)
  const scrollRight = useHorizontalScroll(feedRef, nextBtnRef, 200, 1000)
  useDragScroll(feedRef)

  const renderProduct = () =>
    productWithVariant &&
    productWithVariant.map((item: any, index: any) => {
      const { product, variant } = item
      const { store } = variant
      const { price, previewImageUrl } = store

      return (
        <li key={index}>
          <div
            className={`h-[300px] w-[220px] overflow-hidden rounded-2xl sm:h-[360px] sm:w-[250px] md:h-[450px] md:w-[340px] lg:h-[550px] lg:w-[400px] xl:h-[650px] xl:w-[500px] ${styles.imageWrapper}`}
          >
            <ImageTag src={previewImageUrl} />
            <div
              className={`flex items-center justify-center ${styles.feedInner}`}
            >
              <div className={`flex flex-col gap-4`}>
                <AddToCartVariant
                  productTitle={title}
                  selectedVariant={store}
                  disabled={false}
                />
                <Button
                  variant={"secondary"}
                  href={`/shop/product/${product.store.slug.current}`}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="text-sm uppercase">{product.store.title}</p>
            <p className="text-sm uppercase">£{price}</p>
          </div>
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
                <p>
                  Introducing our latest arrivals in men&apos;s fashion! Elevate
                  your style with our handpicked selection of the season&apos;s
                  hottest trends. From classic essentials to statement pieces,
                  our &apos;New In&apos; collection has everything you need.
                </p>
              </article>
              <Button className="mt-auto" variant={"primary"} href={href}>
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
