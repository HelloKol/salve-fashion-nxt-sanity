import React, { ReactNode, forwardRef } from "react"

//Props
export interface FormInputCheckboxProps {
  label?: ReactNode | string
  error?: {
    message?: string
  }
}

const FormInputCheckbox = forwardRef<HTMLInputElement, FormInputCheckboxProps>(
  function forwardFormEntry(
    { label, error, ...rest }: FormInputCheckboxProps,
    ref
  ) {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          id="link-checkbox"
          value=""
          className="h-4 w-4 rounded border-black bg-gray-100 text-blue-600"
          ref={ref}
          {...rest}
        />
        {label && (
          <label htmlFor="link-checkbox" className="ml-2 text-sm font-medium">
            {label}
          </label>
        )}
        {error && (
          <div className="mt-1 flex items-center gap-2">
            <svg
              className=" h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke-width="1.5"
                className="stroke-red-500"
              />
              <path
                d="M12 17V11"
                stroke-width="1.5"
                stroke-linecap="round"
                className="stroke-red-500"
              />
              <circle
                cx="1"
                cy="1"
                r="1"
                transform="matrix(1 0 0 -1 11 9)"
                className="stroke-red-500"
              />
            </svg>
            <p className="text-sm text-red-500">{error.message}</p>
          </div>
        )}{" "}
      </div>
    )
  }
)

export default FormInputCheckbox
