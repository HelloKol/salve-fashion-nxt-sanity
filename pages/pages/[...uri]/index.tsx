import React from "react"
import Head from "next/head"
import { Container, Grid, ImageTag, Section } from "@/components"

export default function Page() {
  return (
    <>
      <Head>
        <title>Pages</title>
      </Head>
      <Section>
        <Container>
          <Grid>
            <article className="col-span-full md:col-start-3 md:col-end-11">
              <h1 className="text-4xl">Privacy Policy</h1>
              <p>
                Privacy Policy At Viralnoise (collectively, “Viralnoise”, “we”,
                “us”, or “our”), we recognize that your privacy is important.
                This Privacy Policy sets forth the basis on which the personal
                data collected from you, or that you provide to us will be
                processed by us, as well as related products and services we may
                offer to you (collectively referred to as the “Services”).
                Please read the information below to learn the following
                regarding your use of Viralnoise and our Services. You
                acknowledge that this Privacy Policy is designed to be read in
                connection with the Viralnoise Terms of Use, and that by
                accessing or using Viralnoise, you agree to be bound by the
                Viralnoise terms and conditions, as well as this Privacy Policy.
                We reserve the right to change this Privacy Policy from time to
                time. We will notify you about substantive changes in the way we
                treat personal information by sending a notice to the primary
                email address specified in your account, by placing a prominent
                notice on our site, and/or by updating this Privacy Policy. Your
                continued use of Viralnoise and/or the Services after such
                modifications will constitute your: (a) acknowledgment of the
                modified Privacy Policy; and (b) your agreement to abide and be
                bound by that Privacy Policy. If you have any questions about
                this Policy, please feel free to contact us here.
              </p>

              <p>
                IMPORTANT: BY USING VIRALNOISE AND/OR THE SERVICES, YOU GIVE
                YOUR CONSENT THAT ALL PERSONAL DATA YOU SUBMIT MAY BE PROCESSED
                BY US IN THE MANNER AND FOR THE PURPOSES DESCRIBED BELOW. IF YOU
                DO NOT AGREE TO THIS PROVACY POLICY, DO NOT USE VIRALNOISE.
              </p>
            </article>
          </Grid>
        </Container>
      </Section>
    </>
  )
}
