import { Badge, Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'
import { useMemo } from 'react'

import { Pressable, PressableProps, ScrollView } from '@/designSystem'
import { useMatchesCount } from '@/services/api'
import { date } from '@/services/date'
import { isNilOrEmpty } from '@/utils/global'

export type DateCarouselFilterProps = {
  value: Dayjs | undefined
  onChange: (date: Dayjs) => void
}

export const DateCarouselFilter = ({
  value,
  onChange,
}: DateCarouselFilterProps) => {
  const currentDate = useMemo(() => date.now().startOf('day'), [])
  const lastDate = useMemo(
    () => currentDate.add(2, 'week').endOf('day'),
    [currentDate]
  )

  const { data } = useMatchesCount({
    params: {
      dates: { start: currentDate.toISOString(), end: lastDate.toISOString() },
    },
  })

  const dates = date.getDaysBetween(currentDate, lastDate)

  return (
    <Box mt="-$3" flex={1}>
      <ScrollView horizontal>
        <HStack gap="$3" w="$full">
          {dates.map((d) => (
            <DateCarouselItem
              key={d.toISOString()}
              date={d}
              onPress={() => onChange(d)}
              isCurrent={d.isSame(value, 'day')}
              count={
                data?.length
                  ? data.filter(({ datetime }) => d.isSame(datetime, 'day'))
                      .length || undefined
                  : undefined
              }
            />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  )
}

type DateCarouselItemProps = {
  date: Dayjs
  onPress: PressableProps['onPress']
  isCurrent: boolean
  count?: number
}

const DateCarouselItem = ({
  date,
  onPress,
  isCurrent,
  count,
}: DateCarouselItemProps) => {
  const currentContainerProps = isCurrent
    ? {
        bgColor: '$secondary300',
        '$dark-bgColor': '$secondary400',
      }
    : undefined

  const currentTextProps = isCurrent
    ? {
        color: '$white',
      }
    : undefined

  return (
    <Pressable onPress={onPress} position="relative">
      {!isNilOrEmpty(count) && (
        <Badge
          zIndex={1}
          position="absolute"
          top="$1.5"
          right="-$2"
          rounded="$full"
          bgColor="$primary500"
        >
          <Text color="$white">{(count || 0) > 9 ? '9+' : count}</Text>
        </Badge>
      )}
      <VStack
        variant="colored"
        rounded="$lg"
        p="$3"
        mt="$3"
        alignItems="center"
        {...currentContainerProps}
      >
        <Text fontWeight="$bold" {...currentTextProps}>
          {date.format('D')}
        </Text>
        <Text size="sm" fontWeight="$normal" {...currentTextProps}>
          {date.format('MMM')}
        </Text>
      </VStack>
    </Pressable>
  )
}
