import Head from "next/head"
import { useRouter } from "next/router"
import { Main, Section, Container, Grid, Button } from "@/components"
import Link from "next/link"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]

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

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Change email</title>
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

              <div className="col-span-5 border border-black">
                <Link
                  href={"/account/settings/newsletter"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <span className="uppercase">NEWSLETTER</span>
                    <p>
                      Select your interests and receive the latest news and
                      trends each week.
                    </p>
                  </div>
                  <SvgRight />
                </Link>

                <Link
                  href={"/account/settings/newsletter"}
                  className="flex cursor-pointer items-center justify-between pb-4 pl-8 pr-8 pt-4 hover:bg-[#d5d6c8]"
                >
                  <div>
                    <span className="uppercase">Cookie settings</span>
                    <p>Configure your privacy preferences and cookies.</p>
                  </div>
                  <SvgRight />
                </Link>
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
