import Head from "next/head"
import { useRouter } from "next/router"
import {
  Main,
  Section,
  Container,
  Grid,
  Button,
  BreadCrumb,
  Seo,
  AccountNavigation,
} from "@/components"
import { useAuth } from "@/context/User"

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const { userDetails } = useAuth()

  return (
    <>
      <Seo
        seo={{
          title: "Address -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />

              <BreadCrumb />

              <div className="col-span-full mb-4 flex items-center justify-between sm:col-span-10 md:col-span-6 lg:col-span-5">
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

              <div className="col-span-full row-start-4 sm:col-span-10 md:col-span-6 lg:col-span-5">
                <p>{userDetails?.defaultAddress?.name}</p>
                <p>
                  {userDetails?.defaultAddress?.address1}
                  {userDetails?.defaultAddress?.address2 &&
                    `, ${userDetails?.defaultAddress?.address2}`}
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
