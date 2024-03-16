import { SafeAreaView, ScrollView, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

export type SheetContainerProps = {}

export const SheetContainer = ({
  children,
}: PropsWithChildren<SheetContainerProps>) => {
  return (
    <SafeAreaView borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <VStack space="2xl" p="$6">
          {children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
