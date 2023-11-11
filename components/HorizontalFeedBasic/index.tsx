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
}

export default function index({ title, data }: Props) {
  const feedRef = useRef<HTMLUListElement | null>(null);
  useDragScroll(feedRef);

  return (
    <Section>
      <Container>
        <Grid>
          <h1 className="row-span-1 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase">
            {title}
          </h1>

          <ul
            className="col-start-1 col-end-13 gap-4 grid grid-cols-[auto auto] grid-flow-col overflow-x-auto overflow-y-auto overscroll-contain snap-x scroll-smooth cursor-grab"
            ref={feedRef}
          >
            {[1, 1, 1, 1, 1, 1].map((item, index) => (
              <li key={index}>
                <div
                  className={`w-[220px] h-[300px] sm:w-[250px] sm:h-[360px] md:w-[340px] md:h-[450px] lg:w-[400px] lg:h-[550px] xl:w-[500px] xl:h-[650px] overflow-hidden rounded-2xl ${styles.imageWrapper}`}
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
  );
}
