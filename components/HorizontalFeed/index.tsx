import React, { useRef } from "react";
// Components
import { Button, Container, Grid, ImageTag, Section } from "@/components";
import Favourite from "@/components/svg/Favourite";
// Utils
import { useDragScroll, useHorizontalScroll } from "@/hooks";
import styles from "./styles.module.scss";

// Props
interface Props {
  title: string;
  data: [];
  href: string;
}

export default function index({ title, data, href }: Props) {
  const feedRef = useRef<HTMLUListElement | null>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const scrollLeft = useHorizontalScroll(feedRef, prevBtnRef, -200, -1000);
  const scrollRight = useHorizontalScroll(feedRef, nextBtnRef, 200, 1000);
  useDragScroll(feedRef);

  return (
    <Section>
      <Container>
        <Grid>
          <div className="col-span-full lg:col-start-1 lg:col-end-5 xl:col-start-1 xl:col-end-4 relative">
            <h1 className="row-span-1 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase">
              {title}
            </h1>

            <div className="flex items-center gap-8 mt-6 lg:mt-12">
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
            className="col-span-full lg:col-start-5 xl:col-start-4 lg:col-end-13 gap-4 grid grid-cols-[auto auto] grid-flow-col overflow-x-auto overflow-y-auto overscroll-contain snap-x scroll-smooth cursor-grab"
            ref={feedRef}
          >
            {[
              "/static/mock_prodct_images/men_1.webp",
              "/static/mock_prodct_images/men_2.webp",
              "/static/mock_prodct_images/men_3.webp",
            ].map((item, index) => (
              <li key={index}>
                <div
                  className={`w-[220px] h-[300px] sm:w-[250px] sm:h-[360px] md:w-[340px] md:h-[450px] lg:w-[400px] lg:h-[550px] xl:w-[500px] xl:h-[650px] overflow-hidden rounded-2xl ${styles.imageWrapper}`}
                >
                  <ImageTag src={item} />
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
                  <p className="text-lg uppercase">Black/white Casual Pants </p>
                  <p className="text-lg uppercase">£122.34</p>
                </div>
              </li>
            ))}
          </ul>
        </Grid>
      </Container>
    </Section>
  );
}
