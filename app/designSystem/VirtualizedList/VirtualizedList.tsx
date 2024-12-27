import { Box } from '@gluestack-ui/themed'
import { ForwardedRef, PropsWithoutRef, Ref, forwardRef } from 'react'
import {
  VirtualizedList as RNVirtualizedList,
  VirtualizedListProps as RNVirtualizedListProps,
} from 'react-native'

import { ListEmpty } from '../ListEmpty/ListEmpty'
import { Loader } from '../Loader/Loader'

export type VirtualizedListProps<T> = RNVirtualizedListProps<T> & {
  isLoading?: boolean
  isLoadingNext?: boolean
}

export type VirtualizedListRef<T> = RNVirtualizedList<T>

const VirtualizedListInner = <T,>(
  { isLoading, isLoadingNext, data, ...props }: VirtualizedListProps<T>,
  ref: ForwardedRef<VirtualizedListRef<T>>
) => {
  const ItemSeparatorComponent = () => <Box pt="$3" />

  const ListEmptyComponent = () => {
    if (data) {
      return <ListEmpty inverted={props.inverted} />
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

function fixedForwardRef<T, P extends PropsWithoutRef<any>>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  return forwardRef(render) as any
}

const VirtualizedListWithRef = fixedForwardRef(VirtualizedListInner)

type ClickableListWithRefProps<T> = VirtualizedListProps<T> & {
  mRef?: Ref<VirtualizedListRef<T>>
}

export function VirtualizedList<T>({
  mRef,
  ...props
}: ClickableListWithRefProps<T>) {
  return <VirtualizedListWithRef ref={mRef} {...props} />
}
