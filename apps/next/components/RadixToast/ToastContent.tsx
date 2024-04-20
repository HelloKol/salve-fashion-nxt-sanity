import React from 'react';
import styles from './styles.module.scss';

// Poprs
export interface ToastContentProps {
  children: React.ReactNode | React.ReactNode[];
}

const ToastContent = ({ children }: ToastContentProps) => {
  return <div className={styles.toastContent}>{children}</div>;
};

export default ToastContent;
