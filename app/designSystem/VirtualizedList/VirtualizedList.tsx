import { Box, Center, Text } from '@gluestack-ui/themed'
import { ForwardedRef, Ref, forwardRef } from 'react'
import {
  VirtualizedList as RNVirtualizedList,
  VirtualizedListProps as RNVirtualizedListProps,
} from 'react-native'

import { Icon } from '../Icon/Icon'
import { Loader } from '../Loader/Loader'

import { useTranslate } from '@/services/i18n'
import { when } from '@/utils/when'

export type VirtualizedListProps<T> = RNVirtualizedListProps<T> & {
  isLoading?: boolean
  isLoadingNext?: boolean
}

export type VirtualizedListRef<T> = RNVirtualizedList<T>

const VirtualizedListInner = <T,>(
  { isLoading, isLoadingNext, data, ...props }: VirtualizedListProps<T>,
  ref: ForwardedRef<VirtualizedListRef<T>>
) => {
  const t = useTranslate()
  const ItemSeparatorComponent = () => <Box pt="$3" />

  const ListEmptyComponent = () => {
    if (data) {
      return (
        <Center
          flex={1}
          gap="$3"
          transform={when(!!props?.inverted, [{ scaleY: -1 }])}
        >
          <Text>{t('noData')}</Text>
          <Icon name="FAR-face-frown-open" size="xl" />
        </Center>
      )
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <RNVirtualizedList<T>
        ref={ref}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{ height: '100%' }}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        data={data || []}
        ListFooterComponent={isLoadingNext ? <Loader p="$2" /> : undefined}
        {...props}
      />
    </>
  )
}

const VirtualizedListWithRef = forwardRef<any, any>(VirtualizedListInner)

type ClickableListWithRefProps<T> = VirtualizedListProps<T> & {
  mRef?: Ref<VirtualizedListRef<T>>
}

export function VirtualizedList<T>({
  mRef,
  ...props
}: ClickableListWithRefProps<T>) {
  return <VirtualizedListWithRef ref={mRef} {...props} />
}
