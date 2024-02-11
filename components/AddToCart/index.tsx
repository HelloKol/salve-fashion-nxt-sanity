import { useCookies } from "react-cookie"
import Button from "../Button"
import {
  ADD_TO_CART,
  SINGLE_PRODUCT_BY_HANDLE,
  SINGLE_PRODUCT_BY_ID,
} from "@/services/queries"
import { graphqlClient } from "@/utils"
import { useShoppingCart } from "@/context/Cart"
import { RadixPopover } from ".."
import { ShopifySingleProduct } from "@/types"
import { useState } from "react"

export default function AddToCart({
  productId,
  variantId,
  disabled,
}: {
  productId: string
  variantId: string
  disabled?: boolean
}) {
  const { setCartItems, fetchCartItems } = useShoppingCart()
  const [cookies] = useCookies(["checkoutId"])
  let checkoutId: string = cookies["checkoutId"]
  const [product, setProduct] = useState(null)

  const handleAddToCart = async () => {
    const quantity = 1
    const variables = {
      checkoutId,
      lineItems: [{ variantId, quantity }],
    }

    try {
      const product: any = await graphqlClient.request(SINGLE_PRODUCT_BY_ID, {
        id: productId,
      })
      setProduct(product?.product)
    } catch (error) {
      console.error("Error fetch new cart item: ", error)
    }

    try {
      const response: any = await graphqlClient.request(ADD_TO_CART, variables)
      console.log("Updated checkout IN HANDLE:", response?.checkoutLineItemsAdd)
      const items =
        response?.checkoutLineItemsAdd?.checkout?.lineItems?.edges.map(
          ({ node }: any) => ({
            id: node.id,
            title: node.title,
            quantity: node.quantity,
            variant: node.variant,
            imageUrl: node.variant.image?.originalSrc,
          })
        )
      setCartItems(items)
      fetchCartItems()
      return response?.checkoutLineItemsAdd?.checkout
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  return (
    <RadixPopover
      trigger={
        <button onClick={handleAddToCart} disabled={disabled}>
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

      {product && (
        <>
          <h1>{product.title}</h1>
        </>
      )}
    </RadixPopover>
  )
}
