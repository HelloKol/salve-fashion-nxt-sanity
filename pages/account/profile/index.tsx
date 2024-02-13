import { GetStaticPropsResult } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { Main, Section, Container, Grid, Button, Logout } from "@/components"
import { sanityClient } from "@/utils"
import styles from "./styles.module.scss"
import { USER_DETAILS } from "@/services/queries"
import { useEffect } from "react"
import { graphqlClient } from "@/utils"
import { useAuth } from "@/context/User"
import Link from "next/link"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

interface PageProps {}

const SvgRight = () => (
  <svg
    className="h-4 w-4 text-gray-800"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m9 5 7 7-7 7"
    />
  </svg>
)

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const { userDetails } = useAuth()

  console.log(userDetails)

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

              <p className="col-span-12 mb-4">
                {userDetails?.firstName} {userDetails?.lastName}
              </p>

              <div className="col-span-5 border border-black">
                <Link
                  href={"/account/profile/address"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 uppercase hover:bg-[#d5d6c8]"
                >
                  <span className="uppercase">Addresses</span>
                  <SvgRight />
                </Link>
                <Link
                  href={"/account/profile"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 uppercase hover:bg-[#d5d6c8]"
                >
                  <span className="uppercase">Wallet</span>
                  <SvgRight />
                </Link>
                <Link
                  href={"/account/profile/change-email"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <p className="uppercase">Email</p>
                    <p>{userDetails?.email}</p>
                  </div>
                  <SvgRight />
                </Link>
                {userDetails?.defaultAddress?.phone && (
                  <li className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]">
                    <div>
                      <p className="uppercase">Phone</p>
                      <p>{userDetails?.defaultAddress?.phone}</p>
                    </div>
                    <SvgRight />
                  </li>
                )}
                <Link
                  href={"/account/profile/change-password"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <p className="uppercase">Change password</p>
                    <p>******</p>
                  </div>
                  <SvgRight />
                </Link>
              </div>

              <div className="col-span-12">
                <Logout />
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
