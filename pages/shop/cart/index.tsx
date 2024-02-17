import React from "react"
import {
  Container,
  Grid,
  ImageTag,
  Main,
  QuantityControl,
  RemoveCartItem,
  Section,
} from "@/components"
import { useShoppingCart } from "@/context/Cart"

export default function Page() {
  const { cartItems } = useShoppingCart()

  const renderProduct = () =>
    cartItems.map((item: any) => {
      const { id, title, quantity, variant } = item
      const { image, priceV2 } = variant

      return (
        <div className="contents p-2" key={id}>
          <div className="cell">
            <RemoveCartItem lineItemId={id} isIcon={true} />
          </div>
          <div className="cell flex gap-4">
            <div className="h-24 w-24 flex-none">
              <ImageTag src={image?.originalSrc} />
            </div>
            <p>{title}</p>
          </div>
          <div className="cell flex	h-max items-center gap-3">
            <QuantityControl lineItemId={id} quantity={quantity} />
          </div>
          <div className="cell">£{priceV2.amount}</div>
        </div>
      )
    })

  return (
    <>
      <Main>
        <Section>
          <Container>
            <Grid>
              <div className="col-span-full flex items-center gap-4">
                <svg
                  className="h-14 w-14 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 12h14M5 12l4-4m-4 4 4 4"
                  />
                </svg>
                <h1 className="text-3xl md:text-5xl">Shopping Bag</h1>
              </div>

              <div className="col-span-full mt-14">
                <div className="grid grid-cols-4 gap-4 p-2">
                  {/* Header */}
                  <div className="contents p-2">
                    <div className="cell"></div>
                    <div className="cell">Product</div>
                    <div className="cell">Quantity</div>
                    <div className="cell">Price</div>
                  </div>
                  {/* Cotent */}
                  {renderProduct()}
                </div>
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
