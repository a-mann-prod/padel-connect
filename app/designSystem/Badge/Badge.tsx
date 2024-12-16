import { Box, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'
import { Platform } from 'react-native'

export type BadgeProps = ComponentProps<typeof Box> & {
  text?: string
}

export const Badge = ({ text, ...props }: BadgeProps) => {
  return (
    <Box
      top={2}
      right={Platform.OS === 'ios' ? -10 : 10}
      position="absolute"
      rounded="$full"
      w="$2.5"
      h="$2.5"
      bgColor="$red500"
      {...props}
    >
      {text && <Text>{text}</Text>}
    </Box>
  )
}
