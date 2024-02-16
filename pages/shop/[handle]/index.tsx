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

const ACCORDION = [
  {
    _key: "0b4708ddb716",
    _type: "group",
    body: [
      {
        _key: "5cc8801bb10b",
        _type: "block",
        children: [
          {
            _key: "cc58529ed59d0",
            _type: "span",
            marks: [],
            text: "RETURN ONLINE & IN-STORE",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _key: "8c22774816ef",
        _type: "block",
        children: [
          {
            _key: "d47e089d76b70",
            _type: "span",
            marks: [],
            text: "We're committed to making sure you love everything you buy from us. If you're not completely happy with your product, you can return your item within 45 days for a full refund. Please see our terms and conditions.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    title: "Delivery and Returns",
  },
  {
    _key: "0b4708ddb216",
    _type: "group",
    body: [
      {
        _key: "5f56a686f338",
        _type: "block",
        children: [
          {
            _key: "7ebe3a76c5230",
            _type: "span",
            marks: [],
            text: "Free Wellness gift of your choice when you spend £39. Use code: WELLNESS. Valid 15 Feb 2024 - 29 Feb 2024.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    title: "Offers & Promotions",
  },
  {
    _key: "0b47083db716",
    _type: "group",
    body: [
      {
        _key: "5ac93d9b259c",
        _type: "block",
        children: [
          {
            _key: "7ea8b36471330",
            _type: "span",
            marks: [],
            text: "You can pay for purchases using a major credit card, including Visa, MasterCard, American Express, PayPal and Klarna",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ],
    title: "Payment Methods",
  },
]

export default function Page({ page }: ProductProps): JSX.Element | null {
  if (!page) return null
  const { productByHandle, predictiveProducts } = page
  if (!productByHandle) return null

  const [index, setIndex] = useState(0)
  // const [selectedSize, setSelectedSize] = useState(null)
  // const [selectedVariant, setSelectedVariant] = useState(null) as any
  const { predictiveSearch } = predictiveProducts
  const { product } = productByHandle
  const { title, description, descriptionHtml, images, variants } = product
  const { edges } = variants

  const sizes = [
    ...new Set(
      edges.map(
        (variant: any) =>
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Size"
          ).value
      )
    ),
  ]

  const colors = [
    ...new Set(
      edges.map(
        (variant: any) =>
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Color"
          ).value
      )
    ),
  ]

  const [selectedVariant, setSelectedVariant] = useState({
    size: sizes[0] || null,
    color: colors[0] || null,
  })

  const [variantAvailability, setVariantAvailability] = useState({}) as any
  const selectedVariantAvailable = variantAvailability[selectedVariant?.size]

  useEffect(() => {
    // Update variant availability when the selected size or color changes
    if (selectedVariant.size && selectedVariant.color) {
      const availability: any = {}
      edges.forEach((variant: any) => {
        const isAvailable =
          variant.node.selectedOptions.some(
            (opt: any) =>
              opt.name === "Size" && opt.value === selectedVariant.size
          ) &&
          variant.node.selectedOptions.some(
            (opt: any) =>
              opt.name === "Color" && opt.value === selectedVariant.color
          ) &&
          variant.node.availableForSale

        availability[variant.node.id] = isAvailable
      })
      setVariantAvailability(availability)
    }
  }, [selectedVariant.size, selectedVariant.color, edges])

  const {
    carouselFragment,
    thumbsFragment,
    slideToItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    withLoop: true,
    withThumbs: true,
    items: edges.map((item: any, i: number) => {
      const { node } = item
      const { image } = node
      const { transformedSrc } = image
      const id = i
      const isActive = selectedVariant.size === sizes[i]

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
      const isAvailable = edges.some(
        (variant: any) =>
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Size"
          ).value === size &&
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Color"
          ).value === selectedVariant.color &&
          variant.node.availableForSale
      )

      return (
        <Button
          key={index}
          onClick={() =>
            isAvailable && setSelectedVariant({ ...selectedVariant, size })
          }
          isActive={selectedVariant.size === size}
          disabled={!isAvailable}
        >
          {size}
        </Button>
      )
    })

  const renderColor = () =>
    colors.map((color: string, index: number) => {
      const isAvailable = edges.some(
        (variant) =>
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Color"
          ).value === color &&
          variant.node.selectedOptions.find(
            (opt: { name: string }) => opt.name === "Size"
          ).value === selectedVariant.size &&
          variant.node.availableForSale
      )

      return (
        <Button
          key={index}
          onClick={() => {
            if (isAvailable) {
              setSelectedVariant({ ...selectedVariant, color })
              const variantIndex = edges.findIndex(
                (variant) =>
                  variant.node.selectedOptions.find(
                    (opt: { name: string }) => opt.name === "Color"
                  ).value === color
              )
              slideToItem(variantIndex)
            }
          }}
          isActive={selectedVariant.color === color}
          disabled={!isAvailable}
        >
          {color}
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

                <article
                  className="mt-6"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />

                <div className="mt-6 flex items-center gap-4">
                  <span className="uppercase">Size</span>
                  <div className="flex gap-2">{renderSize()}</div>
                </div>

                <div className="mt-6 flex gap-2">{renderColor()}</div>

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
                  <RadixAccordion data={ACCORDION} />
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
  try {
    const products: any = await graphqlClient.request(ALL_PRODUCTS)

    const paths = products?.products?.edges.map((product: any) => ({
      params: { handle: product?.node.handle },
    }))

    return {
      paths,
      fallback: false,
    }
  } catch {
    return {
      paths: [],
      fallback: false,
    }
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
