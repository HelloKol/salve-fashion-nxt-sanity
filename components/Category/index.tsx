import React from "react";
import Link from "next/link";
import { Container, Grid, ImageTag, Section } from "@/components";
// Props
interface Props {}

export default function index({}: Props) {
  return (
    <Section>
      <Container>
        <Grid>
          <h5 className="col-start-1 col-end-13 row-span-1 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase">
            Categories
          </h5>
          <div className="col-span-full flex flex-col lg:flex-row">
            <Link
              href={`/shop/men`}
              className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[550px] xl:h-[700px] lg:w-1/2 relative overflow-hidden"
            >
              <ImageTag src="/static/mock_prodct_images/men.avif" />
              <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black opacity-50" />
              <p className="z-10 absolute bottom-0 left-0 p-10 text-white text-2xl">
                For Men
              </p>
              <p className="z-10 absolute bottom-0 left-0 p-10 pb-5 text-white text-sm">
                View all products
              </p>
            </Link>
            <Link
              href={`/shop/women`}
              className="w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[550px] xl:h-[700px] lg:w-1/2 relative overflow-hidden"
            >
              <ImageTag src="/static/mock_prodct_images/women.avif" />
              <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black opacity-50" />
              <p className="z-10 absolute bottom-0 left-0 p-10 text-white text-2xl">
                For Women
              </p>
              <p className="z-10 absolute bottom-0 left-0 p-10 pb-5 text-white text-sm">
                View all products
              </p>
            </Link>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}
