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
  RadixPopover,
  RadixSlider,
  Section,
} from "@/components"
import { useWindowDimension } from "@/hooks"
import styles from "./styles.module.scss"
import { ShopifySingleProduct } from "@/types"
import { GetStaticPaths, GetStaticProps } from "next/types"
import { ParsedUrlQuery } from "querystring"
import { ALL_PRODUCTS, SINGLE_PRODUCT_BY_HANDLE } from "@/services/queries"
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
  const { title, description, descriptionHtml, images, variants } =
    productByHandle
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

  const [variantAvailability, setVariantAvailability] = useState({})
  const selectedVariantAvailable = variantAvailability[clickedVariantId]

  useEffect(() => {
    // Update variant availability when the selected size changes
    if (selectedSize) {
      const availability = {}
      edges.forEach((variant) => {
        const sizeValue = variant.node.selectedOptions.find(
          (opt) => opt.name === "Size"
        ).value
        const isAvailable = sizeValue === selectedSize
        availability[variant.node.id] = isAvailable
      })
      setVariantAvailability(availability)
    }
  }, [selectedSize, edges])

  useListenToCustomEvent((data: any) => {
    if (data.eventName === "onSlideStartChange") {
      setIndex(data.nextItem.index)
    }
  })

  const handleClickVariant = (index, variantID) => {
    setClickedVariantId(variantID)
    setIndex(index)
    slideToItem(index)
  }

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

  const renderVariants = () =>
    edges &&
    edges.map((variant, index) => {
      const isActive = variant.node.id === clickedVariantId

      return (
        <>
          <div
            key={variant.node.id}
            className={`${
              isActive
                ? "border-2 border-solid border-black"
                : "border-2 border-solid border-transparent"
            } h-14 w-14 cursor-pointer overflow-hidden rounded`}
            onClick={() => handleClickVariant(index, variant.node.id)}
          >
            <ImageTag
              src={variant.node.image.transformedSrc}
              alt={variant.node.title}
              layout="fill"
              objectFit="cover"
              priority={false}
            />
          </div>
        </>
      )
    })

  console.log(product)

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

                <article
                  className="mt-6"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                >
                  {/* <p className="m-0">{trimArticle(description)}</p> */}
                  {/* {articleText.length > initialTrimLength && (
                    <span
                      onClick={toggleShowFullArticle}
                      className="mt-1 block cursor-pointer text-sm font-semibold underline lg:mt-0 lg:text-lg"
                    >
                      {showFullArticle ? "less" : "more"}
                    </span>
                  )} */}
                </article>

                <div className="mt-6 flex items-center gap-4">
                  <span className="uppercase">Size</span>
                  <div className="flex gap-2">{renderSize()}</div>
                </div>

                <div className="mt-6 flex gap-2">{renderVariants()}</div>

                <div>
                  {!selectedVariantAvailable && (
                    <span className="mt-2 text-xs text-red-500">
                      The select product is not available
                    </span>
                  )}
                </div>

                <div className={`mt-6 flex flex-wrap gap-4 xl:flex-nowrap`}>
                  <AddToCart
                    productId={product?.productByHandle?.id}
                    variantId={clickedVariantId}
                    disabled={
                      !clickedVariantId ||
                      !selectedSize ||
                      !selectedVariantAvailable
                    }
                  />
                  <Button
                    variant={"primary"}
                    disabled={
                      !clickedVariantId ||
                      !selectedSize ||
                      !selectedVariantAvailable
                    }
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
      SINGLE_PRODUCT_BY_HANDLE,
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
