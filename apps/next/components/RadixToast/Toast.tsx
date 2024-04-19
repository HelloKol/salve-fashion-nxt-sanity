import React, { Ref } from "react"
import { Root } from "@radix-ui/react-toast"
import styles from "./styles.module.scss"

// Poprs
export interface ToastProps {
  children: React.ReactNode | React.ReactNode[]
  type: "foreground" | "background" | undefined
  elementRef: Ref<HTMLLIElement> | undefined
  duration: number
  open?: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function Toast({
  children,
  type,
  elementRef,
  duration,
  open,
  onOpenChange,
}: ToastProps) {
  return (
    <Root
      className={styles.toastRoot}
      ref={elementRef}
      type={type}
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
    >
      {children}
    </Root>
  )
}
