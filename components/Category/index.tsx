import React from "react"
import Link from "next/link"
import { Container, Grid, ImageTag, Section } from "@/components"
// Props
interface Props {}

export default function Category({}: Props) {
  return (
    <Section>
      <Container>
        <Grid>
          <h1 className="col-start-1 col-end-13 row-span-1 text-3xl uppercase md:text-4xl xl:text-5xl">
            Categories
          </h1>
          <div className="col-span-full flex flex-col lg:flex-row">
            <Link
              href={`/shop/men`}
              className="relative h-[300px] w-full overflow-hidden sm:h-[400px] md:h-[480px] lg:h-[550px] lg:w-1/2 xl:h-[700px]"
            >
              <ImageTag src="/static/mock_prodct_images/men.avif" />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black opacity-50" />
              <p className="absolute bottom-0 left-0 z-10 p-10 text-2xl text-white">
                For Men
              </p>
              <p className="absolute bottom-0 left-0 z-10 p-10 pb-5 text-sm text-white">
                View all products
              </p>
            </Link>
            <Link
              href={`/shop/women`}
              className="relative h-[300px] w-full overflow-hidden sm:h-[400px] md:h-[480px] lg:h-[550px] lg:w-1/2 xl:h-[700px]"
            >
              <ImageTag src="/static/mock_prodct_images/women.avif" />
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black opacity-50" />
              <p className="absolute bottom-0 left-0 z-10 p-10 text-2xl text-white">
                For Women
              </p>
              <p className="absolute bottom-0 left-0 z-10 p-10 pb-5 text-sm text-white">
                View all products
              </p>
            </Link>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
