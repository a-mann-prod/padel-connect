import {
  ActionsheetIcon,
  ActionsheetItemText,
  ActionsheetItem as GActionsheetItem,
} from '@gluestack-ui/themed'

import { Icon, IconProps } from '../../Icon/Icon'

import { isNilOrEmpty } from '@/utils/global'

export type ActionsheetItemProps = typeof GActionsheetItem.defaultProps & {
  id: string
  icon?: IconProps['name']
  title: string
}

export const ActionsheetItem = ({
  title,
  icon,
  ...props
}: ActionsheetItemProps) => (
  <GActionsheetItem {...props}>
    {!isNilOrEmpty(icon) && (
      <ActionsheetIcon as={(props: any) => <Icon name={icon} {...props} />} />
    )}
    <ActionsheetItemText>{title}</ActionsheetItemText>
  </GActionsheetItem>
)
