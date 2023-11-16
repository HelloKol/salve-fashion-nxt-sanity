import { GetStaticPropsResult } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Main, Section, Container, Grid, Button, Logout } from "@/components"
import { sanityClient } from "@/utils/sanity"
import styles from "./styles.module.scss"

const navigationLinks = [
  { href: "/account/profile", text: "Account" },
  { href: "/account/order-history", text: "Order history" },
]

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Main withPadding>
        <Section>
          <Container>
            <ul className="flex gap-4">
              {navigationLinks.map((link, index) => (
                <Button
                  key={index}
                  href={link.href}
                  variant="tertiary"
                  isActive={router.pathname === link.href}
                >
                  {link.text}
                </Button>
              ))}
            </ul>
            <h1>ACCOUNT PROFILE</h1>
            <Logout />
          </Container>
        </Section>
      </Main>
    </>
  )
}
