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

        {error && <p>{error.message}</p>}
      </div>
    )
  }
)

export default FormInputCheckbox
