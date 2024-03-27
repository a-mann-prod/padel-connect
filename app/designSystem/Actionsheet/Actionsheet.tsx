import {
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Actionsheet as GActionsheet,
} from '@gluestack-ui/themed'

import {
  ActionsheetItem,
  ActionsheetItemProps,
} from './ActionsheetItem/ActionsheetItem'

export type ActionsheetProps = typeof GActionsheet.defaultProps & {
  onChange?: (_: ActionsheetItemProps) => void
  items: ActionsheetItemProps[]
}

export const Actionsheet = ({
  items,
  onChange,
  ...props
}: ActionsheetProps) => {
  const handleOnChange = (item: ActionsheetItemProps) => {
    onChange?.(item)
  }

  return (
    <GActionsheet {...props}>
      <ActionsheetBackdrop />
      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        {items.map((item) => (
          <ActionsheetItem
            key={item.title}
            onPress={(e) => {
              handleOnChange(item)
              item.onPress?.(e)
            }}
            {...item}
          />
        ))}
      </ActionsheetContent>
    </GActionsheet>
  )
}
