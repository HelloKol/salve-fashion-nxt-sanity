import { useCookies } from "react-cookie";
import { UPDATE_QUANTITY } from "@/services/queries";
import { graphqlClient } from "@/utils";
import { useShoppingCart } from "@/context/Cart";

type QuantityControlProps = {
  lineItemId: string;
  quantity: number;
};

export default function QuantityControl({
  lineItemId,
  quantity,
}: QuantityControlProps) {
  const { setCartItems, fetchCartItems } = useShoppingCart();
  const [cookies] = useCookies(["checkoutId"]);
  let checkoutId: string = cookies["checkoutId"];

  const handleUpdateQuantity = async (newQuantity: number) => {
    const variables = {
      checkoutId,
      lineItems: [{ id: lineItemId, quantity: newQuantity }],
    };
    try {
      const response: any = await graphqlClient.request(
        UPDATE_QUANTITY,
        variables
      );
      console.log(
        "Updated checkout IN HANDLE:",
        response?.checkoutLineItemsUpdate
      );
      const items =
        response?.checkoutLineItemsUpdate?.checkout?.lineItems?.edges.map(
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
      return response?.checkoutLineItemsUpdate?.checkout;
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div>
      Quantity:{" "}
      <button
        onClick={() => handleUpdateQuantity(quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>{" "}
      <span>{quantity}</span>{" "}
      <button onClick={() => handleUpdateQuantity(quantity + 1)}>+</button>
    </div>
  );
}
