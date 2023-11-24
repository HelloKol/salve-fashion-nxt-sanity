import React, { useEffect, useState } from "react"
// @ts-ignore
import { useSpringCarousel } from "react-spring-carousel"
import {
  AddToCart,
  Button,
  Container,
  Grid,
  HorizontalFeedBasic,
  ImageTag,
  Main,
  RadixAccordion,
  Section,
} from "@/components"
import { useWindowDimension } from "@/hooks"
import styles from "./styles.module.scss"
import { ShopifySingleProduct } from "@/types"
import { GetStaticPaths, GetStaticProps } from "next/types"
import { ParsedUrlQuery } from "querystring"
import { ALL_PRODUCTS, SINGLE_PRPDUCT } from "@/services/queries"
import { graphqlClient } from "@/utils"
import ProductVariants from "./ProductVariants"

export interface ProductProps {
  product: ShopifySingleProduct
}

export default function Page({ product }: ProductProps): JSX.Element | null {
  const { isMobile, isMobileLarge, isTablet, isDesktop, isWidescreen } =
    useWindowDimension()
  const [index, setIndex] = useState(0)
  const [showFullArticle, setShowFullArticle] = useState(false)
  // State to track selected size and clicked variant id
  const [selectedSize, setSelectedSize] = useState(null)
  const [clickedVariantId, setClickedVariantId] = useState("")

  const initialTrimLength =
    isMobile || isMobileLarge
      ? 150
      : isTablet
        ? 250
        : isDesktop
          ? 175
          : isWidescreen
            ? 280
            : 140
  const trimLength = showFullArticle ? Infinity : initialTrimLength

  const articleText = `
    Bringing a rustic authentic charm to any outfit, the Faux
    Shearling Mid Jacket is the perfect layering piece to expand
    your options whilst maintaining a distinctive personal
    style. Since the 1950s, this outdoors staple has been a
    popular choice adding depth to your personal look. With a
    timelessly thick woollen lining and incredible insulation
    and comfort, the shearling jacket is your go-to transitional
    piece.
  `.trim()

  const trimArticle = (str: string) => {
    if (!str?.length) return null
    const trimmedText = str.slice(0, trimLength)
    const ellipsis = str.length > trimLength ? "..." : ""
    return `${trimmedText}${ellipsis}`
  }

  const toggleShowFullArticle = () => {
    setShowFullArticle(!showFullArticle)
  }

  if (!product) return <div>Product not found</div>
  const { productByHandle } = product
  const { title, description, images, variants } = productByHandle
  const { edges } = variants

  // Extract unique sizes
  const sizes = [
    ...new Set(
      edges.map(
        (variant) =>
          variant.node.selectedOptions.find((opt) => opt.name === "Size").value
      )
    ),
  ]

  const {
    carouselFragment,
    thumbsFragment,
    slideToItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    withLoop: true,
    withThumbs: true,
    items: edges.map((item: any, i: React.Key) => {
      const { node } = item
      const { image } = node
      const { transformedSrc } = image
      const id = i
      const isActive = index === i

      return {
        id,
        renderItem: (
          <div className="pointer-events-none h-[500px] w-full select-none overflow-hidden rounded-2xl sm:h-[700px] md:h-[500px] lg:h-[800px] xl:h-[900px]">
            <ImageTag src={transformedSrc} />
          </div>
        ),
        renderThumb: (
          <div
            className={`cursor-pointer ${
              isActive ? `opacity-100` : `opacity-50`
            }`}
            onClick={() => slideToItem(i)}
          >
            <div className="pointer-events-none h-24 w-24 select-none overflow-hidden rounded-lg">
              <ImageTag src={transformedSrc} />
            </div>
          </div>
        ),
      }
    }),
  })

  useListenToCustomEvent((data: any) => {
    if (data.eventName === "onSlideStartChange") {
      setIndex(data.nextItem.index)
    }
  })

  const renderSize = () =>
    sizes.map((size, index) => {
      return (
        <Button
          key={index}
          onClick={() => setSelectedSize(size)}
          isActive={selectedSize === size}
        >
          {size}
        </Button>
      )
    })

  return (
    <>
      <Main withPadding={false}>
        <Section>
          <Container>
            <Grid>
              <div className="col-span-full md:col-end-7 lg:col-start-1 lg:col-end-8 lg:px-4 xl:col-start-2 xl:col-end-7 xl:px-6">
                <div className="h-[500px] w-full overflow-hidden sm:h-[700px] md:h-[500px] lg:h-[800px] xl:h-[900px]">
                  {carouselFragment}
                </div>
                {images && (
                  <div className={styles.thumbsFragment}>{thumbsFragment}</div>
                )}
              </div>

              <div className="col-span-full md:col-start-7 lg:col-start-8 lg:col-end-13 xl:col-start-7 xl:col-end-11">
                <h1 className="text-3xl lg:text-4xl">{title}</h1>

                <h3 className="mt-2 text-xl lg:text-2xl">
                  {edges[0].node.priceV2.currencyCode}{" "}
                  {edges[0].node.priceV2.amount}
                </h3>

                <article className="mt-6">
                  <p className="m-0">{trimArticle(description)}</p>
                  {articleText.length > initialTrimLength && (
                    <span
                      onClick={toggleShowFullArticle}
                      className="mt-1 block cursor-pointer text-sm font-semibold underline lg:mt-0 lg:text-lg"
                    >
                      {showFullArticle ? "less" : "more"}
                    </span>
                  )}
                </article>

                <div className="mt-6 flex items-center gap-4">
                  <span className="uppercase">Size</span>
                  <div className="flex gap-2">{renderSize()}</div>
                </div>

                <div className="mt-6 flex gap-4">
                  {edges.map((variant, index) => {
                    const sizeValue = variant.node.selectedOptions.find(
                      (opt) => opt.name === "Size"
                    ).value
                    const isClickable = sizeValue === selectedSize

                    return (
                      <div
                        key={variant.node.id}
                        onClick={() => {
                          isClickable && setClickedVariantId(variant.node.id)
                          setIndex(index)
                        }}
                        style={{
                          cursor: isClickable ? "pointer" : "not-allowed",
                          opacity: isClickable ? 1 : 0.5,
                        }}
                      >
                        <img
                          src={variant.node.image.transformedSrc}
                          alt={variant.node.title}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className={`mt-6 flex flex-wrap gap-4 xl:flex-nowrap`}>
                  <AddToCart
                    variantId={clickedVariantId}
                    disabled={!clickedVariantId || !selectedSize}
                  />
                  <Button
                    variant={"primary"}
                    disabled={!clickedVariantId || !selectedSize}
                  >
                    Add to wishlist
                  </Button>
                </div>

                <div className="mt-8 lg:mt-10">
                  <RadixAccordion />
                </div>
              </div>

              <div className="col-span-full mt-16 md:mt-20 lg:mt-32 xl:mt-36">
                <HorizontalFeedBasic title={"Similar Products"} data={[]} />
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}

interface HandleParams extends ParsedUrlQuery {
  handle: string
}

export const getStaticPaths: GetStaticPaths<HandleParams> = async () => {
  const products: any = await graphqlClient.request(ALL_PRODUCTS)

  const paths = products?.products?.edges.map((product: any) => ({
    params: { handle: product?.node.handle },
  }))

  return {
    paths,
    fallback: false,
  }
}

interface HandleParams extends ParsedUrlQuery {
  handle: string
}

export const getStaticProps: GetStaticProps<
  ProductProps,
  HandleParams
> = async ({ params }) => {
  if (!params) return { notFound: true }

  try {
    const { handle } = params
    const variables = {
      handle,
    }
    const product: ShopifySingleProduct = await graphqlClient.request(
      SINGLE_PRPDUCT,
      variables
    )

    return {
      props: {
        product,
      },
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return { notFound: true }
  }
}
