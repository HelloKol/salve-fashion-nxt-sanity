import React from "react";
import { Close } from "@radix-ui/react-toast";
import styles from "./styles.module.scss";

// Poprs
export interface ToastButtonProps {
  children: React.ReactNode | React.ReactNode[];
}

const ToastButton = ({ children }: ToastButtonProps) => {
  return <Close className={styles.toastButton}>{children}</Close>;
};

export default ToastButton;
