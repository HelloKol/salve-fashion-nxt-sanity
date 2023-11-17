import React, { useState } from "react"
// @ts-ignore
import { useSpringCarousel } from "react-spring-carousel"
import {
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

export default function Page() {
  const { isMobile, isMobileLarge, isTablet, isDesktop, isWidescreen } =
    useWindowDimension()
  const [index, setIndex] = useState(0)
  const [showFullArticle, setShowFullArticle] = useState(false)
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

  const {
    carouselFragment,
    thumbsFragment,
    slideToItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    withLoop: true,
    withThumbs: true,
    items: [1, 1, 1].map((item: any, i: React.Key) => {
      const id = i
      const isActive = index === i
      return {
        id,
        renderItem: (
          <div className="pointer-events-none h-[500px] w-full select-none overflow-hidden rounded-2xl sm:h-[700px] md:h-[500px] lg:h-[800px] xl:h-[900px]">
            <ImageTag src="/static/images/product2.jpg" />
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
              <ImageTag src="/static/images/product2.jpg" />
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
    ["S", "M", "L"].map((item, index) => {
      const className =
        index === 1
          ? "w-fit h-fit shrink-0 bg-[#171717] rounded-full px-6 py-1 flex items-center justify-center text-white text-sm uppercase"
          : "w-fit h-fit shrink-0 border border-black rounded-full px-6 py-1 flex items-center justify-center text-sm uppercase"
      return (
        <button key={index} className={className}>
          {item}
        </button>
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
                <div className={styles.thumbsFragment}>{thumbsFragment}</div>
              </div>

              <div className="col-span-full md:col-start-7 lg:col-start-8 lg:col-end-13 xl:col-start-7 xl:col-end-11">
                <h1 className="text-3xl lg:text-4xl">Classic Beanies</h1>
                <div className="mt-4">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="h-4 w-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-2 text-xl lg:text-2xl">£122.34</h3>

                <article className="mt-6">
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

                <div className="mt-6 flex items-center gap-4">
                  <span className="uppercase">Size</span>
                  <div className="flex gap-2">{renderSize()}</div>
                </div>

                <div className={`mt-6 flex flex-wrap gap-4 xl:flex-nowrap`}>
                  <Button className="" variant={"quaternary"}>
                    Add to cart
                  </Button>
                  <Button variant={"primary"}>Add to wishlist</Button>
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
