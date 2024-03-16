import {
  ActionsheetItemText,
  ActionsheetItem as GActionsheetItem,
} from '@gluestack-ui/themed'

import { Icon, IconName } from '@/designSystem/Icon/Icon'

export type ActionsheetItemProps = typeof GActionsheetItem.defaultProps & {
  icon?: IconName
  title: string
}

export const ActionsheetItem = ({
  title,
  icon,
  ...props
}: ActionsheetItemProps) => (
  <GActionsheetItem {...props}>
    {icon && <Icon name={icon} size={20} />}
    <ActionsheetItemText>{title}</ActionsheetItemText>
  </GActionsheetItem>
)
