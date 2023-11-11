import React from "react";
import Link from "next/link";
import {
  Button,
  Container,
  FilterProduct,
  Grid,
  ImageTag,
  Main,
  Section,
} from "@/components";

export default function index() {
  const renderProducts = () =>
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
      return (
        <li key={index} className="col-span-4 mb-6">
          <Link href={`/shop/asd`} className="block">
            <div className="w-full h-[800px] overflow-hidden rounded-2xl">
              <ImageTag src="/static/images/product2.jpg" />
            </div>
            <div className="flex justify-between">
              <p className="text-lg uppercase">Classic Beanies</p>
              <p className="text-lg uppercase">£122.34</p>
            </div>
          </Link>
        </li>
      );
    });

  return (
    <>
      <Main>
        <Section>
          <div className="w-full h-96">
            <ImageTag src="/static/images/product2.jpg" />
          </div>
          <Container>
            <Grid>
              <h1 className="col-start-1 col-end-6 mt-20 text-9xl">All Men</h1>
              <article className="col-start-6 col-end-10 mt-20">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus doloremque pariatur impedit voluptatem numquam
                  quibusdam mollitia tempore exercitationem assumenda accusamus
                  modi, sequi eius saepe. Consequuntur accusamus beatae esse
                  omnis incidunt!
                </p>
              </article>

              <div className="col-start-1 col-end-10 mt-14 flex items-center gap-4">
                <Button variant="primary">All</Button>
                <Button variant="primary" isActive={true}>
                  Hoodies
                </Button>
                <Button variant="primary">Shirts</Button>
                <Button variant="primary">Joggers</Button>
              </div>

              <div className="col-start-10 col-end-13 mt-14 ml-auto">
                <FilterProduct />
              </div>

              <ul className="col-span-full mt-44">
                <Grid>{renderProducts()}</Grid>
              </ul>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  );
}
