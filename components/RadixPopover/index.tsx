import React from "react"
import styles from "./styles.module.scss"
import * as Popover from "@radix-ui/react-popover"

const RadixPopover = ({ trigger, children }: any) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={styles.PopoverContent} sideOffset={5}>
        {children}
        <Popover.Arrow className={styles.PopoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
)

export default RadixPopover
