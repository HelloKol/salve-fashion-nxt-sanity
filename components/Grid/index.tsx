import React from "react"

interface Props {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  as?: keyof JSX.IntrinsicElements
  withRowGap?: boolean
  withColumnGap?: boolean
}

export default function index({
  children,
  className,
  as = "div",
  withRowGap = true,
  withColumnGap = true,
}: Props) {
  const Element = as

  return (
    <Element
      className={`grid grid-cols-12 ${withRowGap ? `gap-y-4` : ``} ${
        withColumnGap ? `gap-x-4` : ``
      } ${className || ""}`}
    >
      {children}
    </Element>
  )
}
