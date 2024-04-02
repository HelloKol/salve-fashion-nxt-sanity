import { AddToCart, Button, ImageTag, TruncateString } from "@/components"
import { ShopifyProduct, ProductVariantNode } from "@/types"

interface props {
  product: ProductVariantNode
  node: ShopifyProduct
}

const ProductItem = ({ product, node }: props) => {
  const { image, price } = product
  const { title, handle } = node

  return (
    <>
      <div
        className={`group relative h-80 w-full overflow-hidden rounded-md sm:h-80 md:h-[500px] lg:h-[600px] xl:h-[700px]`}
      >
        <ImageTag src={image.transformedSrc} />
        <div
          className={`duration-250 absolute bottom-0 left-0 right-0 top-0 z-0 bg-black bg-opacity-60 opacity-0 transition-opacity ease-in-out group-hover:opacity-100`}
        >
          <div
            className={`absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center`}
          >
            <div className={`flex flex-col gap-4`}>
              {/* @ts-ignore */}
              <AddToCart
                productTitle={title}
                selectedVariant={product}
                disabled={false}
              />
              <Button variant={"secondary"} href={`/shop/product/${handle}`}>
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <p className="text-sm uppercase">
          <TruncateString string={node.title} truncateValue={45} />
        </p>
        <p className="text-sm uppercase">£{price.amount}</p>
      </div>
    </>
  )
}

export default ProductItem
