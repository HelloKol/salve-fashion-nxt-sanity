import React, { RefObject, forwardRef } from "react";
import styles from "./styles.module.scss";

interface ToastProgressProps {
  duration: number;
  ref: RefObject<HTMLDivElement>;
}

const ToastProgress = forwardRef<HTMLDivElement, ToastProgressProps>(
  ({ duration }, ref) => {
    return (
      <div className={styles.toastProgressOuter}>
        <div
          className={styles.toastProgressInner}
          ref={ref}
          style={{
            transition: `width ${duration}ms linear`,
          }}
        />
      </div>
    );
  }
);

export default ToastProgress;
