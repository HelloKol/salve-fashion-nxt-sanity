import React from 'react';
import { Root, Trigger, Header, Content, Item } from '@radix-ui/react-accordion';
import { PortableTextBlock } from '@portabletext/types';
import classNames from 'classnames';
import { PortableText } from '@portabletext/react';
import ChevronDown from '@/components/svg/ChevronDown';
import styles from './styles.module.scss';

interface props {
  data: {
    _key: string;
    title: string;
    body?: PortableTextBlock;
    htmlText?: string;
  }[];
}

const RadixAccordion = ({ data }: props) => {
  const renderAccordion = () =>
    data.map((item) => {
      const { _key, title, body, htmlText } = item;
      return (
        <Item key={_key} className={styles.AccordionItem} value={_key}>
          <AccordionTrigger>
            <p className="text-md font-semibold capitalize">{title}</p>
            <ChevronDown className="h-4 fill-black" />
          </AccordionTrigger>
          <AccordionContent>
            {body ? (
              <PortableText value={body} />
            ) : htmlText ? (
              <article dangerouslySetInnerHTML={{ __html: htmlText }} />
            ) : (
              ``
            )}
          </AccordionContent>
        </Item>
      );
    });

  return (
    <Root className={styles.AccordionRoot} type={'single'} defaultValue={'item-1'} collapsible>
      {renderAccordion()}
    </Root>
  );
};

const AccordionTrigger = React.forwardRef(
  (
    { children, className, ...props }: { children?: React.ReactNode; className?: string },
    forwardedRef: React.ForwardedRef<HTMLButtonElement>
  ) => (
    <Header className={styles.AccordionHeader}>
      <Trigger className={`py-8 ${styles.AccordionTrigger}`} {...props} ref={forwardedRef}>
        {children}
      </Trigger>
    </Header>
  )
);

const AccordionContent = React.forwardRef(
  (
    { children, className, ...props }: { children?: React.ReactNode; className?: string },
    forwardedRef: React.ForwardedRef<HTMLDivElement>
  ) => (
    <Content className={classNames(styles.AccordionContent, className)} {...props} ref={forwardedRef}>
      <article className={`pb-4 text-lg ${styles.AccordionContentText}`}>{children}</article>
    </Content>
  )
);

AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

export default RadixAccordion;
