import { HStack, Text } from '@gluestack-ui/themed'

import { Section, SectionRow } from '@/designSystem'
import { getMatchTimes } from '@/hooks/useManageMatch'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

export type MatchRecapProps = {
  complexName: string
  datetime: string
  duration: number | string
  fieldName: string
}

export const MatchRecap = ({
  complexName,
  datetime,
  duration,
  fieldName,
}: MatchRecapProps) => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')

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
        rightComponent={() => <Text>{fieldName}</Text>}
      />
    </Section>
  )
}
