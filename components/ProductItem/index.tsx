import Link from "next/link"

const ProductItemWrapper = ({ product, isLink }: any) => {
  if (isLink)
    return (
      <Link href={`/shop/product/${handle}`} className="block">
        <ProductItem product={product} />
      </Link>
    )

  return <ProductItem product={product} />
}

const ProductItem = ({ product }: any) => {
  const { title, variants } = product
  const { nodes } = variants

  return (
    <>
      <div
        className={`group relative h-60 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[500px] lg:h-[600px] xl:h-[700px]`}
      >
        {renderImage(variants?.nodes)}
        <div
          className={`duration-250 absolute bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60 opacity-0 transition-opacity ease-in-out group-hover:opacity-100`}
        >
          <div
            className={`absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center`}
          >
            <div className={`flex flex-col gap-4`}>
              <Button variant={"quaternary"}>Add to cart</Button>
              <Button variant={"secondary"}>Learn more</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <p className="text-sm uppercase">{title}</p>
        <p className="text-sm uppercase">£{renderPrice(variants?.nodes)}</p>
      </div>
    </>
  )
}

export default ProductItemWrapper
