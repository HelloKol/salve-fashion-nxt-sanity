import React from "react"
// Props
interface Props {
  children: React.ReactNode | React.ReactNode[]
  className?: string
  withPadding?: boolean
}

export default function Section({
  children,
  className,
  withPadding = true,
}: Props) {
  return (
    <section
      className={`${withPadding ? `md:py-34 py-24` : ``} ${className || ""}`}
    >
      {children}
    </section>
  )
}
