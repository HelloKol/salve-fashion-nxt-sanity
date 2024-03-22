import { Container, Main, Section } from "@/components"
import Head from "next/head"

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Main withPadding={true}>
        <Section>
          <Container>
            <h1>404 - Page Not Found</h1>
          </Container>
        </Section>
      </Main>
    </>
  )
}
