import { Box, Center, Heading, Text, VStack } from '@gluestack-ui/themed'
import { ReactNode } from 'react'

export type CarouselStepProps = {
  title?: string
  subtitle?: string
  content: ReactNode
  containerProps?: typeof VStack.defaultProps
}

export const CarouselStep = ({
  title,
  subtitle,
  content,
  containerProps,
}: CarouselStepProps) => {
  return (
    <VStack flex={1} {...containerProps}>
      <Box flex={1} gap="$3">
        <Center>
          {title && <Heading size="lg">{title}</Heading>}
          {subtitle && <Text variant="subtitle">{subtitle}</Text>}
        </Center>
        {content}
      </Box>
    </VStack>
  )
}
