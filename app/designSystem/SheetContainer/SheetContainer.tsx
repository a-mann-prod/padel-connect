import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

import { ScrollView } from '../ScrollView/ScrollView'

export type SheetContainerProps = object

export const SheetContainer = ({
  children,
}: PropsWithChildren<SheetContainerProps>) => {
  return (
    <SafeAreaView
      variant="colored"
      borderTopLeftRadius="$3xl"
      borderTopRightRadius="$3xl"
    >
      <ScrollView alwaysBounceVertical={false}>
        <VStack space="2xl" p="$6">
          {children}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}
