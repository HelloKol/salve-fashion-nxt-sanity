import React from "react"
// Props
interface Props {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  withPadding?: boolean
}

export default function index({
  children,
  className,
  withPadding = true,
}: Props) {
  return (
    <section
      className={`${withPadding ? `py-[120px]` : ``} ${className || ""}`}
    >
      {children}
    </section>
  )
}
