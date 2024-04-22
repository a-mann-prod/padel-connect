import { HStack, Heading, Text, VStack } from '@gluestack-ui/themed'

import { Avatar, Icon, Pressable, PressableProps } from '@/designSystem'
import { MatchResponse } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { isNilOrEmpty } from '@/utils/global'

export type MatchlistItemProps = {
  onPress: PressableProps['onPress']
} & MatchResponse

export const MatchListItem = ({
  onPress,
  level,
  booked_url,
  // type,
  datetime,
  complex,
  price,
  duration,
}: MatchlistItemProps) => {
  const tGlobal = useTranslate()

  return (
    <Pressable onPress={onPress}>
      <VStack gap="$8" variant="colored" rounded="$lg" p="$3">
        <HStack alignItems="flex-start">
          <HStack flex={1} gap="$6">
            <DateFlag isoDate={datetime} />
            <VStack flex={1}>
              <Heading size="sm" lineHeight="$xs">
                {complex.name}
              </Heading>
              <Text variant="subtitle">
                {/* {tGlobal(`matchType.${type.toLowerCase()}`)} -{' '} */}
                {tGlobal('level')} {level}
              </Text>
            </VStack>
          </HStack>
          <BookedStatus isBooked={!isNilOrEmpty(booked_url)} />
        </HStack>
        <HStack>
          <HStack flex={1} gap="$4">
            <Avatar
              size="md"
              fallBackIcon="FAS-plus"
              bgColor="$secondary300"
              $dark-bgColor="$secondary400"
            />
            <Avatar
              size="md"
              fallBackIcon="FAS-plus"
              bgColor="$secondary300"
              $dark-bgColor="$secondary400"
            />
            <Avatar
              size="md"
              fallBackIcon="FAS-plus"
              bgColor="$secondary300"
              $dark-bgColor="$secondary400"
            />
            <Avatar
              size="md"
              fallBackIcon="FAS-plus"
              bgColor="$secondary300"
              $dark-bgColor="$secondary400"
            />
          </HStack>
          <PriceFlag price={price} duration={duration} />
        </HStack>
      </VStack>
    </Pressable>
  )
}

type DateFlagProps = {
  isoDate: string
}
const DateFlag = ({ isoDate }: DateFlagProps) => {
  const formattedDate = date.dayjs(isoDate)
  return (
    <VStack
      alignItems="center"
      bgColor="$primary500"
      borderBottomRightRadius="$lg"
      borderTopLeftRadius="$lg"
      m="-$3"
      p="$2"
    >
      <Text color="$white" fontWeight="$bold">
        {formattedDate.format('D')}
      </Text>
      <Text size="sm" color="$white">
        {formattedDate.format('MMM')}
      </Text>
      <Text size="sm" color="$white" fontWeight="$bold">
        {formattedDate.format('HH:mm')}
      </Text>
    </VStack>
  )
}

type PriceFlagProps = {
  price: number
  duration: number
}
const PriceFlag = ({ price, duration }: PriceFlagProps) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      bgColor="$primary500"
      borderBottomRightRadius="$lg"
      borderTopLeftRadius="$lg"
      p="$2"
      m="-$3"
      gap="$0.5"
    >
      <Heading size="sm" color="$white">
        {price} €
      </Heading>
      <Text size="sm" color="$white">
        {duration} mn
      </Text>
    </VStack>
  )
}

type BookedStatusProps = {
  isBooked: boolean
}

const BookedStatus = ({ isBooked }: BookedStatusProps) => {
  const t = useTranslate('play')

  return (
    <HStack gap="$2" alignItems="center">
      {isBooked ? (
        <HStack alignItems="center" gap="$2">
          <Text>{t('booked')}</Text>
          <Icon name="FAS-circle-check" color="$green500" />
        </HStack>
      ) : (
        <Icon name="FAR-circle-check" />
      )}
    </HStack>
  )
}
