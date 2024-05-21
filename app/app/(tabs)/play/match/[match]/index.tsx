import { HStack, RefreshControl, Text, VStack } from '@gluestack-ui/themed'
import * as AuthSession from 'expo-auth-session'
import { Link, router, useLocalSearchParams, usePathname } from 'expo-router'
import { Share } from 'react-native'

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
import { getUsername } from '@/utils/user'

export default () => {
  const tGlobal = useTranslate()
  const t = useTranslate('play')

  const pathname = usePathname()
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { data: me } = useMe()

  const {
    data: match,
    isLoading,
    refetch,
    isRefetching,
  } = useMatch({
    params: { id: matchId },
    options: { enabled: !!local?.match },
  })

  const isOwner = !isLoading && match?.owner_id === me?.id

  const {
    isPlayer,
    isRequesting,
    requestMatch,
    cancelRequestMatch,
    isRequestMatchPending,
    isCancelRequestMatchPending,
  } = useManageMatchRequest(matchId, !isOwner)

  const isParticipant = isOwner || isPlayer

  useHeaderButton({
    icon: 'FAS-pencil',
    onPress: () => router.navigate(`/(tabs)/play/match/${match?.id}/update`),
    side: 'headerRight',
    condition: isOwner,
  })

  const userIds = match
    ? [
        match.owner_id,
        ...(match.match_requests?.map(({ user_id }) => user_id) || []),
      ]
    : []

  const { data: players } = useProfilesWithAvatar({
    params: { ids: userIds },
    options: { enabled: !!userIds.length },
  })

  const owner = players?.find(({ id }) => id === match?.owner_id)

  const sortedPlayers = players?.sort(
    (a, b) => userIds.indexOf(a.id || '') - userIds.indexOf(b.id || '')
  )

  if (isLoading) return <Loader />

  if (!match) return

  const matchDatetime = date.dayjs(match.datetime)
  const isBooked = !isNilOrEmpty(match.booked_url)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
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
              <Text>{getUsername(owner?.first_name, owner?.last_name)}</Text>
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
            data={sortedPlayers}
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

            <Button
              title="Partager"
              icon="FAS-share"
              isDisabled
              onPress={() =>
                Share.share({
                  url: AuthSession.makeRedirectUri({ path: pathname }),
                  message:
                    "Hey je viens de créer un match, si t'es dispo tu peux venir le rejoindre en cliquant sur le lien",
                })
              }
            />
          </>
        )}
        {isPlayer && (
          <>
            <Button
              title={t('pay')}
              icon="FAS-money-bill"
              iconRight
              onPress={() => match.booked_url && openUrl(match.booked_url)}
              isDisabled={!isBooked}
            />
            <Button
              title={t('leave')}
              action="negative"
              icon="FAS-person-walking-arrow-right"
              iconRight
              onPress={cancelRequestMatch}
              isLoading={isCancelRequestMatchPending}
            />
          </>
        )}
        {isParticipant && (
          <Button
            title="Chat"
            icon="FAS-message"
            iconRight
            action="positive"
            onPress={() =>
              router.navigate(`/(tabs)/play/match/${matchId}/chat`)
            }
          />
        )}

        {!isParticipant && (
          <MatchRequestButton
            isRequesting={isRequesting}
            onPress={requestMatch}
            isLoading={isRequestMatchPending || isCancelRequestMatchPending}
            onCancelPress={cancelRequestMatch}
          />
        )}
      </VStack>
    </ScrollView>
  )
}
