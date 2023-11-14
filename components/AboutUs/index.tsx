import React from "react"
import { Container, Grid, ImageTag, Section } from ".."

// Props
interface Props {}

export default function AboutUs({}: Props) {
  return (
    <Section>
      <Container>
        <Grid>
          <div className="pointer-events-none col-span-full select-none text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:col-start-2 xl:col-end-12 xl:text-9xl">
            Salve{" "}
            <div className="inline-block h-10 w-16 overflow-hidden rounded-full align-middle md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60">
              <ImageTag src="/static/images/product1.jpg" />
            </div>{" "}
            welcomes you to an amazing{" "}
            <div className="inline-block h-10 w-16 overflow-hidden rounded-full align-middle md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60">
              <ImageTag src="/static/images/product2.jpg" />
            </div>{" "}
            world of boundless creativity, and{" "}
            <div className="inline-block h-10 w-16 overflow-hidden rounded-full align-middle md:h-14 md:w-24 lg:h-24 lg:w-36 xl:h-32 xl:w-60">
              <ImageTag src="/static/images/product1.jpg" />
            </div>{" "}
            limitless artistry.
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
