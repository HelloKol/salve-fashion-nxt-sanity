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
import {
  ALL_PRODUCTS,
  SEARCH_QUERY_PREDICTIVE,
  SINGLE_PRODUCT_BY_HANDLE,
} from "@/services/queries"
import { graphqlClient } from "@/utils"

export interface ProductProps {
  page: {
    productByHandle: any
    predictiveProducts: any
  }
}

export default function Page({ page }: ProductProps): JSX.Element | null {
  if (!page) return null
  const { productByHandle, predictiveProducts } = page
  const [index, setIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null) as any

  if (!productByHandle) return <div>Product not found</div>
  const { predictiveSearch } = predictiveProducts
  const { product } = productByHandle
  const { title, description, descriptionHtml, images, variants } = product
  const { edges } = variants

  const sizes = [
    // @ts-expect-error
    ...new Set(
      edges.map(
        (variant: any) =>
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Size"
          ).value
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
  // @ts-expect-error
  const selectedVariantAvailable = variantAvailability[selectedVariant?.id]

  useEffect(() => {
    // Update variant availability when the selected size changes
    if (selectedSize) {
      const availability = {}
      edges.forEach((variant: any) => {
        const sizeValue = variant.node.selectedOptions.find(
          (opt: any) => opt.name === "Size"
        ).value
        const isAvailable = sizeValue === selectedSize
        // @ts-expect-error
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

  const handleClickVariant = (index: any, variant: any) => {
    setSelectedVariant(variant.node)
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
    edges.map((variant: any, index: any) => {
      const isActive = variant.node.id === selectedVariant?.id

      return (
        <>
          <div
            key={variant.node.id}
            className={`${
              isActive
                ? "border-2 border-solid border-black"
                : "border-2 border-solid border-transparent"
            } h-14 w-14 cursor-pointer overflow-hidden rounded`}
            onClick={() => handleClickVariant(index, variant)}
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
                />

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
                    productTitle={product.title}
                    selectedVariant={selectedVariant}
                    disabled={
                      !selectedVariant?.id ||
                      !selectedSize ||
                      !selectedVariantAvailable
                    }
                  />
                  <Button
                    variant={"primary"}
                    disabled={
                      !selectedVariant?.id ||
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
                <HorizontalFeedBasic
                  title={"Similar Products"}
                  productsData={predictiveSearch}
                />
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

    const productByHandle: any = await graphqlClient.request(
      SINGLE_PRODUCT_BY_HANDLE,
      variables
    )

    const firstVariantTitle =
      productByHandle?.product?.variants?.edges?.[0]?.node?.title

    const predictiveProducts = await graphqlClient.request(
      SEARCH_QUERY_PREDICTIVE,
      {
        query: firstVariantTitle || ``,
      }
    )

    return {
      props: {
        page: {
          productByHandle,
          predictiveProducts,
        },
      },
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return { notFound: true }
  }
}
