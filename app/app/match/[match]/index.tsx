import { routing } from '@/services/routing'
import { RefreshControl, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useState } from 'react'

import {
  MatchActionButtons,
  MatchInfo,
  PreMatchRequestButton,
  ShareMatchActionsheet,
  WithMatch,
} from '@/components'
import { Loader, ScrollView } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useManageMatch } from '@/hooks/useManageMatch'
import { useMe } from '@/hooks/useMe'
import { useMatchTeamRequest } from '@/services/api'
import { useTranslate } from '@/services/i18n'

export default WithMatch(() => {
  const t = useTranslate('match')

  const { data: me } = useMe()

  const pathname = usePathname()
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)
  const isJustCreated =
    local?.isJustCreated === 'undefined' ? false : Boolean(local?.isJustCreated)

  const [showActionsheet, setShowActionsheet] = useState(!!isJustCreated)

  const {
    match,
    participants,
    isOwner,
    isParticipant,
    isLoading,
    isPlayer,
    refetch,
    isRefetching,
    isMatchPassed,
  } = useManageMatch(matchId)

  const { data: matchTeamRequest, isLoading: isLoadingMatchTeamRequest } =
    useMatchTeamRequest({ params: { id: matchId } })

  useHeaderButton(
    [
      {
        icon: 'FAS-share',
        onPress: () => setShowActionsheet(true),
        condition: !isMatchPassed,
      },
      {
        icon: 'FAS-pencil',
        onPress: () =>
          match?.id && router.navigate(routing.matchUpdate.path(match.id)),
        condition: isOwner && !isMatchPassed,
      },
    ],
    'headerRight'
  )

  if (isLoading) return <Loader />

  if (!match) return

  // TODO A revoir
  const hasPayed = false
  const hasPayedUserIds = [] as number[]
  // match.match_requests
  //   .filter(({ has_payed }) => !!has_payed)
  //   .map(({ user_id }) => user_id) || []

  const [level_min, level_max] = match.calculated_level_range
  const inadaptedLevel = !me?.calculated_level
    ? true
    : !match.is_open_to_all_level &&
      (me.calculated_level < level_min || me.calculated_level > level_max)

  return (
    <>
      <SafeAreaView flex={1}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
            />
          }
        >
          <VStack p="$3" gap="$3">
            <MatchInfo
              match={match}
              participants={participants}
              isMatchPassed={isMatchPassed}
              hasPayedUserIds={hasPayedUserIds}
            />
            {!isMatchPassed && (
              <MatchActionButtons
                matchId={matchId}
                isOwner={isOwner}
                isPlayer={isPlayer}
                isReserved={match.is_reserved}
                hasPayed={hasPayed}
              />
            )}

            {!isParticipant && (
              <PreMatchRequestButton
                isLoading={isLoadingMatchTeamRequest}
                matchId={matchId}
                isRequesting={!!matchTeamRequest?.id}
                inadaptedLevel={inadaptedLevel}
              />
            )}
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <ShareMatchActionsheet
        matchId={matchId}
        matchPath={pathname}
        isOpen={showActionsheet}
        onButtonPress={() => {
          setShowActionsheet(false)
        }}
        onClose={() => setShowActionsheet(false)}
      />
    </>
  )
})
