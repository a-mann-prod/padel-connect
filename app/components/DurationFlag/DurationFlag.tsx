import { Heading, VStack } from '@gluestack-ui/themed'

export type DurationFlagProps = {
  value: number
  isRequest?: boolean
}

export const DurationFlag = ({
  value,
  isRequest,
  ...props
}: DurationFlagProps) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      bgColor="$primary500"
      borderBottomRightRadius={isRequest ? '$none' : '$lg'}
      borderTopLeftRadius="$lg"
      p="$2"
      m="-$3"
      gap="$0.5"
      {...props}
    >
      <Heading size="sm" color="$white">
        {value} mn
      </Heading>
    </VStack>
  )
}
