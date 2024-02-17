import React from "react"
import { Container, Grid, ImageTag, Main, Section } from "@/components"
import { useShoppingCart } from "@/context/Cart"
import Link from "next/link"

export default function Page() {
  const { cartItems, lineItemRemove, lineItemUpdateQuantity } =
    useShoppingCart()

  console.log(cartItems)

  const renderVariantOptions = (options: any) =>
    options.map((item: any) => {
      const { name, value } = item
      return (
        <div>
          {name}: {value}
        </div>
      )
    })

  const renderProduct = () =>
    cartItems.map((item: any) => {
      const { id, title, quantity, variant } = item
      const { image, price, selectedOptions } = variant

      return (
        <div className="contents p-2" key={id}>
          <div className="cell">
            <button onClick={() => lineItemRemove(id)}>
              <svg
                className="h-6 w-6 text-gray-800 "
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
                  d="M6 18 18 6m0 12L6 6"
                />
              </svg>
            </button>
          </div>
          <div className="cell flex gap-4">
            <div className="h-24 w-24 flex-none">
              <ImageTag src={image?.originalSrc} />
            </div>
            <div>
              <p className="mb-6">{title}</p>
              {renderVariantOptions(selectedOptions)}
            </div>
          </div>
          <div className="cell flex	h-max items-center gap-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => lineItemUpdateQuantity(id, quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => lineItemUpdateQuantity(id, quantity + 1)}>
                +
              </button>
            </div>
          </div>
          <div className="cell">£{(quantity * price.amount).toFixed(2)}</div>
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
                <Link href={"/shop/search"}>
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
                </Link>
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
                  {/* Content */}
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
