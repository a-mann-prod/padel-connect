import { HStack, Text, VStack } from '@gluestack-ui/themed'
import { Link, router, useLocalSearchParams } from 'expo-router'

import {
  Button,
  Loader,
  ScrollView,
  Section,
  SectionRow,
  Tile,
} from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useManageMatchRequest } from '@/hooks/useManageMatchRequest'
import { useMe } from '@/hooks/useMe'
import { useProfilesWithAvatar } from '@/hooks/useProfilesWithAvatar'
import { MatchRequestButton, PlayersAvatars } from '@/nodes/play'
import { useMatch } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { isNilOrEmpty } from '@/utils/global'
import { openUrl } from '@/utils/url'
import { getUserName } from '@/utils/user'

export default () => {
  const tGlobal = useTranslate()
  const t = useTranslate('play')

  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { data: me } = useMe()

  const { data: match, isLoading } = useMatch({
    params: { id: matchId },
    options: { enabled: !!local?.match },
  })

  const isOwner = !isLoading && match?.owner_id === me?.id

  const { isPlayer, isRequesting, requestMatch, isRequestMatchLoading } =
    useManageMatchRequest(matchId, !isOwner)

  const isParticipant = isOwner || isPlayer

  useHeaderButton({
    icon: 'FAS-pencil',
    onPress: () => router.navigate(`/(tabs)/play/match/${match?.id}/update`),
    side: 'headerRight',
    condition: isOwner,
  })

  const userIds = match
    ? [match.owner_id, ...(match.players?.map(({ id }) => id) || [])]
    : []

  // TODO profiles seems to be called x times
  const { data } = useProfilesWithAvatar({
    params: { ids: userIds },
    options: { enabled: !!userIds.length },
  })

  const owner = data?.find(({ id }) => id === match?.owner_id)

  if (isLoading) return <Loader />

  if (!match) return

  const matchDatetime = date.dayjs(match.datetime)
  const isBooked = !isNilOrEmpty(match.booked_url)

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
            rightComponent={() => <Text>{match.complex?.name}</Text>}
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
              <Text>{getUserName(owner?.first_name, owner?.last_name)}</Text>
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

        <Section>
          <PlayersAvatars
            size="lg"
            displayName
            data={data}
            orientation="column"
            onPress={(id) =>
              router.navigate(`/(tabs)/play/match/${matchId}/user/${id}`)
            }
          />
        </Section>

        {isOwner && (
          <>
            <Link asChild href={`/(tabs)/play/match/${matchId}/players-manage`}>
              <Button title={t('playersManage')} />
            </Link>

            <Button title="Partager" icon="FAS-share" isDisabled />
          </>
        )}
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
            isDisabled
          />
        ) : (
          <MatchRequestButton
            isRequesting={isRequesting}
            onPress={requestMatch}
            isLoading={isRequestMatchLoading}
          />
        )}
      </VStack>
    </ScrollView>
  )
}
