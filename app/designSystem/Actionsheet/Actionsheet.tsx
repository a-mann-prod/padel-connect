import {
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Actionsheet as GActionsheet,
} from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'
import { SafeAreaView } from 'react-native'

import {
  ActionsheetItem,
  ActionsheetItemProps,
} from './ActionsheetItem/ActionsheetItem'

export type ActionsheetProps = typeof GActionsheet.defaultProps & {
  onChange?: (_: ActionsheetItemProps) => void
  items?: ActionsheetItemProps[]
}

export const Actionsheet = ({
  items,
  onChange,
  children,
  ...props
}: PropsWithChildren<ActionsheetProps>) => {
  const handleOnChange = (item: ActionsheetItemProps) => {
    onChange?.(item)
  }

  return (
    <GActionsheet {...props}>
      <ActionsheetBackdrop />

      <ActionsheetContent h="auto" pb="$0">
        <SafeAreaView style={{ width: '100%' }}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          {items?.length
            ? items.map((item) => (
                <ActionsheetItem
                  key={item.title}
                  onPress={(e) => {
                    handleOnChange(item)
                    item.onPress?.(e)
                  }}
                  {...item}
                />
              ))
            : children}
        </SafeAreaView>
      </ActionsheetContent>
    </GActionsheet>
  )
}
