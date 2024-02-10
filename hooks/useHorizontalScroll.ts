import { RefObject, useEffect, useState } from "react"

const useHorizontalScroll = (
  feedRef: RefObject<HTMLUListElement>,
  btnRef: RefObject<HTMLButtonElement>,
  tabletScrollStep: number,
  desktopScrollStep: number
): { scrollX: number; scrollEnd: boolean } => {
  const [scrollX, setscrollX] = useState(0) // For detecting start scroll postion
  const [scrollEnd, setscrollEnd] = useState(false)

  //   listen for click event on carousel buttons
  useEffect(() => {
    feedRef.current?.addEventListener("scroll", scrollCheck)
    btnRef.current?.addEventListener("click", scrollHorizontal)

    return () => {
      feedRef.current?.removeEventListener("scroll", scrollCheck)
      btnRef.current?.removeEventListener("click", scrollHorizontal)
    }
  }, [scrollX])

  useEffect(() => {
    scrollCheck()
  }, [])

  const scrollHorizontal = () => {
    if (feedRef.current) {
      let scrollPosition = feedRef.current.scrollLeft

      // use value to scroll by depending on width of container
      if (feedRef.current.offsetWidth <= 850) {
        scrollPosition += tabletScrollStep
        setscrollX(scrollX + tabletScrollStep)
      } else {
        scrollPosition += desktopScrollStep
        setscrollX(scrollX + desktopScrollStep)
      }
      feedRef.current.scroll({ left: scrollPosition, behavior: "smooth" })

      //For checking if the scroll has ended
      if (
        Math.floor(feedRef.current.scrollWidth - feedRef.current.scrollLeft) <=
        feedRef.current.offsetWidth
      ) {
        setscrollEnd(true)
      } else {
        setscrollEnd(false)
      }
    }
  }

  //This will check scroll event and checks for scroll end
  const scrollCheck = () => {
    if (feedRef.current) {
      setscrollX(feedRef.current.scrollLeft)
      if (
        Math.floor(feedRef.current.scrollWidth - feedRef.current.scrollLeft) <=
        feedRef.current.offsetWidth
      ) {
        setscrollEnd(true)
      } else {
        setscrollEnd(false)
      }
    }
  }

  return { scrollX, scrollEnd }
}

export default useHorizontalScroll
