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
              <ul className="col-span-12 flex gap-4">
                <AccountNavigation />
              </ul>

              <div className="col-span-full">
                <BreadCrumb />
              </div>

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

              <div className="col-span-5 row-start-4">
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
