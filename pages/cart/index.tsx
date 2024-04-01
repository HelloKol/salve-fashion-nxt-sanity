import { GetStaticPropsResult } from "next"
import { useRouter } from "next/router"
import Link from "next/link"
import React, { useState } from "react"
import groq from "groq"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
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
  Seo,
} from "@/components"
import Bag from "@/components/svg/Bag"
import { useShoppingCart } from "@/context/Cart"
import { ADD_DISCOUNT_TO_CART, GET_CART } from "@/services/queries/cart"
import { useCopyToClipboard } from "@/hooks"
import { useToastOpen } from "@/context/Toast"
import { sanityClient } from "@/utils"
import { SeoType } from "@/types"

const schema = yup.object().shape({
  discountCode: yup.string().required("Enter a discount code"),
})

interface props {
  page: {
    seo: SeoType
  }
}

export default function Page({ page }: props): JSX.Element | null {
  if (!page) return null
  const { seo } = page
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSucess, setIsSuccess] = useState(false)
  const [globalError, setGlobalError] = useState("")
  const { cartLoading, cart, cartId, lineItemRemove, lineItemUpdateQuantity } =
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
    } catch (err) {}
  }

  const onSubmit = async ({ discountCode }: { discountCode: string }) => {
    try {
      const variables = {
        cartId,
        discountCodes: [`${discountCode}`],
      }

      addDiscount({ variables })
      setValue("discountCode", ``)
    } catch (err) {
      setGlobalError("An error occurred while changing password")
      setIsLoading(false)
      return setIsSuccess(false)
    }
  }

  const message = isCopyFetching ? (
    <>
      <h6 className={"text-deepPurple"}>Loading</h6>
      <p>Link is being copied...</p>
    </>
  ) : isCopyError ? (
    <>
      <h6 className={"text-deepOrange"}>Error</h6>
      <p>Could not copy link</p>
    </>
  ) : (
    isCopySuccess && (
      <>
        <h6 className={"text-deepGreen"}>Success</h6>
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

  const renderVariantOptions = (
    options: {
      name: string
      value: string
    }[]
  ) =>
    options.map((item) => {
      const { name, value } = item
      return (
        <p className="lg:text-md text-sm">
          {name}: {value}
        </p>
      )
    })

  const renderDiscountCode = () =>
    cart?.cart?.discountCodes.map(
      (discount: { applicable: boolean; code: string }) => {
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
      }
    )

  const renderCart = () =>
    cart?.cart?.lines?.nodes?.map((item: any) => {
      const { id, cost, quantity, merchandise } = item
      const { subtotalAmount } = cost
      const { product, selectedOptions, image } = merchandise
      const { title, handle } = product

      return (
        <div key={id} className="mt-8 flex gap-6 lg:mb-10 lg:mt-0">
          <Link
            className="h-44 w-36 flex-none overflow-hidden rounded-md lg:h-56 lg:w-44"
            href={`/shop/product/${handle}`}
          >
            <ImageTag src={image?.originalSrc} />
          </Link>

          <div className={`flex flex-col justify-between`}>
            <div>
              <Link
                className="lg:text-md max-w-[700px] text-sm font-semibold uppercase"
                href={`/shop/product/${handle}`}
              >
                {title}
              </Link>
              <div className="mt-2">
                {renderVariantOptions(selectedOptions)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 rounded-full border-[1px] border-black px-3 py-1">
                <button
                  onClick={() => lineItemUpdateQuantity(id, quantity - 1)}
                  disabled={quantity <= 1}
                >
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => lineItemUpdateQuantity(id, quantity + 1)}
                  disabled={quantity >= 100}
                >
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
                      d="M5 12h14m-7 7V5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={`ml-auto flex flex-col justify-between`}>
            <p className="lg:text-md text-sm font-semibold">
              £{subtotalAmount.amount}
            </p>

            <div>
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
                    strokeWidth="1.5"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
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
      <Seo seo={seo} />
      <Main>
        <Section withPadding={false}>
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

              <div className="col-span-full lg:col-start-1 lg:col-end-10 lg:mt-14 xl:col-end-9">
                {cart?.cart?.lines?.nodes?.length ? (
                  renderCart()
                ) : (
                  <div>
                    <div className="flex h-10 w-full justify-center">
                      <Bag />
                    </div>
                    <p className="mt-4 text-center">No products in the cart.</p>
                  </div>
                )}
              </div>

              <div className="col-span-full my-14 md:col-start-3 md:col-end-11 lg:col-start-10 lg:col-end-13 lg:my-0 lg:mt-14">
                <h2 className="mb-4 text-2xl lg:mb-6 xl:mb-8">Order Summary</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormInputText
                    type="text"
                    placeholder="Enter your discount code"
                    label="Add a discount code"
                    {...register("discountCode")}
                    error={errors.discountCode}
                  />

                  <div className="flex items-center">
                    {renderDiscountCode()}
                  </div>

                  <Button
                    className={`mb-4 mt-2 w-full`}
                    variant={"quaternary"}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading...." : "Apply"}
                  </Button>
                </form>

                <p className="mb-2 mt-6 flex justify-between uppercase">
                  <span>bag total</span> $
                  {cart?.cart?.cost?.subtotalAmount?.amount}{" "}
                </p>
                <p className="mb-2 flex justify-between uppercase">
                  <span>Tax</span> $
                  {cart?.cart?.cost?.totalTaxAmount?.amount || `0.00`}{" "}
                </p>
                <p className="mb-2 flex justify-between uppercase">
                  <span>Shipping</span>$
                  {cart?.cart?.cost?.totalDutyAmount?.amount || `0.00`}{" "}
                </p>
                <p className="mb-2 flex justify-between uppercase">
                  <span>Delivery</span> $
                  {cart?.cart?.cost?.totalDutyAmount?.amount || `0.00`}{" "}
                </p>
                <p className="mt-4 flex justify-between border-t-[1px] border-black pt-4 text-lg font-semibold uppercase">
                  <span>total</span> $
                  {cart?.cart?.cost?.checkoutChargeAmount?.amount}{" "}
                </p>

                <Button className={`my-2 w-full gap-2`} variant={"quaternary"}>
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

                <Button className={`w-full`} variant={"tertiary"} href={`/`}>
                  Continue Shopping
                </Button>
              </div>
            </Grid>
          </Container>
        </Section>
      </Main>
    </>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<props>> {
  try {
    const page = await sanityClient.fetch(
      groq`*[_type == "cart" && !(_id in path('drafts.**'))][0] {
        seo
      }
    `
    )

    if (!page)
      return {
        notFound: true,
      }

    return {
      props: {
        page,
      },
      revalidate: 30,
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}
