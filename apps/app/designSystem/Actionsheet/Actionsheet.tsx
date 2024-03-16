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
  items: ActionsheetItemProps[]
}

export const Actionsheet = ({ items, ...props }: ActionsheetProps) => (
  <GActionsheet {...props}>
    <ActionsheetBackdrop />
    <ActionsheetContent>
      <ActionsheetDragIndicatorWrapper>
        <ActionsheetDragIndicator />
      </ActionsheetDragIndicatorWrapper>
      {items.map((item) => (
        <ActionsheetItem key={item.title} {...item} />
      ))}
    </ActionsheetContent>
  </GActionsheet>
)
