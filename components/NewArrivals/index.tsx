import React from "react"
import Link from "next/link"
// Components
import { Container, Grid, ImageTag, Section } from "@/components"

// Props
interface Props {}

export default function index({}: Props) {
  return (
    <Section>
      <Container>
        <Grid>
          <div className="col-span-full lg:col-start-1 lg:col-end-4">
            <h1 className="row-span-1 uppercase sm:text-3xl md:text-4xl xl:text-5xl">
              New Arrivals
            </h1>

            <article className="py-6">
              <p>
                Discover the latest additions to our catalog, now available in
                our &apos;New Arrivals&apos; section. Stay ahead of the curve
                with fresh styles and must-have products.
              </p>
            </article>
          </div>

          <Link
            className={`col-span-full md:col-start-1 md:col-end-7 lg:col-start-4 lg:col-end-8 xl:col-start-4 xl:col-end-7`}
            href={`/shop/asd`}
          >
            <div
              className={`h-[500px] w-full overflow-hidden rounded-2xl md:h-[470px] lg:h-[550px] xl:h-[650px]`}
            >
              <ImageTag src="/static/mock_prodct_images/hoodie_3.webp" />
            </div>
            <p>Essentials Hoodie</p>
            <p>£122.30</p>
          </Link>

          <Link
            className={`col-span-full md:col-start-7 md:col-end-13 lg:col-start-1 lg:col-end-5 xl:col-start-1 xl:col-end-4`}
            href={`/shop/asd`}
          >
            <div
              className={`h-[500px] w-full overflow-hidden rounded-2xl md:h-[470px] lg:h-[550px] xl:h-[650px]`}
            >
              <ImageTag src="/static/mock_prodct_images/hoodie_2.webp" />
            </div>
            <p>Essentials Hoodie</p>
            <p>£122.30</p>
          </Link>

          <Link
            className={`col-start-1 col-end-13 h-full lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-3 xl:col-start-7 xl:col-end-13 xl:row-start-1 xl:row-end-3`}
            href={`/shop/asd`}
          >
            <div
              className={`h-[500px] w-full overflow-hidden rounded-2xl md:h-[800px] lg:h-full`}
            >
              <ImageTag src="/static/mock_prodct_images/hoodie_1.webp" />
            </div>
            <p>Essentials Hoodie</p>
            <p>£122.30</p>
          </Link>
        </Grid>
      </Container>
    </Section>
  )
}
