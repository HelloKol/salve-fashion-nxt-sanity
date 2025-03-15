import Link from 'next/link';
import React, { RefObject } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary';
export type ButtonType = 'submit' | 'reset' | 'button';
// Props
interface Props {
  children: React.ReactNode;
  className?: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  elementRef?: RefObject<HTMLButtonElement>;
  toolTipText?: string;
  href?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

export default function index({
  children,
  className,
  type = 'button',
  variant = 'primary',
  elementRef,
  toolTipText,
  href,
  isActive,
  disabled,
  onClick
}: Props) {
  const buttonVariant =
    variant === 'primary'
      ? isActive
        ? 'w-fit h-fit shrink-0 bg-[#171717] border border-transparent rounded-full px-5 py-2 flex items-center justify-center text-white text-xs sm:text-sm uppercase'
        : 'w-fit h-fit shrink-0 border border-black rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm uppercase'
      : variant === 'secondary'
        ? isActive
          ? 'w-fit h-fit shrink-0 border border-white rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm text-white text-sm uppercase'
          : 'w-fit h-fit shrink-0 border border-white rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm text-white text-sm uppercase ease-in-out duration-300 hover:border-white hover:bg-white hover:text-black'
        : variant === 'tertiary'
          ? isActive
            ? 'w-fit h-fit shrink-0 bg-[#171717] border border-black rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm text-white text-sm uppercase'
            : 'w-fit h-fit shrink-0 border border-black rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm text-sm uppercase ease-in-out duration-300 hover:border-black hover:bg-black hover:text-white'
          : variant === 'quaternary'
            ? isActive
              ? 'w-fit h-fit shrink-0 bg-[#171717] rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm text-white text-sm uppercase'
              : 'w-fit h-fit shrink-0 bg-[#171717] rounded-full px-5 py-2 flex items-center justify-center text-xs sm:text-sm text-white text-sm uppercase ease-in-out duration-300 hover:border-[#474747] hover:bg-[#474747]'
            : '';

  const disabledVariant =
    variant === 'primary'
      ? disabled && 'border-gray-500 text-gray-500 cursor-no-drop'
      : variant === 'secondary'
        ? disabled && 'cursor-no-drop'
        : variant === 'tertiary'
          ? disabled && 'cursor-no-drop'
          : variant === 'quaternary'
            ? disabled && 'bg-[#474747] cursor-no-drop'
            : '';

  if (href)
    return (
      <Link
        className={`${buttonVariant} ${disabledVariant} ${className} ${variant} ${isActive ? `active` : ``}`}
        href={href}
        onClick={onClick}
      >
        {children}
      </Link>
    );

  return (
    <button
      className={`${buttonVariant} ${disabledVariant} ${className} ${variant}`}
      ref={elementRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
