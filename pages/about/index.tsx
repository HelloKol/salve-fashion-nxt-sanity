import React from "react";
import Head from "next/head";
import { Container, Grid, ImageTag, Section } from "@/components";

export default function index() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Section>
        <Container>
          <Grid>
            <h1 className="col-span-full text-6xl uppercase text-center">
              Our Brand
            </h1>
            <div className="col-span-full h-[600px] w-full">
              <ImageTag src="/static/images/aboutBg.jpg" />
            </div>

            <article className="col-start-2 col-end-9 mt-24 text-6xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatem excepturi consequuntur placeat ducimus similiquer
                placeat ducimus similique
              </p>
            </article>

            <article className="col-start-7 col-end-11 text-xl">
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

            <div className="col-start-2 col-end-6 row-start-5 h-[850px] w-full mt-24">
              <ImageTag src="/static/images/aboutImg1.jpg" />
            </div>

            <div className="col-start-7 col-end-11 row-start-5 mt-24">
              <p className="text-6xl">Naming our brand</p>
              <article className="mt-10 text-xl">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic
                  ea similique vitae, illum facilis quaerat distinctio harum
                  voluptatibus dignissimos sed, autem doloribus dolor aperiam
                  provident porro, nulla ipsa alias cupiditate?
                </p>
              </article>
            </div>

            <div className="col-start-7 col-end-11 row-start-5 h-[850px] w-full mt-[400px]">
              <ImageTag src="/static/images/product1.jpg" />
            </div>

            <article className="col-start-2 col-end-11 mt-24 text-6xl">
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
  );
}
