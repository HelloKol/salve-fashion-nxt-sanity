import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useInView } from "react-intersection-observer"
import {
  Button,
  Container,
  FilterProduct,
  Grid,
  ImageTag,
  Main,
  Section,
} from "@/components"
import { fetchProducts } from "@/lib"
import { useWindowDimension } from "@/hooks"
import styles from "./styles.module.scss"
import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  const { isMobile, isMobileLarge, isTablet, isDesktop, isWidescreen } =
    useWindowDimension()
  const [showFullArticle, setShowFullArticle] = useState(false)
  const initialTrimLength =
    isMobile || isMobileLarge
      ? 120
      : isTablet
        ? 135
        : isDesktop
          ? 175
          : isWidescreen
            ? 280
            : 140
  const trimLength = showFullArticle ? Infinity : initialTrimLength

  const articleText = `
 The latest women's jackets and coats collection offers endless styles for your closet this season, find statement pieces with our women's long coats. Our outerwear seamlessly weaves signature aesthetics with functional features. Discover our range of women's puffer jackets for premium style insulated jackets that are versatile enough for any occasion. The iconic Superdry women's windcheater has been re-designed for the new season with cropped fits. Our women's leather jackets are the ideal solution for superior fit, offering beautifully crafted jackets in premium leather. Shop our range of women's t-shirts for an effortless combination with your jackets and coats to complete your casual outfits. Shop a women's parka coat for premium style and lavish warmth, and discover our recycled-fill jackets for a low-impact jacket choice.
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

  // ==================================================================
  // FETCH SHOPIFY DATA
  // ==================================================================
  const { ref, inView } = useInView({ threshold: 0 })
  const PRODUCT_LIMIT = 20

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ["productsMen", router.query],
    ({ pageParam }) => {
      const q = router.query?.q as string
      const sort = router.query?.sort as string
      const sortVal =
        sort === "latest" || sort === "oldest"
          ? "CREATED_AT"
          : sort === "highest_price" || sort === "lowest_price"
            ? "PRICE"
            : ""

      return fetchProducts(
        pageParam,
        PRODUCT_LIMIT,
        `tag:men${q ? `, title:${q}` : ""}`,
        sortVal
      )
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.hasNextPage
          ? lastPage.edges[lastPage.edges.length - 1].cursor
          : undefined
      },
    }
  )
  const products = data?.pages?.[0]?.edges

  useEffect(() => {
    if (inView && hasNextPage && products.length < PRODUCT_LIMIT) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, data?.pages])

  // ==================================================================
  // FETCH SHOPIFY DATA
  // ==================================================================

  const renderProducts = () =>
    products &&
    products.map((edge: any, index: number) => {
      const product = {
        id: edge.node.id,
        handle: edge.node.handle,
        title: edge.node.title,
        image: edge.node.featuredImage.originalSrc,
        price: `${edge.node.priceRange.maxVariantPrice.amount} ${edge.node.priceRange.maxVariantPrice.currencyCode}`,
      }
      const lastItem = index === products.length - 1

      if (lastItem)
        return (
          <li
            key={index}
            ref={ref}
            className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
          >
            <Link href={`/shop/${product.handle}`} className="block">
              <div
                className={`group relative h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[500px] lg:h-[700px] xl:h-[800px] ${styles.imageWrapper}`}
              >
                <ImageTag src={product.image} />

                <div
                  className={`duration-250 absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 opacity-0 transition-opacity ease-in-out group-hover:opacity-100 ${styles.feedInner}`}
                >
                  <div
                    className={`flex items-center justify-center ${styles.feedInner}`}
                  >
                    <div className={`flex flex-col gap-4`}>
                      <Button variant={"quaternary"}>Add to cart</Button>
                      <Button variant={"secondary"}>Learn more</Button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm font-bold uppercase text-gray-600 lg:text-lg">
                {product.title}
              </p>
              <p className="mt-2 text-sm font-bold uppercase lg:text-lg">
                {product.price}
              </p>
            </Link>
          </li>
        )

      return (
        <li
          key={index}
          className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <Link href={`/shop/${product.handle}`} className="block">
            <div
              className={`group relative h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[500px] lg:h-[700px] xl:h-[800px] ${styles.imageWrapper}`}
            >
              <ImageTag src={product.image} />

              <div
                className={`duration-250 absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 opacity-0 transition-opacity ease-in-out group-hover:opacity-100 ${styles.feedInner}`}
              >
                <div
                  className={`flex items-center justify-center ${styles.feedInner}`}
                >
                  <div className={`flex flex-col gap-4`}>
                    <Button variant={"quaternary"}>Add to cart</Button>
                    <Button variant={"secondary"}>Learn more</Button>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-bold uppercase text-gray-600 lg:text-lg">
              {product.title}
            </p>
            <p className="mt-2 text-sm font-bold uppercase lg:text-lg">
              {product.price}
            </p>
          </Link>
        </li>
      )
    })

  return (
    <>
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <h1 className="col-span-full mt-10 text-3xl md:text-5xl xl:mt-20">
                All Men
              </h1>

              <article className="col-span-full text-sm md:col-end-11 md:text-xl xl:col-end-9 xl:mt-2">
                <p className="m-0">{trimArticle(articleText)}</p>
                {articleText.length > initialTrimLength && (
                  <span
                    onClick={toggleShowFullArticle}
                    className="mt-1 block cursor-pointer text-sm font-semibold underline lg:mt-0 lg:text-lg"
                  >
                    {showFullArticle ? "less" : "more"}
                  </span>
                )}
              </article>

              <div className="col-start-1 col-end-8 mt-2 flex flex-wrap items-center gap-2 md:col-start-1 md:col-end-10 md:gap-4 xl:mt-4">
                <Button
                  variant="primary"
                  isActive={!router.query.q}
                  href={`/shop/men`}
                >
                  All
                </Button>
                <Button
                  variant="primary"
                  isActive={router.query.q === "hoodie"}
                  href={`/shop/men?q=hoodie`}
                >
                  Hoodies
                </Button>
                <Button
                  variant="primary"
                  isActive={router.query.q === "shirt"}
                  href={`/shop/men?q=shirt`}
                >
                  Shirts
                </Button>
                <Button
                  variant="primary"
                  isActive={router.query.q === "jogger"}
                  href={`/shop/men?q=jogger`}
                >
                  Joggers
                </Button>
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
                  {products?.length} items
                </p>
                {renderProducts()}
              </Grid>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
