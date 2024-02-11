import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Main, Section, Container, Grid, Button, ImageTag } from "@/components"
import { useAuth } from "@/context/User"

const navigationLinks = [
  { href: "/account/order", text: "Order history" },
  { href: "/account/profile", text: "Account" },
  { href: "/account/settings", text: "Settings" },
]
interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const { accessToken } = useAuth()
  const router = useRouter()
  const orders = [
    {
      image: `/static/mock_product_images/men_1.webp`,
    },
    {
      image: `/static/mock_product_images/men_2.webp`,
    },
    {
      image: `/static/mock_product_images/men_3.webp`,
    },
    {
      image: `/static/mock_product_images/hoodie_1.webp`,
    },
    {
      image: `/static/mock_product_images/hoodie_2.webp`,
    },
  ]

  const renderOrders = () =>
    orders &&
    orders.map((item: any, index: any) => {
      const { image } = item

      return (
        <div key={index} className="col-span-3 mb-20">
          <p className="text-sm">Delivered: 219143</p>
          <p className="text-sm">01/04/26</p>

          <div className="my-6 flex gap-6">
            <p className="text-sm">£20.33</p>
            <Link href={"/"} className="text-sm">
              View order
            </Link>
          </div>

          <div className="h-[600px] overflow-hidden rounded-2xl">
            <ImageTag src={image} />
          </div>
        </div>
      )
    })

  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Main withPadding>
        <Section>
          <Container>
            <Grid>
              <ul className="col-span-full mb-20 flex gap-4 ">
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

              {renderOrders()}
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}