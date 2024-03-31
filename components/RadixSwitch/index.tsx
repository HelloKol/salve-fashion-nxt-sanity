import { useEffect, useState } from "react"
import * as Switch from "@radix-ui/react-switch"
import styles from "./styles.module.scss"

export default function RadixSwitch() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <Switch.Root className={styles.SwitchRoot}>
      <Switch.Thumb className={styles.SwitchThumb} />
    </Switch.Root>
  )
}
