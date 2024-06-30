import { HStack, useColorMode } from '@gluestack-ui/themed'

import { Icon } from '../Icon/Icon'

import { iterate } from '@/utils/array'

export type DotsProps = {
  index: number
  total: number
}
export const Dots = ({ index, total }: DotsProps) => {
  const colorMode = useColorMode()

  return (
    <HStack
      // flex={1}
      space="md"
      // right={0}
      // left={0}
      // position="absolute"
      alignItems="center"
      justifyContent="center"
      // bottom={3}
    >
      {iterate(total).map((key) => (
        <Icon
          size="2xs"
          key={key}
          name="FAS-circle"
          color={index === key ? '$primary500' : `${colorMode}300`}
        />
      ))}
    </HStack>
  )
}
