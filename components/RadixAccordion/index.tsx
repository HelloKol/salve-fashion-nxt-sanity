import React from "react"
import { Root, Trigger, Header, Content, Item } from "@radix-ui/react-accordion"
import classNames from "classnames"
import { PortableText } from "@portabletext/react"
import ChevronDown from "@/components/svg/ChevronDown"
import styles from "./styles.module.scss"

const RadixAccordion = ({ data }: any) => {
  const renderAccordion = () =>
    data.map((item: any) => {
      const { _key, title, body, htmlText } = item
      return (
        <Item className={styles.AccordionItem} value={_key}>
          <AccordionTrigger>
            <p className="text-lg font-semibold">{title}</p>
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
      )
    })

  return (
    <Root
      className={styles.AccordionRoot}
      type={"single"}
      defaultValue={"item-1"}
      collapsible
    >
      {renderAccordion()}
    </Root>
  )
}

const AccordionTrigger = React.forwardRef(
  (
    { children, className, ...props }: { children?: any; className?: any },
    forwardedRef: any
  ) => (
    <Header className={styles.AccordionHeader}>
      <Trigger
        className={`py-8 ${styles.AccordionTrigger}`}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Trigger>
    </Header>
  )
)

const AccordionContent = React.forwardRef(
  (
    { children, className, ...props }: { children?: any; className?: any },
    forwardedRef: any
  ) => (
    <Content
      className={classNames(styles.AccordionContent, className)}
      {...props}
      ref={forwardedRef}
    >
      <article className={`pb-4 text-lg ${styles.AccordionContentText}`}>
        {children}
      </article>
    </Content>
  )
)

AccordionTrigger.displayName = "AccordionTrigger"
AccordionContent.displayName = "AccordionContent"

export default RadixAccordion
