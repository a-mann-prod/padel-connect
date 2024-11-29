import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<
  PropsWithChildren<typeof VStack.defaultProps>
>

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <SafeAreaView flex={1}>
      <VStack flex={1} gap="$3" m="$3" {...props}>
        {children}
      </VStack>
    </SafeAreaView>
  )
}
