import { useMutation } from "@apollo/client"
import { Button, TruncateString } from "@/components"
import { ADD_PRODUCT_TO_CART } from "@/services/queries"
import { cn } from "@/utils"
import { useShoppingCart } from "@/context/Cart"
import { ImageTag, RadixPopoverCart } from "@/components"
import { ProductVariantNode } from "@/types"
import { GET_CART } from "@/services/queries/cart"

export default function AddToCart({
  productTitle,
  selectedVariant,
  quantity,
  disabled,
  className,
}: {
  productTitle: string
  selectedVariant: ProductVariantNode
  quantity: number
  disabled?: boolean
  className?: string
}) {
  const { cartId } = useShoppingCart()

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

  if (!selectedVariant) return null
  const { id, image, selectedOptions } = selectedVariant

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
    selectedOptions.map((item, index) => {
      const { name, value } = item

      return (
        <div key={index}>
          {name}: {value}
        </div>
      )
    })

  return (
    <RadixPopoverCart
      trigger={
        <button
          onClick={handleAddToCart}
          disabled={disabled || loading}
          className={cn(
            "flex h-fit w-fit shrink-0 items-center justify-center rounded-full bg-[#171717] px-5 py-2 text-xs uppercase text-white duration-300 ease-in-out hover:border-[#474747] hover:bg-[#474747] sm:text-sm",
            disabled && "cursor-no-drop bg-[#474747]",
            className
          )}
        >
          {disabled
            ? `Sold out`
            : loading
              ? `Adding to cart...`
              : `Add to cart`}
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
          <h1 className="text-sm font-semibold uppercase">
            <TruncateString string={productTitle} truncateValue={40} />
          </h1>
          <div className="mt-2 text-sm">{renderVariantOptions()}</div>
        </div>
      </div>

      <Button href={"/cart"} className={`mt-2 w-full`} variant={"quaternary"}>
        Checkout
      </Button>
      <Button className={`mt-2 w-full`} variant={"primary"}>
        Continue shopping
      </Button>
    </RadixPopoverCart>
  )
}
