import Link from "next/link"
import { useRouter } from "next/router"
import {
  AccountNavigation,
  Container,
  Grid,
  Logout,
  Main,
  Section,
  Seo,
} from "@/components"
import { useAuth } from "@/context/User"

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

  return (
    <>
      <Seo
        seo={{
          title: "Profile -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />

              <p className="col-span-12 mb-4">
                {userDetails?.firstName} {userDetails?.lastName}
              </p>

              <div className="col-span-5 border border-black">
                <Link
                  href={"/account/profile/address"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <span className="uppercase">Addresses</span>
                    <p>
                      {userDetails?.defaultAddress?.address1}
                      {userDetails?.defaultAddress?.address2 &&
                        `, ${userDetails?.defaultAddress?.address2}`}
                    </p>
                  </div>
                  <SvgRight />
                </Link>
                <Link
                  href={"/account/profile"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
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
                <Link
                  href={"/account/profile/change-phone"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <p className="uppercase">Phone</p>
                    <p>{userDetails?.phone}</p>
                  </div>
                  <SvgRight />
                </Link>
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
