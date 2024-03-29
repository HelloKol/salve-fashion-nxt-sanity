import * as DialogRadix from "@radix-ui/react-dialog"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
// import Close from "../../svgs/Close";

export default function Dialog({
  children,
  variant,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode | React.ReactNode[]
  variant: "consentCookie" | "cookieSettings" | "subscribeNewsLetter" | "search"
  isOpen: boolean
  setIsOpen: any
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <DialogRadix.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogRadix.Portal>
        {variant !== "consentCookie" && (
          <div className={styles.dialogOverlay} />
        )}
        <DialogRadix.Content
          className={`${styles.dialogContent} ${styles[variant]}`}
        >
          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}
