import React from "react"
import Link from "next/link"
import Head from "next/head"
import { Button, Container, Grid, ImageTag, Section } from "@/components"
import styles from "./styles.module.scss"

export default function Page() {
  const renderProducts = () =>
    [1, 1, 1, 1, 1].map((item, index) => {
      return (
        <li
          key={index}
          className="col-span-6 mb-8 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <Link href={`/shop/asd`} className="block">
            <div
              className={`group relative h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[500px] lg:h-[700px] xl:h-[800px] ${styles.imageWrapper}`}
            >
              <ImageTag src="/static/images/product2.jpg" />

              <div
                className={`duration-250 absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 opacity-0 transition-opacity ease-in-out group-hover:opacity-100 ${styles.feedInner}`}
              >
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
            </div>
            <p className="mt-4 text-sm font-bold uppercase text-gray-600 lg:text-lg">
              Classic Beanies
            </p>
            <p className="mt-2 text-sm font-bold uppercase lg:text-lg">
              £122.34
            </p>
          </Link>
        </li>
      )
    })

  return (
    <>
      <Head>
        <title>Collection</title>
      </Head>
      <Section>
        <Container>
          <div className="relative col-span-full h-[330px] w-full sm:h-[250px] md:h-[350px] lg:h-[500px] xl:h-[600px]">
            <ImageTag src="/static/images/aboutBg.jpg" />

            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-opacity-60 ">
              <div className="absolute bottom-0 top-1/2 flex max-w-4xl -translate-y-1/2 flex-col justify-center px-4 bg-blend-overlay sm:px-14 md:px-36 lg:left-1/2 lg:max-w-2xl lg:-translate-x-1/2 lg:px-0">
                <h1 className="text-center text-3xl uppercase text-gray-400 sm:text-4xl md:text-5xl lg:text-6xl">
                  Our Brand
                </h1>

                <article className="text-center text-sm text-gray-400 md:mt-2 md:text-lg lg:mt-4 lg:text-xl">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Hic ea similique vitae, illum facilis quaerat distinctio
                    harum voluptatibus dignissimos sed, autem doloribus dolor
                    aperiam provident porro, nulla ipsa alias cupiditate?
                  </p>
                </article>
              </div>
            </div>
          </div>

          <Grid
            as={"ul"}
            className="col-span-full mt-4 xl:mt-8"
            withRowGap={false}
          >
            <p className="col-span-full mb-4 text-sm font-bold lg:mb-6 xl:mb-8">
              {[1, 1, 1, 1, 1].length} items
            </p>
            {renderProducts()}
          </Grid>
        </Container>
      </Section>
    </>
  )
}
