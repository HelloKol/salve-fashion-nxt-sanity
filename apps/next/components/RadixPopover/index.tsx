import React from 'react';
import styles from './styles.module.scss';
import * as Popover from '@radix-ui/react-popover';

interface props {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

const RadixPopover = ({ trigger, children }: props) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className={styles.PopoverContent} sideOffset={5}>
        {children}
        <Popover.Arrow className={styles.PopoverArrow} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default RadixPopover;
