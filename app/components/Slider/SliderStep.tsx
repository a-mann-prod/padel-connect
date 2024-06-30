import { Box, Center, Heading, Text, VStack } from '@gluestack-ui/themed'
import { ReactNode } from 'react'

export type SliderStepProps = {
  title: string
  subtitle?: string
  content: ReactNode
  containerProps?: typeof VStack.defaultProps
}

export const SliderStep = ({
  title,
  subtitle,
  content,
  containerProps,
}: SliderStepProps) => {
  return (
    <VStack {...containerProps}>
      <Box pt="$3">
        <Center>
          <Heading size="lg">{title}</Heading>
          {subtitle && <Text variant="subtitle">{subtitle}</Text>}
        </Center>
        {content}
      </Box>
    </VStack>
  )
}
