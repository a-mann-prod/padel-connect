import { Box } from '@gluestack-ui/themed'
import {
  VirtualizedList as RNVirtualizedList,
  VirtualizedListProps as RNVirtualizedListProps,
} from 'react-native'

export type VirtualizedListProps<T> = RNVirtualizedListProps<T>

export const VirtualizedList = <T,>(props: VirtualizedListProps<T>) => {
  const ItemSeparatorComponent = () => <Box pt="$3" />

  return (
    <RNVirtualizedList<T>
      keyboardShouldPersistTaps="handled"
      style={{ height: '100%' }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      {...props}
    />
  )
}
