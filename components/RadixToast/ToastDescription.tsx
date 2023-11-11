import React from "react";
import { ToastDescription } from "@radix-ui/react-toast";
import styles from "./styles.module.scss";

// Poprs
export interface DescriptionProps {
  children: React.ReactNode | React.ReactNode[];
}

const Description = ({ children }: DescriptionProps) => {
  return (
    <ToastDescription className={styles.toastDescription}>
      {children}
    </ToastDescription>
  );
};

export default Description;
