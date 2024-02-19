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
    cart,
    // totalCheckoutPrice,
    checkoutUrl,
    lineItemRemove,
    lineItemUpdateQuantity,
  } = useShoppingCart()

  const renderVariantOptions = (options: any) =>
    options.map((item: any) => {
      const { name, value } = item
      return (
        <p className="text-sm">
          <strong>{name}</strong>: {value}
        </p>
      )
    })

  const renderCart = () =>
    cart?.cart?.lines?.nodes?.map((item: any) => {
      const { id, cost, quantity, merchandise } = item
      const { subtotalAmount } = cost
      const { product, selectedOptions, image } = merchandise
      const { title } = product

      return (
        <li key={id} className={styles.product}>
          <div className={styles.productContent}>
            <div className={styles.featureImage}>
              <ImageTag
                src={image?.transformedSrc}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.titleWrap}>
              <p className="text-lg">{title.slice(0, 25)}...</p>
              {renderVariantOptions(selectedOptions)}
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
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.priceWrap}>
              <strong>£{subtotalAmount.amount}</strong>
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
                    Delivery: <span>Free</span>
                  </p>
                  <Button
                    className={`w-full`}
                    variant={"tertiary"}
                    href={`/shop/cart`}
                    onClick={() => setIsCartOpen(false)}
                  >
                    Go to bag
                  </Button>
                  <Button
                    className={`mt-2 w-full`}
                    variant={"quaternary"}
                    // href={checkoutUrl}
                    onClick={() => setIsCartOpen(false)}
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
