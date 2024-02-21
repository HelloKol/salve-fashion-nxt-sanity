import { useState } from "react"
import { useCookies } from "react-cookie"
import { useMutation } from "@apollo/client"
import { Button } from "@/components"
import {
  ADD_PRODUCT_TO_CART,
  SINGLE_PRODUCT_BY_HANDLE,
  SINGLE_PRODUCT_BY_ID,
} from "@/services/queries"
import { graphqlClient } from "@/utils"
import { useShoppingCart } from "@/context/Cart"
import { ImageTag, RadixPopoverCart } from "@/components"
import { ShopifySingleProduct } from "@/types"
import { GET_CART } from "@/services/queries/cart"

export default function AddToCart({
  productTitle,
  selectedVariant,
  quantity,
  disabled,
  className,
}: {
  productTitle: string
  selectedVariant: any
  quantity: number
  disabled?: boolean
  className?: string
}) {
  if (!selectedVariant) return null
  const { cartId } = useShoppingCart()
  const { id, image, selectedOptions } = selectedVariant

  const [addProductToCart, { data, loading, error, reset }] = useMutation(
    ADD_PRODUCT_TO_CART,
    {
      refetchQueries: [
        {
          query: GET_CART,
          variables: {
            cartId,
          },
        },
      ],
    }
  )

  const handleAddToCart = async () => {
    if (!cartId) return
    const variables = {
      cartId,
      lines: [{ merchandiseId: id, quantity }],
    }

    return addProductToCart({ variables })
  }

  const renderVariantOptions = () =>
    selectedOptions &&
    selectedOptions.map((item: any) => {
      const { name, value } = item

      return (
        <div>
          {name}: {value}
        </div>
      )
    })

  return (
    <RadixPopoverCart
      trigger={
        <button
          onClick={handleAddToCart}
          disabled={disabled}
          className={
            "flex h-fit w-fit shrink-0 items-center justify-center rounded-full bg-[#171717] px-5 py-2 text-sm uppercase text-white duration-300 ease-in-out hover:border-[#474747] hover:bg-[#474747] " +
              className || ""
          }
        >
          {disabled ? `Sold out` : `Add to cart`}
        </button>
      }
    >
      <div className="flex items-center gap-2">
        <svg
          className="h-4 w-4 text-gray-800 "
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
            d="m5 12 4.7 4.5 9.3-9"
          />
        </svg>
        <p>Item added to your cart</p>
      </div>

      <div className="mt-8 flex gap-4">
        <div className="h-28 w-24 flex-none">
          <ImageTag src={image?.transformedSrc} />
        </div>

        <div>
          <h1>{productTitle}</h1>
          <div className="mt-2">{renderVariantOptions()}</div>
        </div>
      </div>

      {/* <Button className={`mt-8 w-full`} variant={"quaternary"}>
        View cart ({cartItems?.lineItems?.edges?.length})
      </Button> */}
      <Button className={`mt-2 w-full`} variant={"primary"}>
        Checkout
      </Button>
      <Button className={`mt-2 w-full`} variant={"primary"}>
        Continue shopping
      </Button>
    </RadixPopoverCart>
  )
}
