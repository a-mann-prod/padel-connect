import { Box, Center, Text } from '@gluestack-ui/themed'

export type MatchScoreSetButtonProps = {
  set: string
  tiebreak?: string
  isWinningPoint?: boolean
}

export const MatchScoreSetButton = ({
  set,
  tiebreak,
  isWinningPoint = false,
}: MatchScoreSetButtonProps) => {
  const textProps = isWinningPoint
    ? {
        fontWeight: '$extrabold',
        color: '$primary400',
      }
    : { color: undefined }

  return (
    <Box flex={1} rounded="$lg">
      <Center flex={1}>
        <Text {...textProps} size="2xl">
          {set}
        </Text>
        <Text {...textProps} position="absolute" top="$1" right="$2">
          {tiebreak}
        </Text>
      </Center>
    </Box>
  )
}
