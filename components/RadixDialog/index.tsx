import * as DialogRadix from "@radix-ui/react-dialog";
import styles from "./styles.module.scss";
// import Close from "../../svgs/Close";

export default function Dialog({
  children,
  variant,
  isOpen,
  setIsOpen,
  checkIsClosed,
}: {
  children: React.ReactNode | React.ReactNode[];
  variant: "consentCookieBar" | "subscribeNewsLetter" | "search";
  isOpen: boolean;
  setIsOpen: any;
  checkIsClosed?: any;
}) {
  return (
    <DialogRadix.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogRadix.Portal>
        {variant !== "consentCookieBar" && (
          <div className={styles.dialogOverlay} />
        )}
        <DialogRadix.Content
          className={`${styles.dialogContent} ${styles[variant]}`}
        >
          <DialogRadix.Close asChild>
            <button
              className={`${styles[variant]} ${styles.closeBtn}`}
              onClick={checkIsClosed}
            >
              {/* <Close /> */}
            </button>
          </DialogRadix.Close>
          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
}
