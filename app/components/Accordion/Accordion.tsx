import {
  Accordion as GAccordion,
  AccordionContent as GAccordionContent,
  AccordionHeader as GAccordionHeader,
  AccordionItem as GAccordionItem,
  AccordionTrigger as GAccordionTrigger,
} from '@gluestack-ui/themed'
import { ComponentProps, PropsWithChildren, ReactElement } from 'react'

export type AccordionProps = ComponentProps<typeof GAccordion> & {
  header: ({ isExpanded }: { isExpanded: boolean }) => ReactElement
}

export const Accordion = ({
  header,
  children,
  ...props
}: PropsWithChildren<AccordionProps>) => {
  return (
    <GAccordion
      flex={1}
      variant="unfilled"
      type="single"
      isCollapsible
      isDisabled={false}
      {...props}
    >
      <GAccordionItem value="a">
        <GAccordionHeader>
          <GAccordionTrigger>{header}</GAccordionTrigger>
        </GAccordionHeader>
        <GAccordionContent
          gap="$2"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          {children}
        </GAccordionContent>
      </GAccordionItem>
    </GAccordion>
  )
}
