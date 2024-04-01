import * as React from "react"
import { useEffect, useRef } from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import {
  Button,
  Toast,
  ToastButton,
  ToastContent,
  ToastDescription,
  ToastList,
  ToastProgress,
} from "@/components"

interface ToastData {
  type: "foreground" | "background" | undefined
  description: React.ReactNode | React.ReactNode[]
  duration: number
  status?: "success" | "error"
  open?: boolean
  onClose: () => void
}

interface ToastsProps {
  children: React.ReactNode | React.ReactNode[]
}

type ToastDispatch = {
  success: (payload: Omit<ToastData, "status" | "open">) => void
  error: (payload: Omit<ToastData, "status" | "open">) => void
}

const ToastContext = React.createContext<ToastDispatch | null>(null)

type ToastContextListType = {
  toastElementsMapRef: React.MutableRefObject<Map<string, HTMLElement>>
  handleRemoveToast: (key: string) => void
}

const ToastContextList = React.createContext<ToastContextListType | null>(null)

export const ToastProvider: React.FC<ToastsProps> = ({
  children,
  ...props
}) => {
  const [toasts, setToasts] = React.useState<Map<string, ToastData>>(new Map())
  const toastElementsMapRef = React.useRef<Map<string, HTMLElement>>(new Map())
  const viewportRef = React.useRef<HTMLOListElement | null>(null)
  const timeoutRefs = React.useRef<Map<string, NodeJS.Timeout>>(new Map())

  const handleAddToast = React.useCallback((toast: ToastData) => {
    toast.onClose()
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts)
      const key = String(Date.now())
      newMap.set(key, { ...toast, open: true })
      // Create a new timeout for the toast and store its reference
      const timeout = setTimeout(() => {
        handleRemoveToast(key)
      }, toast.duration)
      timeoutRefs.current.set(key, timeout)
      return newMap
    })
  }, [])

  const handleRemoveToast = React.useCallback((key: string) => {
    setToasts((currentToasts) => {
      const newMap = new Map(currentToasts)
      if (newMap.has(key)) {
        const toastData = newMap.get(key)
        if (toastData) {
          newMap.set(key, { ...toastData, open: false })
          // Clear the timeout reference and remove it from the map
          const timeoutRef = timeoutRefs.current.get(key)
          if (timeoutRef) {
            clearTimeout(timeoutRef)
            timeoutRefs.current.delete(key)
          }
        }
      }
      return newMap
    })
  }, [])

  const handleDispatchSuccess = React.useCallback(
    (payload: Omit<ToastData, "status" | "open">) =>
      handleAddToast({
        ...payload,
        status: "success",
        open: true,
      }),
    [handleAddToast]
  )

  const handleDispatchError = React.useCallback(
    (payload: Omit<ToastData, "status" | "open">) =>
      handleAddToast({
        ...payload,
        status: "error",
        open: true,
      }),
    [handleAddToast]
  )

  return (
    <ToastContext.Provider
      value={React.useMemo(
        () => ({ success: handleDispatchSuccess, error: handleDispatchError }),
        [handleDispatchSuccess, handleDispatchError]
      )}
    >
      <ToastContextList.Provider
        value={React.useMemo(
          () => ({ toastElementsMapRef, handleRemoveToast }),
          [handleRemoveToast]
        )}
      >
        <ToastPrimitive.Provider {...props} swipeDirection="up">
          {children}
          <ToastList>
            {Array.from(toasts).map(([key, toast]) => (
              <ToastItem
                key={key}
                id={key}
                toast={toast}
                onOpenChange={(open: boolean) => {
                  if (!open) handleRemoveToast(key)
                }}
                onClose={toast.onClose}
              />
            ))}
            <ToastPrimitive.Viewport
              ref={viewportRef}
              className="ToastViewport"
              style={{
                all: "unset",
              }}
            />
          </ToastList>
        </ToastPrimitive.Provider>
      </ToastContextList.Provider>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastDispatch => {
  const context = React.useContext(ToastContext)
  if (context) return context
  throw new Error("useToast must be used within Toasts")
}

export const useToastContext = (): ToastContextListType => {
  const context = React.useContext(ToastContextList)
  if (context) return context
  throw new Error("useToastContext must be used within Toasts")
}

interface ToastProps {
  onOpenChange: (open: boolean) => void
  toast: ToastData
  id: string
  onClose: () => void
}

const useProgressBar = (
  progressRef: React.MutableRefObject<HTMLDivElement | null>,
  duration: number,
  onComplete: () => void
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, duration)

    if (progressRef.current) {
      setTimeout(() => {
        if (progressRef.current) progressRef.current.style.width = "0%"
      }, 100)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [duration, onComplete, progressRef])
}

const useManualClose = (
  progressRef: React.MutableRefObject<HTMLDivElement | null>,
  open?: boolean,
  handleRemoveToast?: () => void
) => {
  useEffect(() => {
    if (!open && progressRef.current) {
      progressRef.current.style.width = "0%"
      handleRemoveToast && handleRemoveToast()
    }
  }, [open, progressRef, handleRemoveToast])
}

export const useToastOpen = (
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  onClose: () => void,
  options: ToastData
) => {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToastOpen must be used within Toasts")
  const { success, error } = context

  useEffect(() => {
    if (isLoading) {
      return success({
        ...options,
        onClose: onClose,
      })
    } else if (isSuccess) {
      return success({
        ...options,
        onClose: onClose,
      })
    } else if (isError) {
      return error({
        ...options,
        onClose: onClose,
      })
    }
  }, [isLoading, isError, isSuccess])

  return null
}

const ToastItem: React.FC<ToastProps> = ({
  toast,
  id,
  onOpenChange,
  onClose,
}) => {
  const ref = React.useRef<HTMLLIElement | null>(null)
  const context = useToastContext()
  const { toastElementsMapRef } = context
  const toastElementsMap = toastElementsMapRef.current
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  React.useLayoutEffect(() => {
    if (ref.current) {
      toastElementsMap.set(id, ref.current)
    }
  }, [id, toastElementsMap])

  const handleProgressBarComplete = () => {
    onOpenChange(false)
    onClose()
  }

  useEffect(() => {
    // Clear the previous timeout if any
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    // Set a new timeout for the current toast
    toastTimeoutRef.current = setTimeout(() => {
      handleProgressBarComplete()
    }, toast.duration)
    return () => {
      // Clear the timeout when the component is unmounted
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [toast.duration, handleProgressBarComplete])

  useProgressBar(progressBarRef, toast.duration, handleProgressBarComplete)
  useManualClose(progressBarRef, toast.open, handleProgressBarComplete)

  return (
    <Toast
      type={toast.type}
      duration={toast.duration}
      elementRef={ref}
      open={toast.open}
      onOpenChange={(open: boolean) => {
        onOpenChange(open)
        if (!open) onClose()
      }}
    >
      <ToastContent>
        <ToastDescription>{toast.description}</ToastDescription>
        <ToastProgress ref={progressBarRef} duration={toast.duration} />
      </ToastContent>
      <ToastButton>
        <button>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </ToastButton>
    </Toast>
  )
}

export default ToastProvider
