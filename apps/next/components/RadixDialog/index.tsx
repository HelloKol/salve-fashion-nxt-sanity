import { useEffect, useState } from 'react';
import * as DialogRadix from '@radix-ui/react-dialog';
import styles from './styles.module.scss';

export default function Dialog({
  children,
  variant,
  isOpen,
  setIsOpen
}: {
  children: React.ReactNode;
  variant: 'consentCookie' | 'cookieSettings' | 'exampleOrder' | 'search';
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <DialogRadix.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogRadix.Portal>
        {variant !== 'consentCookie' && <div className={styles.dialogOverlay} />}
        <DialogRadix.Content className={`${styles.dialogContent} ${styles[variant]}`}>
          {children}
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  );
}
