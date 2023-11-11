import React, { useState } from "react";
// @ts-ignore
import { useSpringCarousel } from "react-spring-carousel";
import {
  Button,
  Container,
  Grid,
  HorizontalFeedBasic,
  ImageTag,
  Main,
  Section,
} from "@/components";

export default function Page() {
  const [index, setIndex] = useState(0);

  const {
    carouselFragment,
    thumbsFragment,
    slideToItem,
    useListenToCustomEvent,
  } = useSpringCarousel({
    withLoop: true,
    withThumbs: true,
    carouselSlideAxis: "y",
    items: [1, 1, 1].map((item: any, i: React.Key) => {
      const id = i;
      const isActive = index === i;
      return {
        id,
        renderItem: (
          <div className="w-full h-[500px] sm:h-[700px] md:h-[700px] lg:h-[600px] xl:h-[800px] overflow-hidden rounded-2xl select-none pointer-events-none">
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
            <div className="w-24 h-24 overflow-hidden rounded-lg select-none pointer-events-none">
              <ImageTag src="/static/images/product2.jpg" />
            </div>
          </div>
        ),
      };
    }),
  });

  useListenToCustomEvent((data: any) => {
    if (data.eventName === "onSlideStartChange") {
      setIndex(data.nextItem.index);
    }
  });

  const renderSize = () =>
    ["S", "M", "L"].map((item, index) => {
      const className =
        index === 1
          ? "w-fit h-fit shrink-0 bg-[#171717] rounded-full px-6 py-1 flex items-center justify-center text-white text-sm uppercase"
          : "w-fit h-fit shrink-0 border border-black rounded-full px-6 py-1 flex items-center justify-center text-sm uppercase";
      return (
        <button key={index} className={className}>
          {item}
        </button>
      );
    });

  return (
    <>
      <Main withPadding>
        <Section>
          <Container>
            <Grid>
              <div className="col-span-full lg:col-start-1 lg:col-end-7 xl:col-start-1 xl:col-end-6 flex flex-col-reverse md:flex-row gap-8">
                <div className="thumbsFragment">{thumbsFragment}</div>
                <div className="w-full h-[500px] sm:h-[700px] md:h-[700px] lg:h-[600px] xl:h-[800px] overflow-hidden">
                  {carouselFragment}
                </div>
              </div>

              <div className="col-span-full lg:col-start-7 lg:col-end-13 xl:col-start-6 xl:col-end-11">
                <h1 className="text-6xl uppercase">Classic Beanies</h1>

                <div className="mt-4">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                </div>

                <article className="mt-6">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Itaque facilis excepturi neque officia accusantium
                    repudiandae. Animi, labore. Ea iste enim consequatur
                    molestias voluptate! Fugiat vel repellendus eum sed tempora
                    maxime nulla nihil, deserunt, eveniet unde soluta magni
                    quibusdam nostrum, quisquam necessitatibus distinctio
                    blanditiis perspiciatis. Optio nemo consequuntur aspernatur
                    numquam adipisci.
                  </p>
                </article>

                <div className="mt-6 flex items-center gap-16">
                  <span className="uppercase">Size</span>
                  <div className="flex gap-2">{renderSize()}</div>
                </div>

                <div className={`mt-6 flex flex-wrap xl:flex-nowrap gap-4`}>
                  <Button className="w-full" variant={"quaternary"}>
                    Add to cart
                  </Button>
                  <Button variant={"primary"}>Add to wishlist</Button>
                </div>
              </div>

              <div className="col-span-full">
                <HorizontalFeedBasic title={"Similar Products"} data={[]} />
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  );
}
