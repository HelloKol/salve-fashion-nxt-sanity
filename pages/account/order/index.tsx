import { useEffect, useState } from "react"
import Link from "next/link"
import { useCookies } from "react-cookie"
import {
  AccountNavigation,
  Button,
  Container,
  Grid,
  ImageTag,
  Main,
  RadixDialog,
  Section,
  Seo,
} from "@/components"

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const [cookies, setCookie, removeCookie] = useCookies(["exampleOrderPage"])
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const cookieValid: string = cookies["exampleOrderPage"]
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

  useEffect(() => {
    if (cookieValid) return setIsDialogOpen(false)
    return setIsDialogOpen(true)
  }, [])

  const handleCloseDialog = () => {
    setCookie("exampleOrderPage", true)
    setIsDialogOpen(false)
  }

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

          <div className="h-[600px] overflow-hidden rounded-md">
            <ImageTag src={image} />
          </div>
        </div>
      )
    })

  return (
    <>
      <Seo
        seo={{
          title: "Orders -",
        }}
      />
      <Main>
        <Section withPadding={false}>
          <Container>
            <Grid>
              <AccountNavigation />
              {renderOrders()}
            </Grid>
          </Container>
        </Section>
      </Main>

      <RadixDialog
        variant={"exampleOrder"}
        isOpen={isDialogOpen}
        setIsOpen={() => {}}
      >
        <div className="p-5">
          <p className="mb-4 text-xl md:text-2xl lg:text-3xl">
            This page is an example of product orders.
          </p>
          <Button variant="tertiary" onClick={handleCloseDialog}>
            Understood
          </Button>
        </div>
      </RadixDialog>
    </>
  )
}
