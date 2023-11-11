import React from "react";
import { Container, Grid, ImageTag, Section } from "..";

// Props
interface Props {}

export default function AboutUs({}: Props) {
  return (
    <Section>
      <Container>
        <Grid>
          <div className="col-span-full xl:col-start-2 xl:col-end-12 text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl text-center select-none pointer-events-none">
            Salve{" "}
            <div className="h-10 w-16 md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60 rounded-full overflow-hidden inline-block align-middle">
              <ImageTag src="/static/images/product1.jpg" />
            </div>{" "}
            welcomes you to an amazing{" "}
            <div className="h-10 w-16 md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60 rounded-full overflow-hidden inline-block align-middle">
              <ImageTag src="/static/images/product2.jpg" />
            </div>{" "}
            world of boundless creativity, and{" "}
            <div className="h-10 w-16 md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60 rounded-full overflow-hidden inline-block align-middle">
              <ImageTag src="/static/images/product1.jpg" />
            </div>{" "}
            limitless artistry.
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
