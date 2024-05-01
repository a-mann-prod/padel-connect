import { Badge, Box, HStack, Text, VStack } from '@gluestack-ui/themed'
import { Dayjs } from 'dayjs'
import { useMemo, useRef, useState } from 'react'

import {
  Icon,
  Pressable,
  PressableProps,
  ScrollView,
  ScrollViewRef,
} from '@/designSystem'
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
  const today = date.now()
  const [startDate, setStartDate] = useState(today)

  const scrollRef = useRef<ScrollViewRef>(null)

  const lastDate = useMemo(
    () => startDate.add(2, 'week').endOf('day'),
    [startDate]
  )

  const { data } = useMatchesCount({
    params: {
      dates: { start: startDate.toISOString(), end: lastDate.toISOString() },
    },
  })

  const days = date.getDaysBetween(startDate, lastDate)
  const isAfterToday = startDate.isAfter(today, 'day')

  return (
    <Box mt="-$3" flex={1}>
      <ScrollView ref={scrollRef} horizontal>
        <HStack gap="$3" w="$full">
          {isAfterToday && (
            <ChevronItem
              type="prev"
              onPress={() => setStartDate((date) => date.add(-1, 'week'))}
            />
          )}
          {days.map((d) => (
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
          <ChevronItem
            type="next"
            onPress={() => {
              setStartDate((date) => date.add(1, 'week'))
              scrollRef.current?.scrollTo({ animated: true, y: 0 })
            }}
          />
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

type ChevronItemProps = {
  onPress: () => void
  type: 'next' | 'prev'
}

const ChevronItem = ({ onPress, type }: ChevronItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <VStack
        flex={1}
        variant="colored"
        rounded="$lg"
        p="$3"
        mt="$3"
        alignItems="center"
        justifyContent="center"
      >
        <Icon
          name={`FAS-circle-chevron-${type === 'next' ? 'right' : 'left'}`}
        />
      </VStack>
    </Pressable>
  )
}
