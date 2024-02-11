import React, { useRef } from "react"
// Components
import { Button, Container, Grid, ImageTag, Section } from "@/components"
// Utils
import { useDragScroll, useHorizontalScroll } from "@/hooks"
import styles from "./styles.module.scss"

// Props
interface Props {
  title: string
  data: []
  href: string
}

export default function HorizontalFeed({ title, data, href }: Props) {
  const feedRef = useRef<HTMLUListElement | null>(null)
  const prevBtnRef = useRef<HTMLButtonElement>(null)
  const nextBtnRef = useRef<HTMLButtonElement>(null)
  const scrollLeft = useHorizontalScroll(feedRef, prevBtnRef, -200, -1000)
  const scrollRight = useHorizontalScroll(feedRef, nextBtnRef, 200, 1000)
  useDragScroll(feedRef)

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
            {[
              "/static/mock_product_images/men_1.webp",
              "/static/mock_product_images/men_2.webp",
              "/static/mock_product_images/men_3.webp",
            ].map((item, index) => (
              <li key={index}>
                <div
                  className={`h-[300px] w-[220px] overflow-hidden rounded-2xl sm:h-[360px] sm:w-[250px] md:h-[450px] md:w-[340px] lg:h-[550px] lg:w-[400px] xl:h-[650px] xl:w-[500px] ${styles.imageWrapper}`}
                >
                  <ImageTag src="/static/images/product1.jpg" />
                  <div
                    className={`flex items-center justify-center ${styles.feedInner}`}
                  >
                    <div className={`flex flex-col gap-4`}>
                      <Button variant={"quaternary"} href={`/`}>
                        Add to cart
                      </Button>
                      <Button variant={"secondary"} href={`/`}>
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg uppercase">Classic Beanies</p>
                  <p className="text-lg uppercase">£122.34</p>
                </div>
              </li>
            ))}
          </ul>
        </Grid>
      </Container>
    </Section>
  )
}
