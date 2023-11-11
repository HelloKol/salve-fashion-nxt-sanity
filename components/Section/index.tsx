import React from "react";
// Props
interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function index({ children, className }: Props) {
  return <section className={`py-[120px] ${className}`}>{children}</section>;
}
