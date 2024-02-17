import React from "react"
import Link from "next/link"
// Components
import { Container, Grid, ImageTag, Section } from "@/components"

// Props
interface Props {
  data: any
}

export default function index({ data }: Props) {
  if (!data) return null
  const { title, text, productWithVariant } = data
  const firstProduct = productWithVariant[0].product.store
  const firstProductVariant = productWithVariant[0].variant.store

  const secondProduct = productWithVariant[1].product.store
  const secondProductVariant = productWithVariant[1].variant.store

  const thirdProduct = productWithVariant[1].product.store
  const thirdProductVariant = productWithVariant[1].variant.store

  return (
    <Section>
      <Container>
        <Grid>
          <div className="col-span-full lg:col-start-1 lg:col-end-4">
            <h1 className="row-span-1 uppercase sm:text-3xl md:text-4xl xl:text-5xl">
              {title}
            </h1>

            <article className="py-6">
              <p>{text}</p>
            </article>
          </div>

          <Link
            className={`col-span-full md:col-start-1 md:col-end-7 lg:col-start-4 lg:col-end-8 xl:col-start-4 xl:col-end-7`}
            href={`/shop/product/${firstProduct.slug.current}`}
          >
            <div
              className={`h-[500px] w-full overflow-hidden rounded-2xl md:h-[470px] lg:h-[550px] xl:h-[650px]`}
            >
              <ImageTag src={firstProductVariant.previewImageUrl} />
            </div>
            <p>{firstProduct.title}</p>
            <p>£{firstProductVariant.price}</p>
          </Link>

          <Link
            className={`col-span-full md:col-start-7 md:col-end-13 lg:col-start-1 lg:col-end-5 xl:col-start-1 xl:col-end-4`}
            href={`/shop/product/${secondProduct.slug.current}`}
          >
            <div
              className={`h-[500px] w-full overflow-hidden rounded-2xl md:h-[470px] lg:h-[550px] xl:h-[650px]`}
            >
              <ImageTag src={secondProductVariant.previewImageUrl} />
            </div>
            <p>{secondProduct.title}</p>
            <p>£{secondProductVariant.price}</p>
          </Link>

          <Link
            className={`col-start-1 col-end-13 h-full lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-3 xl:col-start-7 xl:col-end-13 xl:row-start-1 xl:row-end-3`}
            href={`/shop/product/${thirdProduct.slug.current}`}
          >
            <div
              className={`h-[500px] w-full overflow-hidden rounded-2xl md:h-[800px] lg:h-full`}
            >
              <ImageTag src={thirdProductVariant.previewImageUrl} />
            </div>
            <p>{thirdProduct.title}</p>
            <p>£{thirdProductVariant.price}</p>
          </Link>
        </Grid>
      </Container>
    </Section>
  )
}
