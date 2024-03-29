import Link from "next/link"
import { useShoppingCart } from "@/context/Cart"
import { Button, ClickOut, ImageTag } from "@/components"
import Close from "@/components/svg/Close"
import Bag from "@/components/svg/Bag"
import styles from "./styles.module.scss"
import { useTruncateString } from "@/hooks"

export default function Cart() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    cart,
    checkoutUrl,
    lineItemRemove,
    lineItemUpdateQuantity,
  } = useShoppingCart()

  const renderVariantOptions = (options: any) =>
    options.map((item: any) => {
      const { name, value } = item
      return (
        <p className="text-sm">
          {name}: {value}
        </p>
      )
    })

  const renderCart = () =>
    cart?.cart?.lines?.nodes?.map((item: any) => {
      const { id, cost, quantity, merchandise } = item
      const { subtotalAmount } = cost
      const { product, selectedOptions, image } = merchandise
      const { handle } = product
      const title = useTruncateString(product.title, 30)

      return (
        <li key={id} className={styles.product}>
          <div className={styles.productContent}>
            <Link
              className={styles.featureImage}
              href={`/shop/product/${handle}`}
            >
              <ImageTag
                src={image?.transformedSrc}
                layout="fill"
                objectFit="cover"
              />
            </Link>
            <div className={`flex flex-col justify-between`}>
              <div>
                <Link
                  className="text-sm font-semibold uppercase"
                  href={`/shop/product/${handle}`}
                >
                  {title}
                </Link>
                <div className="mt-2">
                  {renderVariantOptions(selectedOptions)}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                Quantity:{" "}
                <div className="flex items-center gap-4">
                  <button
                    className="disabled:text-slate-400"
                    onClick={() => lineItemUpdateQuantity(id, quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>{" "}
                  <span>{quantity}</span>{" "}
                  <button
                    className="disabled:text-slate-400"
                    onClick={() => lineItemUpdateQuantity(id, quantity + 1)}
                    disabled={quantity >= 100}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.priceWrap}>
              <p className="text-sm font-semibold">£{subtotalAmount.amount}</p>
              <button onClick={() => lineItemRemove(id)}>Remove</button>
            </div>
          </div>
          <div className="border-b-[1px] border-black" />
        </li>
      )
    })

  return (
    <>
      {isCartOpen && <div className={styles.backdrop} />}
      <ClickOut handleClick={() => setIsCartOpen(false)}>
        <div
          className={`${styles.cart} ${
            isCartOpen ? styles.cartOpen : styles.cartClose
          }`}
        >
          <div className={styles.cartContent}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsCartOpen(false)}
            >
              <Close />
            </button>

            <h1 className="mb-8 border-b-[1px] border-black pb-4 text-3xl">
              Your Bag
            </h1>

            {cart?.cart?.totalQuantity ? (
              <>
                <ul className={styles.productList}>{renderCart()}</ul>
                <div className={styles.checkout}>
                  <p className={styles.subTotalPrice}>
                    Subtotal:{" "}
                    <span>£{cart?.cart?.cost?.subtotalAmount?.amount}</span>
                  </p>
                  <p className={styles.deliveryPrice}>
                    Delivery:{" "}
                    <span>
                      ${cart?.cart?.cost?.totalDutyAmount?.amount || `0.00`}{" "}
                    </span>
                  </p>
                  <Button
                    className={`w-full`}
                    variant={"tertiary"}
                    href={`/cart`}
                    onClick={() => setIsCartOpen(false)}
                  >
                    Go to bag
                  </Button>
                  <Button
                    className={`mt-2 w-full gap-2`}
                    variant={"quaternary"}
                    onClick={() => setIsCartOpen(false)}
                  >
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
              </>
            ) : (
              <div>
                <div className="flex h-10 w-full justify-center">
                  <Bag />
                </div>
                <p className="mt-4 text-center">No products in the cart.</p>
              </div>
            )}
          </div>
        </div>
      </ClickOut>
    </>
  )
}
