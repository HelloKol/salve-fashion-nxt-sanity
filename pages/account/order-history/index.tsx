import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "react-cookie"
import { Main, Section, Container, Grid, Button, ImageTag } from "@/components"
import styles from "./styles.module.scss"

const navigationLinks = [
  { href: "/account/profile", text: "Account" },
  { href: "/account/order-history", text: "Order history" },
]

function formatDate(dateString: string): string {
  if (!dateString?.includes(".")) dateString = dateString?.replace("Z", ".000Z")
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }
  return new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace(/,/g, "")
}

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const router = useRouter()
  const ORDERS = [1, 1, 1, 1, 1, 1]
  const [cookies] = useCookies(["accessToken"])
  const token: string = cookies["accessToken"]

  const { data, isLoading } = useQuery({
    queryKey: ["getOrderHistory"],
    queryFn: async () => {
      const response = await fetch(
        `/api/orderHistory?customerAccessToken=${token}`
      )
      const test = await response.json()
      console.log(test, token)
      return await response.json()
    },
  })

  console.log(isLoading, data, token)


  const renderOrders = () =>
    data &&
    data.map((item: any, index: any) => {
      const { node } = item
      const orderNo = node?.orderNumber
      const formattedDate = formatDate(node?.processedAt)
      return node?.lineItems?.edges.map((item: any) => {
        const { node } = item
        const { variant } = node

        return (
          <div key={index} className="col-span-3 mb-20">
            <p className="text-sm">Delivered: {orderNo}</p>
            <p className="text-sm">{formattedDate}</p>

            <div className="my-6 flex gap-6">
              <p className="text-sm">
                {variant?.priceV2?.amount} {variant?.priceV2?.currencyCode}
              </p>
              <Link href={"/"} className="text-sm">
                View order
              </Link>
            </div>

            <div className="h-[600px] overflow-hidden rounded-2xl">
              <ImageTag src={variant?.image.src} />
            </div>
          </div>
        )
      })
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
             {
              isLoading ? <p>Loading...</p>:
              <>
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
              </>
             }
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
