import React, { forwardRef } from "react"

//Props
export interface FormInputTextProps {
  type?: string
  placeholder?: string
  label?: string
  defaultValue?: string
  error?: {
    message?: string
  }
}

const FormInputText = forwardRef<HTMLInputElement, FormInputTextProps>(
  function forwardFormEntry(
    { type, placeholder, label, error, ...rest }: FormInputTextProps,
    ref
  ) {
    return (
      <>
        {label && (
          <label className="block text-sm font-medium uppercase text-gray-500">
            {label}
          </label>
        )}

        <input
          type={type}
          className="block w-full border-b-[1px] border-black p-1 pl-0 text-sm text-gray-900 outline-none"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />

        {error && <p>{error.message}</p>}
      </>
    )
  }
)

export default FormInputText
