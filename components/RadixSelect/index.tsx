import React from "react"
import * as Select from "@radix-ui/react-select"
import classnames from "classnames"
import Plus from "@/components/svg/Plus"
import ChevronUp from "@/components/svg/ChevronUp"

type SelectItemProps = {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem flex items-center gap-2", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator className="SelectItemIndicator">
          <div className="h-1.5 w-1.5 rounded-full bg-black" />
        </Select.ItemIndicator>
        <Select.ItemText>{children}</Select.ItemText>{" "}
      </Select.Item>
    )
  }
)
SelectItem.displayName = "SelectItem"

const RadixSelect = () => (
  <Select.Root>
    <Select.Trigger
      className="SelectTrigger flex items-center gap-4 rounded-full border border-black px-5 py-2 text-xs uppercase sm:text-sm"
      aria-label="Food"
    >
      <Select.Value placeholder="Sort by" />
      <Select.Icon className="SelectIcon">
        <Plus className="h-4 w-4" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent rounded-2xl bg-[#d6d7cf]">
        <Select.ScrollUpButton className="SelectScrollButton flex justify-center py-2">
          <ChevronUp className="h-4 w-4" />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel px-6 py-2 text-xs text-gray-500 sm:text-sm">
              Sort by
            </Select.Label>
            <SelectItem
              className="cursor-pointer px-6 py-2 text-xs sm:text-sm"
              value="apple"
            >
              Latest
            </SelectItem>
            <SelectItem
              className="cursor-pointer px-6 py-2 text-xs sm:text-sm"
              value="banana"
            >
              Oldest
            </SelectItem>
            <SelectItem
              className="cursor-pointer px-6 py-2 text-xs sm:text-sm"
              value="blueberry"
            >
              Highest Price
            </SelectItem>
            <SelectItem
              className="cursor-pointer rounded-bl-2xl rounded-br-2xl px-6 py-2 text-xs sm:text-sm"
              value="grapes"
            >
              Lowest Price
            </SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton flex justify-center py-2">
          <ChevronUp className="h-4 w-4 rotate-180" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
)

export default RadixSelect
