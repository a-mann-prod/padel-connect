import { Box, Center, Text } from '@gluestack-ui/themed'
import {
  VirtualizedList as RNVirtualizedList,
  VirtualizedListProps as RNVirtualizedListProps,
} from 'react-native'

import { Loader } from '../Loader/Loader'

import { useTranslate } from '@/services/i18n'

export type VirtualizedListProps<T> = RNVirtualizedListProps<T> & {
  isLoading?: boolean
}

export const VirtualizedList = <T,>({
  isLoading,
  ...props
}: VirtualizedListProps<T>) => {
  const t = useTranslate()
  const ItemSeparatorComponent = () => <Box pt="$3" />

  const ListEmptyComponent = () => (
    <Center flex={1}>
      <Text>{t('noData')}</Text>
    </Center>
  )

  if (isLoading) {
    return <Loader />
  }

  return (
    <RNVirtualizedList<T>
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={{ height: '100%' }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ flexGrow: 1 }}
      {...props}
    />
  )
}
