import {
  ActionsheetItemText,
  ActionsheetItem as GActionsheetItem,
  Icon,
} from '@gluestack-ui/themed'
import { ReactNode } from 'react'

export type ActionsheetItemProps = typeof GActionsheetItem.defaultProps & {
  id: string
  icon?: ReactNode
  title: string
}

export const ActionsheetItem = ({
  title,
  icon,
  ...props
}: ActionsheetItemProps) => (
  <GActionsheetItem {...props}>
    {icon && <Icon as={icon} size="md" />}
    <ActionsheetItemText>{title}</ActionsheetItemText>
  </GActionsheetItem>
)
