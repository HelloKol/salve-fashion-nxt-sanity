import React from "react";
import * as Select from "@radix-ui/react-select";
import classnames from "classnames";
import Plus from "@/components/svg/Plus";
import ChevronUp from "@/components/svg/ChevronUp";

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem flex items-center gap-2", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemIndicator className="SelectItemIndicator">
          <div className="w-1.5 h-1.5 bg-black rounded-full" />
        </Select.ItemIndicator>
        <Select.ItemText>{children}</Select.ItemText>{" "}
      </Select.Item>
    );
  }
);
SelectItem.displayName = "SelectItem";

const RadixSelect = () => (
  <Select.Root>
    <Select.Trigger
      className="SelectTrigger flex items-center gap-4 border border-black rounded-full px-5 py-2"
      aria-label="Food"
    >
      <Select.Value placeholder="Sort by" />
      <Select.Icon className="SelectIcon">
        <Plus className="w-4 h-4" />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="SelectContent bg-[#d6d7cf] rounded-2xl">
        <Select.ScrollUpButton className="SelectScrollButton flex justify-center py-2">
          <ChevronUp className="w-4 h-4" />
        </Select.ScrollUpButton>
        <Select.Viewport className="SelectViewport">
          <Select.Group>
            <Select.Label className="SelectLabel px-6 py-2 text-gray-500">
              Sort by
            </Select.Label>
            <SelectItem className="px-6 py-2 cursor-pointer" value="apple">
              Latest
            </SelectItem>
            <SelectItem className="px-6 py-2 cursor-pointer" value="banana">
              Oldest
            </SelectItem>
            <SelectItem className="px-6 py-2 cursor-pointer" value="blueberry">
              Highest Price
            </SelectItem>
            <SelectItem
              className="px-6 py-2 cursor-pointer rounded-br-2xl rounded-bl-2xl"
              value="grapes"
            >
              Lowest Price
            </SelectItem>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="SelectScrollButton flex justify-center py-2">
          <ChevronUp className="w-4 h-4 rotate-180" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

export default RadixSelect;
