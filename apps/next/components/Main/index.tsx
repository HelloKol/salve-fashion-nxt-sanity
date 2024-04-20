import React from "react"
// Props
interface Props {
  children: any
  className?: string
  withPadding?: boolean
}

export default function index({
  children,
  className,
  withPadding = true,
}: Props) {
  return (
    <main
      className={`${withPadding ? `pt-24 md:pt-28 lg:pt-36` : ``} ${className || ""} min-h-screen`}
    >
      {children}
    </main>
  )
}
