import React, { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "@apollo/client"
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
import {
  ADD_DISCOUNT_TO_CART,
  GET_CART,
  REMOVE_FROM_CART,
} from "@/services/queries/cart"
import { useRouter } from "next/router"
import { useCopyToClipboard } from "@/hooks"
import { useToastOpen } from "@/context/Toast"

const schema = yup.object().shape({
  discountCode: yup.string().required("Enter a discount code"),
})

export default function Page() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const { cart, cartId, lineItemRemove, lineItemUpdateQuantity } =
    useShoppingCart()
  const {
    isFetching: isCopyFetching,
    isError: isCopyError,
    isSuccess: isCopySuccess,
    copyToClipboard,
  } = useCopyToClipboard()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  })

  const [addDiscount, {}] = useMutation(ADD_DISCOUNT_TO_CART, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: {
          cartId,
        },
      },
    ],
  })

  const [removeDiscount, {}] = useMutation(ADD_DISCOUNT_TO_CART, {
    refetchQueries: [
      {
        query: GET_CART,
        variables: {
          cartId,
        },
      },
    ],
  })

  const handleClipboard = async (handle: string) => {
    await copyToClipboard(
      process.env.NEXT_PUBLIC_SITE_URL + `/shop/product/${handle}`
    )
  }

  const goBack = () => router.back()

  const handleRemoveDiscount = () => {
    try {
      const variables = {
        cartId,
        discountCodes: [``],
      }

      removeDiscount({ variables })
    } catch (err: any) {}
  }

  const onSubmit = async ({ discountCode }: any) => {
    try {
      const variables = {
        cartId,
        discountCodes: [`${discountCode}`],
      }

      addDiscount({ variables })
      setValue("discountCode", ``)
    } catch (err: any) {
      setGlobalError("An error occurred while changing password")
      setIsLoading(false)
      return setIsSuccess(false)
    }
  }

  const message = isCopyFetching ? (
    <>
      <h4>Loading</h4>
      <p>Link is being copied...</p>
    </>
  ) : isCopyError ? (
    <>
      <h4>Error</h4>
      <p>Could not copy link</p>
    </>
  ) : (
    isCopySuccess && (
      <>
        <h4>Success</h4>
        <p>Link is copied</p>
      </>
    )
  )

  useToastOpen(isCopyFetching, isCopyError, isCopySuccess, () => null, {
    description: message,
    duration: 5000,
    type: "foreground",
    onClose: () => null,
  })

  const renderVariantOptions = (options: any) =>
    options.map((item: any) => {
      const { name, value } = item
      return (
        <p className="lg:text-md text-sm">
          {name}: {value}
        </p>
      )
    })

  const renderDiscountCode = () =>
    cart?.cart?.discountCodes.map((discount: any) => {
      const { applicable, code } = discount
      if (!applicable) return null
      return (
        <div className="flex items-center rounded-full border-[1px] border-black p-1">
          {code}
          <button type="button" onClick={handleRemoveDiscount}>
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
                stroke-width="1"
                d="M6 18 18 6m0 12L6 6"
              />
            </svg>
          </button>
        </div>
      )
    })

  const renderCart = () =>
    cart?.cart?.lines?.nodes?.map((item: any) => {
      const { id, cost, quantity, merchandise } = item
      const { subtotalAmount } = cost
      const { product, selectedOptions, image } = merchandise
      const { title, handle } = product

      return (
        <div key={id} className="mb-8 flex gap-6 lg:mb-10">
          <div className="mb-0 h-44 w-36 flex-none lg:h-56 lg:w-44">
            <ImageTag src={image?.originalSrc} />
          </div>

          <div>
            <p className="lg:text-md mb-2 max-w-[700px] text-sm font-semibold uppercase">
              {title}
            </p>

            {renderVariantOptions(selectedOptions)}

            <div className="flex items-center justify-between">
              <div className="lg:text-md mb-2 flex items-center gap-4 text-sm">
                <button
                  className="disabled:text-slate-400"
                  onClick={() => lineItemUpdateQuantity(id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="disabled:text-slate-400"
                  onClick={() => lineItemUpdateQuantity(id, quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="ml-auto">
            <p className="lg:text-md text-sm font-semibold">
              £{subtotalAmount.amount}
            </p>

            <div className="">
              <button onClick={() => handleClipboard(handle)}>
                <svg
                  className="h-6 w-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2"
                    d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                  />
                </svg>
              </button>

              <button onClick={() => lineItemRemove(id)}>
                <svg
                  className="h-6 w-6 text-gray-800"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )
    })

  return (
    <>
      <Main>
        <Section>
          <Container>
            <Grid>
              <button
                className="col-span-full flex w-fit items-center gap-4"
                onClick={goBack}
              >
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
                <h1 className="text-3xl md:text-4xl xl:text-5xl">
                  Shopping Bag
                </h1>
              </button>

              <div className="col-span-full mt-14 lg:col-start-1 lg:col-end-10 xl:col-end-9">
                {renderCart()}
              </div>

              <div className="col-span-full mt-14 md:col-start-3 md:col-end-11 lg:col-start-10 lg:col-end-13">
                <h2 className="text-2xl">Order Summary</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormInputText
                    type="text"
                    placeholder="Enter a code"
                    label="Add a discount code"
                    {...register("discountCode")}
                    error={errors.discountCode}
                  />

                  <div className="flex items-center">
                    {renderDiscountCode()}
                  </div>

                  <button
                    className="lg:text-md mt-2 flex h-fit w-full shrink-0 items-center justify-center rounded-xl bg-[#171717] py-4 text-sm uppercase text-white"
                    type="submit"
                  >
                    {isLoading ? "Loading...." : "Apply"}
                  </button>
                </form>

                <p className="mt-6 flex justify-between uppercase">
                  <span>bag total</span> $
                  {cart?.cart?.cost?.subtotalAmount?.amount}{" "}
                </p>
                <p className="flex justify-between uppercase">
                  <span>Tax</span> $
                  {cart?.cart?.cost?.totalTaxAmount?.amount || `0.00`}{" "}
                </p>
                <p className="flex justify-between uppercase">
                  <span>Shipping</span>$
                  {cart?.cart?.cost?.totalDutyAmount?.amount || `0.00`}{" "}
                </p>
                <p className="flex justify-between uppercase">
                  <span>Delivery</span> $
                  {cart?.cart?.cost?.totalDutyAmount?.amount || `0.00`}{" "}
                </p>
                <p className="mt-4 flex justify-between border-t-[1px] border-black pt-4 text-lg uppercase">
                  <span>total</span> $
                  {cart?.cart?.cost?.checkoutChargeAmount?.amount}{" "}
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
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}
