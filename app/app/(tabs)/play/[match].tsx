import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { useLocalSearchParams } from 'expo-router'

import {
  Button,
  Loader,
  ScrollView,
  Section,
  SectionRow,
  Tile,
} from '@/designSystem'
import { useMe } from '@/hooks/useMe'
import { useMatch } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { isNilOrEmpty } from '@/utils/global'
import { openUrl } from '@/utils/url'
import { getUserName } from '@/utils/user'

export default () => {
  const { data: me } = useMe()

  const tGlobal = useTranslate()
  const t = useTranslate('play')

  const local = useLocalSearchParams()

  const { data: match, isLoading } = useMatch({
    params: { id: local?.match as unknown as number },
    options: { enabled: !!local?.match },
  })

  if (isLoading) return <Loader />

  if (!match) return

  const matchDatetime = date.dayjs(match.datetime)
  const isBooked = !isNilOrEmpty(match.booked_url)

  // participants
  const isOwner = match.owner.id === me?.id
  const isPlayer = false
  const isParticipant = isOwner || isPlayer

  return (
    <ScrollView>
      <VStack p="$3" gap="$3">
        {isBooked && (
          <Tile
            title={t('booked')}
            bgColor="$green500"
            icon="FAS-check"
            iconRight
          />
        )}
        <Section>
          <SectionRow
            title={t('complex')}
            icon="FAS-location-dot"
            rightComponent={() => <Text>{match.complex.name}</Text>}
          />
          <SectionRow
            title={t('date')}
            icon="FAR-calendar"
            rightComponent={() => <Text>{date.format(match.datetime)}</Text>}
          />
          <SectionRow
            title={t('duration')}
            icon="FAR-clock"
            rightComponent={() => (
              <HStack gap="$1">
                <Text>{matchDatetime.format('HH:mm')}</Text>
                <Text>-</Text>
                <Text>
                  {matchDatetime.add(match.duration, 'm').format('HH:mm')}
                </Text>
                <Text>
                  ({tGlobal('datetime.minute', { count: match.duration })})
                </Text>
              </HStack>
            )}
          />
        </Section>

        <Section>
          <SectionRow
            title={tGlobal('captain')}
            icon="FAS-crown"
            rightComponent={() => (
              <Text>
                {isOwner
                  ? tGlobal('me')
                  : getUserName(match.owner.first_name, match.owner.last_name)}
              </Text>
            )}
          />
          <SectionRow
            title={tGlobal('level')}
            icon="FAS-dumbbell"
            rightComponent={() => (
              <Text>
                {tGlobal('level')} {match.level}
              </Text>
            )}
          />
        </Section>

        {isOwner && <Button title="Partager" icon="FAS-share" />}
        {isPlayer && (
          <Button
            title={t('pay')}
            icon="FAS-money-bill"
            iconRight
            onPress={() => match.booked_url && openUrl(match.booked_url)}
            isDisabled={!isBooked}
          />
        )}

        {isParticipant ? (
          <Button
            title={t('leave')}
            action="negative"
            icon="FAS-person-walking-arrow-right"
            iconRight
          />
        ) : (
          <Button title="Join request" icon="FAS-handshake" />
        )}
      </VStack>
    </ScrollView>
  )
}
