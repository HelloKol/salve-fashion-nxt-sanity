/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from "react"

type WindowDimentions = {
  isMobile: boolean
  isMobileLarge: boolean
  isTablet: boolean
  isDesktop: boolean
  isWidescreen: boolean
}

const useWindowDimension = (): WindowDimentions => {
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileLarge, setIsMobileLarge] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isWidescreen, setIsWidescreen] = useState(false)

  useEffect(() => {
    function handleResize(): void {
      if (window.innerWidth < 500) {
        setIsMobile(true)

        setIsMobileLarge(false)
        setIsTablet(false)
        setIsDesktop(false)
        setIsWidescreen(false)
      }
      if (window.innerWidth >= 500 && window.innerWidth < 740) {
        setIsMobileLarge(true)

        setIsMobile(false)
        setIsTablet(false)
        setIsDesktop(false)
        setIsWidescreen(false)
      }
      if (window.innerWidth >= 740 && window.innerWidth < 1020) {
        setIsTablet(true)

        setIsMobile(false)
        setIsMobileLarge(false)
        setIsDesktop(false)
        setIsWidescreen(false)
      }
      if (window.innerWidth >= 1020 && window.innerWidth < 1460) {
        setIsDesktop(true)

        setIsMobile(false)
        setIsMobileLarge(false)
        setIsTablet(false)
        setIsWidescreen(false)
      }
      if (window.innerWidth >= 1460) {
        setIsWidescreen(true)

        setIsMobile(false)
        setIsMobileLarge(false)
        setIsTablet(false)
        setIsDesktop(false)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return (): void => window.removeEventListener("resize", handleResize)
  }, [])

  return {
    isMobile,
    isMobileLarge,
    isTablet,
    isDesktop,
    isWidescreen,
  }
}

export default useWindowDimension
