import React from "react";
// Props
interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  withPadding?: boolean;
}

export default function index({
  children,
  className,
  withPadding = true,
}: Props) {
  return (
    <main className={`${withPadding ? `py-24` : ``} ${className}`}>
      {children}
    </main>
  );
}
