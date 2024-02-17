import { useCookies } from "react-cookie"
import { REMOVE_FROM_CART } from "@/services/queries"
import { graphqlClient } from "@/utils"
import { useShoppingCart } from "@/context/Cart"

export default function RemoveCartItem({ lineItemId, isIcon }: any) {
  const [cookies] = useCookies(["checkoutId"])
  let checkoutId: string = cookies["checkoutId"]
  const { setCartItems, fetchCartItems } = useShoppingCart()

  const handleRemoveFromCart = async () => {
    const variables = {
      checkoutId,
      lineItemIds: [lineItemId],
    }
    try {
      const response: any = await graphqlClient.request(
        REMOVE_FROM_CART,
        variables
      )
      console.log(
        "Updated checkout IN HANDLE TO REMOVE:",
        response?.checkoutLineItemsRemove
      )
      const items =
        response?.checkoutLineItemsRemove?.checkout?.lineItems?.edges.map(
          ({ node }: any) => node
        )
      setCartItems(items)
      fetchCartItems()
      return response?.checkoutLineItemsRemove?.checkout
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  return (
    <button onClick={handleRemoveFromCart}>
      {isIcon ? (
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
      ) : (
        `Remove`
      )}
    </button>
  )
}
