import React from "react"
import Image from "next/image"

export default function ImageTag({
  src,
  alt = "",
  layout = "",
  objectFit = "cover",
  quality,
  priority,
  blurDataURL,
  placeholder,
}: {
  src: string
  alt?: string
  layout?: string
  objectFit?: string
  quality?: number
  priority?: boolean
  blurDataURL?: string
  placeholder?: "blur" | "empty" | undefined
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        layout={layout}
        objectFit={objectFit}
        fill={true}
        quality={quality}
        priority={priority}
        placeholder={placeholder || "empty"}
        blurDataURL={blurDataURL}
      />
    </div>
  )
}
