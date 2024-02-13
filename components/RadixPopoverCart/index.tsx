import React from "react"
import styles from "./styles.module.scss"
import * as Popover from "@radix-ui/react-popover"

const RadixPopoverCart = ({ trigger, children }: any) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={styles.PopoverContent} sideOffset={5}>
        {children}
        <Popover.Close
          className="absolute right-[15px] top-[15px]"
          aria-label="Close"
        >
          <svg
            className="h-6 w-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>
        </Popover.Close>
        <Popover.Arrow className={styles.PopoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)

export default RadixPopoverCart
