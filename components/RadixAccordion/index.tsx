import React from "react"
import { Root, Trigger, Header, Content, Item } from "@radix-ui/react-accordion"
import classNames from "classnames"
import ChevronDown from "@/components/svg/ChevronDown"
import styles from "./styles.module.scss"

const RadixAccordion = () => (
  <Root
    className={styles.AccordionRoot}
    type={"single"}
    defaultValue={"item-1"}
    collapsible
  >
    <Item className={styles.AccordionItem} value={"item-1"}>
      <AccordionTrigger>
        <p className="text-lg font-semibold">How is bjorn eco friendly?</p>
        <ChevronDown className="h-4 fill-black" />
      </AccordionTrigger>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          expedita totam laboriosam, labore a libero tenetur eius impedit est,
          ea laudantium sapiente illum asperiores? Consequatur reprehenderit
          tenetur, vero velit mollitia eaque repudiandae voluptas cum nostrum
          dolorem, tempora repellat, suscipit quaerat tempore minima quisquam
          esse fugit! Laudantium harum earum adipisci? Vitae!
        </p>
      </AccordionContent>
    </Item>

    <Item className={styles.AccordionItem} value={"item-2"}>
      <AccordionTrigger>
        <p className="text-lg font-semibold">How is bjorn eco friendly?</p>
        <ChevronDown className="h-4 fill-black" />
      </AccordionTrigger>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          expedita totam laboriosam, labore a libero tenetur eius impedit est,
          ea laudantium sapiente illum asperiores? Consequatur reprehenderit
          tenetur, vero velit mollitia eaque repudiandae voluptas cum nostrum
          dolorem, tempora repellat, suscipit quaerat tempore minima quisquam
          esse fugit! Laudantium harum earum adipisci? Vitae!
        </p>
      </AccordionContent>
    </Item>

    <Item className={styles.AccordionItem} value={"item-3"}>
      <AccordionTrigger>
        <p className="text-lg font-semibold">How is bjorn eco friendly?</p>
        <ChevronDown className="h-4 fill-black" />
      </AccordionTrigger>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          expedita totam laboriosam, labore a libero tenetur eius impedit est,
          ea laudantium sapiente illum asperiores? Consequatur reprehenderit
          tenetur, vero velit mollitia eaque repudiandae voluptas cum nostrum
          dolorem, tempora repellat, suscipit quaerat tempore minima quisquam
          esse fugit! Laudantium harum earum adipisci? Vitae!
        </p>
      </AccordionContent>
    </Item>

    <Item className={styles.AccordionItem} value={"item-4"}>
      <AccordionTrigger>
        <p className="text-lg font-semibold">How is bjorn eco friendly?</p>
        <ChevronDown className="h-4 fill-black" />
      </AccordionTrigger>
      <AccordionContent>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          expedita totam laboriosam, labore a libero tenetur eius impedit est,
          ea laudantium sapiente illum asperiores? Consequatur reprehenderit
          tenetur, vero velit mollitia eaque repudiandae voluptas cum nostrum
          dolorem, tempora repellat, suscipit quaerat tempore minima quisquam
          esse fugit! Laudantium harum earum adipisci? Vitae!
        </p>
      </AccordionContent>
    </Item>
  </Root>
)

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
