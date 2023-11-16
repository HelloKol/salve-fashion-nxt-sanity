import React, { useRef } from "react"
// Components
import { Button, Grid, ImageTag, Section } from "@/components"
// Utils
import { useDragScroll } from "@/hooks"
import styles from "./styles.module.scss"

// Props
interface Props {
  title?: string
  data: []
}

export default function HorizontalFeedBasic({ title, data }: Props) {
  const feedRef = useRef<HTMLUListElement | null>(null)
  useDragScroll(feedRef)

  return (
    <Section withPadding={false}>
      <Grid>
        <h1 className="col-span-full row-span-1 text-2xl uppercase sm:text-3xl md:text-4xl xl:text-5xl">
          {title}
        </h1>

        <ul
          className="grid-cols-[auto auto] col-start-1 col-end-13 grid cursor-grab snap-x grid-flow-col gap-4 overflow-x-auto overflow-y-auto overscroll-contain scroll-smooth"
          ref={feedRef}
        >
          {[1, 1, 1, 1, 1, 1].map((item, index) => (
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
    </Section>
  )
}
