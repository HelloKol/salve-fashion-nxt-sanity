import { useShoppingCart } from "@/context/Cart"
import { Button, ClickOut, ImageTag } from "@/components"
import Close from "@/components/svg/Close"
import Bag from "@/components/svg/Bag"
import styles from "./styles.module.scss"

export default function Cart() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalCheckoutPrice,
    checkoutUrl,
    lineItemRemove,
    lineItemUpdateQuantity,
  } = useShoppingCart()

  const renderCartItems = () =>
    cartItems &&
    cartItems.map((item: any, index: number) => {
      const { id, title, quantity, variant } = item
      return (
        <li key={index} className={styles.product}>
          <div className={styles.productContent}>
            <div className={styles.featureImage}>
              <ImageTag
                src={variant?.image?.originalSrc}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.titleWrap}>
              <p>{title.slice(0, 25)}...</p>
              <div className="flex items-center gap-2">
                Quantity:{" "}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => lineItemUpdateQuantity(id, quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>{" "}
                  <span>{quantity}</span>{" "}
                  <button
                    onClick={() => lineItemUpdateQuantity(id, quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.priceWrap}>
              <strong>£{variant?.priceV2?.amount}</strong>
              <button onClick={() => lineItemRemove(id)}>Remove</button>
            </div>
          </div>
          <div className={styles.divider} />
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

            <h1 className="mb-16 text-center text-3xl">Your bag</h1>

            {cartItems?.length ? (
              <>
                <ul className={styles.productList}>{renderCartItems()}</ul>
                <div className={styles.checkout}>
                  <p className={styles.subTotalPrice}>
                    Subtotal: <span>£{totalCheckoutPrice.toFixed(2)}</span>
                  </p>
                  <p className={styles.deliveryPrice}>
                    Delivery: <span>Free</span>
                  </p>
                  <Button
                    className={`w-full`}
                    variant={"tertiary"}
                    href={`/shop/cart`}
                  >
                    Go to bag
                  </Button>
                  <Button
                    className={`mt-2 w-full`}
                    variant={"quaternary"}
                    href={checkoutUrl}
                  >
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
