import React from "react"
import Head from "next/head"
import { Container, Grid, ImageTag, Section } from "@/components"

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Section>
        <Container>
          <Grid>
            <h1 className="col-span-full text-center text-5xl uppercase lg:text-6xl">
              Our Brand
            </h1>

            <div className="col-span-full h-[200px] w-full md:h-[300px] lg:h-[600px]">
              <ImageTag src="/static/images/aboutBg.jpg" />
            </div>

            <article className="col-span-full mt-10 text-2xl md:col-start-1 md:col-end-12 md:text-3xl md:text-4xl lg:col-start-2 lg:col-end-13 lg:mt-24 lg:text-5xl xl:col-start-3 xl:col-end-10">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatem excepturi placeat ducimus similiquer placeat ducimus
                similique
              </p>
            </article>

            <article className="col-start-2 col-end-13 text-lg md:col-start-3 lg:col-start-7 lg:col-end-13 lg:text-xl xl:col-start-8 xl:col-end-12">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic ea
                similique vitae, illum facilis quaerat distinctio harum
                voluptatibus dignissimos sed, autem doloribus dolor aperiam
                provident porro, nulla ipsa alias cupiditate?
              </p>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic ea
                similique vitae, illum facilis quaerat distinctio harum
                voluptatibus dignissimos sed.
              </p>
            </article>

            <div className="col-span-full mt-14 h-[500px] w-full sm:col-end-10 md:col-end-7 lg:col-start-2 lg:col-end-7 lg:row-start-5 lg:mt-24 lg:h-[600px] xl:col-start-3 xl:col-end-7 xl:h-[850px]">
              <ImageTag src="/static/images/aboutImg1.jpg" />
            </div>

            <div className="col-start-2 col-end-13 mt-10 md:col-start-3 lg:col-start-8 lg:col-end-13 lg:row-start-5 lg:mt-24 xl:col-start-8 xl:col-end-12">
              <p className="text-3xl">Naming our brand</p>
              <article className="mt-2 text-lg lg:mt-10 lg:text-xl">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
                  ea similique vitae, illum facilis quaerat distinctio harum
                  voluptatibus dignissimos sed, autem doloribus dolor aperiam
                  provident porro, nulla ipsa alias cupiditate?
                </p>
              </article>
            </div>

            <div className="col-span-full mt-6 h-[500px] w-full sm:col-start-4 md:col-start-7 lg:col-start-8 lg:col-end-13 lg:row-start-5 lg:mt-[400px] lg:h-[600px] xl:col-start-8 xl:col-end-12 xl:h-[850px]">
              <ImageTag src="/static/images/product1.jpg" />
            </div>

            <article className="col-span-full mt-10 text-2xl md:col-start-1 md:col-end-12 md:text-3xl md:text-4xl lg:col-start-2 lg:col-end-13 lg:mt-24 lg:text-5xl xl:col-start-3 xl:col-end-12">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic ea
                similique vitae, illum facilis quaerat distinctio harum
                voluptatibus dignissimos sed, autem doloribus dolor aperiam
                provident porro, nulla ipsa alias cupiditate?
              </p>
            </article>
          </Grid>
        </Container>
      </Section>
    </>
  )
}
