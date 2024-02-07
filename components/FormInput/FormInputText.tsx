import React, { forwardRef, useState } from "react"

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
    const [switchPasswordInput, setSwitchPasswordInput] = useState(false)
    const isPassword = type === "password"

    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium uppercase text-gray-500">
            {label}
          </label>
        )}

        <input
          type={switchPasswordInput ? "text" : type}
          className="block w-full border-b-[1px] border-black p-1 pl-0 text-sm text-gray-900 outline-none"
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />

        {isPassword ? (
          switchPasswordInput ? (
            <svg
              className="absolute right-0 top-5 h-6 w-6 cursor-pointer text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setSwitchPasswordInput(false)}
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 14c-.5-.6-.9-1.3-1-2 0-1 4-6 9-6m7.6 3.8A5 5 0 0 1 21 12c0 1-3 6-9 6h-1m-6 1L19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ) : (
            <svg
              className="absolute right-0 top-5 h-6 w-6 cursor-pointer text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              onClick={() => setSwitchPasswordInput(true)}
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M21 12c0 1.2-4 6-9 6s-9-4.8-9-6c0-1.2 4-6 9-6s9 4.8 9 6Z"
              />
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )
        ) : null}

        {error && <p className="mt-1 text-red-500">{error.message}</p>}
      </div>
    )
  }
)

export default FormInputText
