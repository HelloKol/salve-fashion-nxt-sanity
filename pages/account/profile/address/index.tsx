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
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { userDetails } = useAuth()

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Main withPadding>
        <Section>
          <Container>
            <Grid>
              <ul className="col-span-12 flex gap-4">
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

              <div className="col-span-5 mb-4 flex items-center justify-between">
                <p>Addresses</p>
                {userDetails?.defaultAddress ? (
                  <Button
                    variant="quaternary"
                    href={`/account/profile/address/update`}
                  >
                    Edit address
                  </Button>
                ) : (
                  <Button
                    variant="quaternary"
                    href={`/account/profile/address/add`}
                  >
                    Add address
                  </Button>
                )}
              </div>

              <div className="col-span-5 row-start-3">
                <p>{userDetails?.defaultAddress?.name}</p>
                <p>
                  {userDetails?.defaultAddress?.address1},{" "}
                  {userDetails?.defaultAddress?.address2}
                </p>
                <p>{userDetails?.defaultAddress?.city}</p>
                <p>{userDetails?.defaultAddress?.province}</p>
                <p>{userDetails?.defaultAddress?.zip}</p>
                <p>{userDetails?.defaultAddress?.country}</p>
                <p>{userDetails?.defaultAddress?.phone}</p>
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
