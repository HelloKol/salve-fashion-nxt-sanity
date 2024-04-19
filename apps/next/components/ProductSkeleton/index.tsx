const ProductSkeleton = (): JSX.Element | null => {
  return (
    <>
      {new Array(15).fill(0).map((_, index) => (
        <div
          role="status"
          className="col-span-6 mb-10 h-80 w-full animate-pulse sm:h-80 md:h-[500px] lg:mb-12 lg:h-[600px] xl:col-span-4 xl:mb-14 xl:h-[700px]"
          key={index}
        >
          <div className="mb-2 flex h-full items-center justify-center rounded-2xl bg-gray-300"></div>
          <div className="mb-4 h-2.5 w-9/12 rounded-full bg-gray-200"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  )
}

export default ProductSkeleton
