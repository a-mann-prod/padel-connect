import { HStack, Text } from '@gluestack-ui/themed'

import { Section, SectionRow } from '@/designSystem'
import { getMatchTimes } from '@/hooks/useManageMatch'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { isNilOrEmpty } from '@/utils/global'

enum BookingStatus {
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  NOT_BOOKED = 'NOT_BOOKED',
  BOOKED = 'BOOKED',
}

const mapBookingStatusToColor: Record<BookingStatus, string | undefined> = {
  NOT_AVAILABLE: '$red500',
  NOT_BOOKED: undefined,
  BOOKED: '$green500',
}

export type MatchRecapProps = {
  complexName: string
  datetime: string
  duration: number | string
  fieldName: string
  isBooked?: boolean
  isBookingAvailable?: boolean
}

export const MatchRecap = ({
  complexName,
  datetime,
  duration,
  fieldName,
  isBooked,
  isBookingAvailable,
}: MatchRecapProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')

  const mapBookingStatusToText: Record<BookingStatus, string | undefined> = {
    NOT_AVAILABLE: ` ${t('notAvailable')}`,
    NOT_BOOKED: ` ${t('notBooked')}`,
    BOOKED: undefined,
  }

  const getBookingStatus = () => {
    if (!isBookingAvailable) return BookingStatus.NOT_AVAILABLE
    if (!isNilOrEmpty(isBooked) && !isBooked) return BookingStatus.NOT_BOOKED

    return BookingStatus.BOOKED
  }

  const duration_nb = typeof duration === 'string' ? Number(duration) : duration

  const { matchStartTime, matchEndTime } = getMatchTimes(datetime, duration_nb)

  return (
    <Section>
      <SectionRow
        title={tGlobal('location')}
        icon="FAS-location-dot"
        rightComponent={() => <Text>{complexName}</Text>}
      />
      <SectionRow
        title={tGlobal('date')}
        icon="FAR-calendar"
        rightComponent={() => <Text>{date.format(datetime)}</Text>}
      />
      <SectionRow
        title={t('duration')}
        icon="FAR-clock"
        rightComponent={() => (
          <HStack gap="$1">
            <Text>{matchStartTime.format('HH:mm')}</Text>
            <Text>-</Text>
            <Text>{matchEndTime.format('HH:mm')}</Text>
            <Text>({tGlobal('datetime.minute', { count: duration_nb })})</Text>
          </HStack>
        )}
      />
      <SectionRow
        title={t('field')}
        icon="FAR-square-minus"
        rightComponent={() => (
          <Text color={mapBookingStatusToColor[getBookingStatus()]}>
            {fieldName}
            {mapBookingStatusToText[getBookingStatus()]}
          </Text>
        )}
      />
    </Section>
  )
}
