// @ts-ignore
// @ts-nocheck
import { useEffect, useRef, MutableRefObject } from "react"

interface StartPoint {
  x: number
  scrollLeft: number
}

export default function useDragScroll(
  ref: MutableRefObject<HTMLDivElement | HTMLUListElement | null>
) {
  const startPoint = useRef<StartPoint>({ x: 0, scrollLeft: 0 })

  const onMouseDown = (e: MouseEvent) => {
    startPoint.current = {
      x: e.pageX,
      scrollLeft: ref.current?.scrollLeft || 0,
    }
    ref.current!.style.cursor = "grabbing"
    ref.current!.style.userSelect = "none"
    ref.current?.addEventListener("mousemove", onMouseMove)
    ref.current?.addEventListener("mouseleave", onMouseEnd)
    ref.current?.addEventListener("mouseup", onMouseEnd)
  }

  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startPoint.current.x) * 1.5 // scroll-fast
    ref.current!.scrollLeft = startPoint.current.scrollLeft - walk
  }

  const onMouseEnd = () => {
    ref.current!.style.cursor = ""
    ref.current!.style.removeProperty("userSelect")
    ref.current?.removeEventListener("mousemove", onMouseMove)
    ref.current?.removeEventListener("mouseleave", onMouseEnd)
    ref.current?.removeEventListener("mouseup", onMouseEnd)
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mousedown", onMouseDown)
      return () => {
        if (ref.current) {
          ref.current.removeEventListener("mousedown", onMouseDown)
        }
      }
    }
  }, [ref]) // Pass in the ref to run useEffect when it changes
}
