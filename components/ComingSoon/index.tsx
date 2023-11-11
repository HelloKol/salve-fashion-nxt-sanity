import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Main, Section, Container, Grid, Button, ImageTag } from "@/components";

const ComingSoon = () => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const launchDate = new Date("2023-12-11T00:00:00Z").getTime();

    // Update the countdown every 1 second
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(interval);
        setCountdown("We're live!");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Salve Fashion | Coming soon!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main withPadding={false}>
        <Section className="py-14">
          <Container>
            <Grid className="items-center">
              <div className="col-span-12 md:col-start-1 md:col-end-8 lg:col-start-2 lg:col-end-7 xl:col-end-6 pb-8 lg:p-0 content text-left">
                <h1 className="text-6xl font-semibold mb-4">Coming soon!</h1>
                <p className="text-lg mb-6">
                  Our brand new e-commerce store is in the works, and we
                  can&apos;t wait to share it with you. Get ready for an
                  exceptional shopping experience with the latest products and
                  exclusive deals.
                </p>

                <div id="countdown" className="text-2xl mb-6">
                  {countdown}
                </div>

                <form id="subscribe-form" className="flex items-center">
                  <Button type={"button"} variant={"quaternary"}>
                    Subscribe
                  </Button>
                </form>
              </div>

              <div
                className={`col-span-12 sm:col-start-2 sm:col-end-12 lg:col-start-8 lg:col-end-13 xl:col-start-8 xl:col-end-12 w-full h-[400px] md:h-[600px] lg:h-[700px] xl:h-[800px]`}
              >
                <ImageTag
                  src="/static/images/coming-soon-1.jpg"
                  alt="Coming Soon Image"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  );
};

export default ComingSoon;
