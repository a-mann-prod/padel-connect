import { HStack, SafeAreaView, Text, VStack } from '@gluestack-ui/themed'
import * as AuthSession from 'expo-auth-session'
import { Link, router, useLocalSearchParams, usePathname } from 'expo-router'
import { useState } from 'react'
import { Share } from 'react-native'

import { MatchPlayers, MatchRequestButton, WithMatch } from '@/components'
import {
  Actionsheet,
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
import { useMatch } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'
import { isNilOrEmpty } from '@/utils/global'
import { getUsername } from '@/utils/user'

export default WithMatch(() => {
  const tGlobal = useTranslate()
  const t = useTranslate('match')

  const { data: me } = useMe()

  const [showRequestActionsheet, setShowRequestActionsheet] = useState(false)

  const pathname = usePathname()
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { data: match, isLoading: isLoadingMatch } = useMatch({
    params: { id: matchId },
    options: { enabled: !!local?.match, staleTime: 0 },
  })

  const {
    isPlayer,
    isOwner,
    isRequesting,
    requestMatch,
    cancelRequestMatch,
    payMatch,
    isRequestMatchPending,
    isCancelRequestMatchPending,
    isLoading: isLoadingMatchRequest,
  } = useManageMatchRequest(matchId)

  const isParticipant = isOwner || isPlayer

  useHeaderButton(
    [
      {
        icon: 'FAS-share',
        onPress: () =>
          Share.share({
            url: AuthSession.makeRedirectUri({ path: pathname }),
            message: t('shareMessage'),
          }),
        condition: isParticipant,
      },
      {
        icon: 'FAS-pencil',
        onPress: () =>
          match?.id && router.navigate(routing.matchUpdate.path(match?.id)),
        condition: isOwner,
      },
    ],
    'headerRight'
  )

  const userIds = match?.match_requests?.map(({ user_id }) => user_id) || []
  const ownerId = match?.match_requests.find(
    ({ is_owner }) => is_owner
  )?.user_id

  const hasPayedIds =
    match?.match_requests
      .filter(({ has_payed }) => !!has_payed)
      .map(({ user_id }) => user_id) || []

  const hasPayed = me?.id ? hasPayedIds.includes(me.id) : false

  const { data: players } = useProfilesWithAvatar({
    params: { ids: userIds },
    options: { enabled: !!userIds.length },
  })

  const owner = players?.find(({ id }) => id === ownerId)

  const sortedPlayers = players?.sort(
    (a, b) => userIds.indexOf(a.id || '') - userIds.indexOf(b.id || '')
  )

  if (isLoadingMatch || isLoadingMatchRequest) return <Loader />

  if (!match) return

  const matchStartTime = date.dayjs(match.datetime)
  const matchEndTime = matchStartTime.add(match.duration, 'm')
  const isBooked = !isNilOrEmpty(match.slot_status === 'BOOKED')

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <VStack p="$3" gap="$3">
            {match.is_private && (
              <Tile
                title={t('privateMatch')}
                bgColor="$primary500"
                icon="FAS-lock"
              />
            )}
            <Section>
              <SectionRow
                title={tGlobal('location')}
                icon="FAS-location-dot"
                rightComponent={() => <Text>{match.complex?.name}</Text>}
              />
              <SectionRow
                title={tGlobal('location')}
                icon="FAR-calendar"
                rightComponent={() => (
                  <Text>{date.format(match.datetime)}</Text>
                )}
              />
              <SectionRow
                title={t('duration')}
                icon="FAR-clock"
                rightComponent={() => (
                  <HStack gap="$1">
                    <Text>{matchStartTime.format('HH:mm')}</Text>
                    <Text>-</Text>
                    <Text>{matchEndTime.format('HH:mm')}</Text>
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
                    {getUsername(owner?.first_name, owner?.last_name)}
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

            <Section>
              <MatchPlayers
                size="lg"
                data={sortedPlayers}
                onPress={(id) =>
                  router.navigate(routing.matchUser.path(matchId, id))
                }
                onEmptyPress={() =>
                  !isParticipant && setShowRequestActionsheet(true)
                }
                displayTeam={!!match.is_competition}
                hasPayedIds={hasPayedIds}
              />
            </Section>

            {isParticipant && !hasPayed && (
              <Button
                title={t('pay')}
                icon="FAS-money-bill"
                iconRight
                bgColor="$green500"
                onPress={payMatch}
              />
            )}

            {isOwner && (
              <Link asChild href={routing.matchPlayersManage.path(matchId)}>
                <Button title={t('playersManage')} />
              </Link>
            )}
            {isParticipant && (
              <>
                <Button
                  title={t('chat')}
                  icon="FAS-message"
                  iconRight
                  bgColor="$yellow500"
                  onPress={() =>
                    router.navigate(routing.matchChat.path(matchId))
                  }
                />
                {/* <Button
                title={t('enterScore')}
                icon="FAS-award"
                iconRight
                // onPress={cancelRequestMatch}
                // isLoading={isCancelRequestMatchPending}
              /> */}
              </>
            )}
            {isPlayer && (
              <Button
                title={t('leave')}
                action="negative"
                icon="FAS-person-walking-arrow-right"
                iconRight
                onPress={cancelRequestMatch}
                isLoading={isCancelRequestMatchPending}
              />
            )}
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <Actionsheet
        isOpen={showRequestActionsheet}
        onClose={() => setShowRequestActionsheet(false)}
      >
        <VStack gap="$3" p="$2">
          <MatchRequestButton
            isRequesting={isRequesting}
            onPress={requestMatch}
            isLoading={isRequestMatchPending || isCancelRequestMatchPending}
            onCancelPress={cancelRequestMatch}
          />
        </VStack>
      </Actionsheet>
    </>
  )
})
