import React from "react"
import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { gql } from "@apollo/client"
// @ts-ignore
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {
  Button,
  Container,
  FormInputText,
  Grid,
  ImageTag,
  Main,
  Section,
} from "@/components"
import { useShoppingCart } from "@/context/Cart"
import { graphqlClient } from "@/utils"
import { ADD_CHECKOUT_DISCOUNT } from "@/services/queries/cart"

const schema = yup.object().shape({
  discountCode: yup.string().required("Enter a discount code"),
})

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const { checkoutId, cartItems, lineItemRemove, lineItemUpdateQuantity } =
    useShoppingCart()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async ({ discountCode }: any) => {
    try {
      const response = graphqlClient.request(ADD_CHECKOUT_DISCOUNT, {
        checkoutId: checkoutId,
        discountCode: discountCode,
      })

      console.log(response)
    } catch (err: any) {
      setGlobalError("An error occurred while changing password")
      setIsLoading(false)
      return setIsSuccess(false)
    }
  }

  const renderVariantOptions = (options: any) =>
    options.map((item: any) => {
      const { name, value } = item
      return (
        <div>
          {name}: {value}
        </div>
      )
    })

  console.log(cartItems)

  const renderProduct = () =>
    cartItems?.lineItems?.edges.map((item: any) => {
      const { node } = item
      const { id, title, quantity, variant } = node
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

              <div className="col-start-1 col-end-10 mt-14">
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

              <div className="col-start-10 col-end-13 mt-14">
                <div className="bg-red-200">
                  <h2 className="text-2xl">Order Summary</h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInputText
                      type="text"
                      placeholder="Enter a code"
                      label="Add a discount code"
                      {...register("discountCode")}
                      error={errors.discountCode}
                    />

                    <button
                      className="mt-2 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                      type="submit"
                    >
                      {isLoading ? "Loading...." : "Apply"}
                    </button>
                  </form>

                  <p className="mt-6 flex justify-between uppercase">
                    <span>bag total</span> ${cartItems?.totalPrice?.amount}{" "}
                  </p>
                  <p className="flex justify-between uppercase">
                    <span>Shipping</span> $0.00
                  </p>
                  <p className="flex justify-between uppercase">
                    <span>Delivery</span> $0.00
                  </p>
                  <p className="mt-4 flex justify-between border-t-[1px] border-black pt-4 text-lg uppercase">
                    <span>total</span> ${cartItems?.totalPrice?.amount}{" "}
                  </p>

                  <Button className={`mt-2 w-full`} variant={"quaternary"}>
                    <svg
                      className="h-6 w-6 text-white"
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
                        d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H7a1 1 0 0 1-1-1v-7c0-.6.4-1 1-1Z"
                      />
                    </svg>
                    Checkout
                  </Button>
                </div>
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
