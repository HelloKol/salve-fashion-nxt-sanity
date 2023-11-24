import React, { useState } from "react"

const ProductVariants = ({ variants }) => {
  // Extract unique sizes
  const sizes = [
    ...new Set(
      variants.map(
        (variant) =>
          variant.node.selectedOptions.find((opt) => opt.name === "Size").value
      )
    ),
  ]

  // State to track selected size and clicked variant id
  const [selectedSize, setSelectedSize] = useState(null)
  const [clickedVariantId, setClickedVariantId] = useState(null)

  return (
    <div>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              backgroundColor: selectedSize === size ? "blue" : "transparent",
              color: selectedSize === size ? "white" : "black",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            {size}
          </button>
        ))}
      </div>

      <div>
        <h2>Selected Variant ID:</h2>
        {clickedVariantId ? (
          <p>{clickedVariantId}</p>
        ) : (
          <p>No variant clicked.</p>
        )}
      </div>

      <div className="flex gap-4">
        {variants.map((variant) => {
          const sizeValue = variant.node.selectedOptions.find(
            (opt) => opt.name === "Size"
          ).value
          const isClickable = selectedSize ? sizeValue === selectedSize : true

          return (
            <div
              key={variant.node.id}
              onClick={() =>
                isClickable && setClickedVariantId(variant.node.id)
              }
              style={{
                cursor: isClickable ? "pointer" : "not-allowed",
                opacity: isClickable ? 1 : 0.5,
              }}
            >
              <img
                src={variant.node.image.transformedSrc}
                alt={variant.node.title}
                style={{ width: "100px", height: "auto" }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductVariants
