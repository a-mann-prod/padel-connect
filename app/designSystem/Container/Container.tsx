import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<object>

export const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} gap="$3" m="$3">
        {children}
      </VStack>
    </SafeAreaView>
  )
}
