import React from "react";
// Props
interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export default function index({ children, className }: Props) {
  return (
    <div className={`mx-auto px-4 lg:px-6 2xl:max-w-[1920px] ${className}`}>
      {children}
    </div>
  );
}
