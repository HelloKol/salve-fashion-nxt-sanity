import { useCookies } from "react-cookie";
import { REMOVE_FROM_CART } from "@/services/queries";
import { graphqlClient } from "@/utils";
import { useShoppingCart } from "@/context/Cart";

export default function RemoveCartItem({ lineItemId }: any) {
  const [cookies] = useCookies(["checkoutId"]);
  let checkoutId: string = cookies["checkoutId"];
  const { setCartItems, fetchCartItems } = useShoppingCart();

  const handleRemoveFromCart = async () => {
    const variables = {
      checkoutId,
      lineItemIds: [lineItemId],
    };
    try {
      const response: any = await graphqlClient.request(
        REMOVE_FROM_CART,
        variables
      );
      console.log(
        "Updated checkout IN HANDLE TO REMOVE:",
        response?.checkoutLineItemsRemove
      );
      const items =
        response?.checkoutLineItemsRemove?.checkout?.lineItems?.edges.map(
          ({ node }: any) => ({
            id: node.id,
            title: node.title,
            quantity: node.quantity,
            variant: node.variant,
            imageUrl: node.variant.image?.originalSrc,
          })
        );
      setCartItems(items);
      fetchCartItems();
      return response?.checkoutLineItemsRemove?.checkout;
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  return <button onClick={handleRemoveFromCart}>Remove</button>;
}
