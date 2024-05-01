import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

import { ScrollView } from '../Scrollview2/Scrollview2'

export type SheetContainerProps = object

export const SheetContainer = ({
  children,
}: PropsWithChildren<SheetContainerProps>) => {
  return (
    <SafeAreaView borderTopLeftRadius="$3xl" borderTopRightRadius="$3xl">
      <ScrollView alwaysBounceVertical={false}>
        <VStack space="2xl" p="$6">
          {children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
