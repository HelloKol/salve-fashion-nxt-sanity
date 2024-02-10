import { GetStaticPropsResult } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { Main, Section, Container, Grid, Button, Logout } from "@/components"
import { sanityClient } from "@/utils/sanity"
import styles from "./styles.module.scss"
import { USER_DETAILS } from "@/services/queries"
import { useEffect } from "react"
import { graphqlClient } from "@/utils"
import { useAuth } from "@/context/User"

const navigationLinks = [
  { href: "/account/profile", text: "Account" },
  { href: "/account/order-history", text: "Order history" },
]

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { userDetails } = useAuth()

  console.log(userDetails)

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

            <ul>
              <li>
                <p>{userDetails?.firstName}</p>
              </li>
              <li>
                <p>{userDetails?.lastName}</p>
              </li>
              <li>
                <p>{userDetails?.email}</p>
              </li>
            </ul>
            <Logout />
          </Container>
        </Section>
      </Main>
    </>
  )
}
