import React from 'react';
import styles from './styles.module.scss';

// Poprs
export interface ToastListProps {
  children: React.ReactNode | React.ReactNode[];
}

const ToastList = ({ children }: ToastListProps) => {
  return <div className={styles.toastList}>{children}</div>;
};

export default ToastList;
