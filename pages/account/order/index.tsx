import { useEffect, useState } from "react"
import Link from "next/link"
import { useCookies } from "react-cookie"
import { useQuery } from "@tanstack/react-query"
import {
  AccountNavigation,
  Button,
  Container,
  Grid,
  ImageTag,
  Main,
  ProductSkeleton,
  RadixDialog,
  Section,
  Seo,
  TruncateString,
} from "@/components"
import { graphqlClient } from "@/utils"
import { EXAMPLE_PRODUCTS } from "@/services/queries"

interface PageProps {}

export default function Page({}: PageProps): JSX.Element | null {
  const [cookies, setCookie, removeCookie] = useCookies(["exampleOrderPage"])
  const [isDialogOpen, setIsDialogOpen] = useState(true)
  const cookieValid: string = cookies["exampleOrderPage"]

  const {
    data,
    isLoading,
  }: {
    data?: {
      products: {
        edges: {
          node: {
            title: string
            featuredImage: {
              transformedSrc: string
            }
            variants: {
              edges: {
                node: {
                  price: {
                    amount: number
                  }
                }
              }[]
            }
          }
        }[]
      }
    }
    isLoading: boolean
  } = useQuery({
    queryKey: ["getPredictive"],
    queryFn: async () => {
      return await graphqlClient.request(EXAMPLE_PRODUCTS)
    },
  })

  useEffect(() => {
    if (cookieValid) return setIsDialogOpen(false)
    return setIsDialogOpen(true)
  }, [cookieValid])

  const handleCloseDialog = () => {
    setCookie("exampleOrderPage", true)
    setIsDialogOpen(false)
  }

  const renderProducts = () =>
    data?.products?.edges &&
    data.products.edges.map((item, index) => {
      const { node } = item
      const { featuredImage } = node
      const firstVariant = node.variants.edges[0].node

      return (
        <div
          key={index}
          className="col-span-full mb-8 md:col-span-6 lg:mb-12 xl:col-span-4 xl:mb-14"
        >
          <p className="text-sm">
            <TruncateString string={node.title} truncateValue={50} />
          </p>
          <p className="text-sm">Delivered: 219143</p>
          <p className="text-sm">01/04/26</p>

          <div className="my-6 flex gap-6">
            <p className="text-sm">£{firstVariant.price.amount}</p>
            <Link href={"/"} className="text-sm">
              View order
            </Link>
          </div>

          <div className="relative h-[500px] w-full overflow-hidden rounded-md lg:h-[600px] xl:h-[700px]">
            <ImageTag src={featuredImage?.transformedSrc} />
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
              {isLoading ? (
                <ProductSkeleton />
              ) : !data?.products?.edges?.length ? (
                <h3 className="col-span-full text-center text-xl">
                  <b className="mb-2 block">We&apos;re sorry,</b>
                  We can&apos;t seem to find any results for
                </h3>
              ) : (
                renderProducts()
              )}
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
