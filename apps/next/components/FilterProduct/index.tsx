import React from "react"
import { RadixSelect } from "@/components"

export default function FilterProduct({
  isSearchPage,
}: {
  isSearchPage?: boolean
}) {
  return <RadixSelect isSearchPage={isSearchPage} />
}
