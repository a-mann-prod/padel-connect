import { Divider as GDivider, HStack, Text } from '@gluestack-ui/themed'

export type DividerProps = {
  title?: string
} & typeof GDivider.defaultProps

export const Divider = ({ title, ...props }: DividerProps) => {
  if (!title) return <GDivider {...props} />

  return (
    <HStack justifyContent="center" alignItems="center">
      <GDivider w="auto" flex={1} />
      <Text
        $light-color="$backgroundLight400"
        $dark-color="$backgroundLight600"
        mx="$3"
      >
        {title}
      </Text>
      <GDivider w="auto" flex={1} />
    </HStack>
  )
}
