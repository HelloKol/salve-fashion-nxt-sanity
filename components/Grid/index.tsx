import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function index({ children, className, as = "div" }: Props) {
  const Element = as;

  return (
    <Element className={`grid grid-cols-12 gap-4 ${className}`}>
      {children}
    </Element>
  );
}
