import { useCookies } from "react-cookie"
import Button from "../Button"
import { ADD_TO_CART } from "@/services/queries"
import { graphqlClient } from "@/utils"
import { useShoppingCart } from "@/context/Cart"

export default function AddToCart({
  variantId,
  disabled,
}: {
  variantId: string
  disabled?: boolean
}) {
  const { setCartItems, fetchCartItems } = useShoppingCart()
  const [cookies] = useCookies(["checkoutId"])
  let checkoutId: string = cookies["checkoutId"]

  const handleAddToCart = async () => {
    const quantity = 1
    const variables = {
      checkoutId,
      lineItems: [{ variantId, quantity }],
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
    <Button
      variant={"quaternary"}
      onClick={handleAddToCart}
      disabled={disabled}
    >
      Add to cart
    </Button>
  )
}
