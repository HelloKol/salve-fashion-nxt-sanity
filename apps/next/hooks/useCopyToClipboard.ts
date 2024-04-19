import { useState } from "react"

const useCopyToClipboard = () => {
  const [isFetching, setIsFetching] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const copyToClipboard = async (textToCopy: string) => {
    setIsFetching(true)
    let textarea = null
    let result = null

    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy)
        setIsSuccess(true)
      } catch (error) {
        setIsError(true)
      } finally {
        setIsFetching(false)
      }
    } else {
      textarea = document.createElement("textarea")
      textarea.setAttribute("readonly", "true")
      textarea.setAttribute("contenteditable", "true")
      // Move the textarea outside the viewport to make it invisible
      textarea.style.opacity = "0"
      textarea.style.position = "absolute"
      textarea.style.left = "-99999999px"
      textarea.value = textToCopy

      document.body.prepend(textarea)

      // highlight the content of the textarea element
      textarea.focus()
      textarea.select()

      const range = document.createRange()
      range.selectNodeContents(textarea)

      const selection =
        typeof window !== "undefined" && window && window.getSelection()
      selection && selection.removeAllRanges()
      selection && selection.addRange(range)

      try {
        textarea.setSelectionRange(0, textarea.value.length)
        result = document.execCommand("copy")
        if (result) {
          setIsSuccess(true)
        } else {
          setIsError(true)
        }
      } catch (err) {
        console.error(err)
        setIsError(true)
      } finally {
        document.body.removeChild(textarea)
        setIsFetching(false)
      }
    }
  }

  return { isFetching, isError, isSuccess, copyToClipboard }
}

export default useCopyToClipboard
