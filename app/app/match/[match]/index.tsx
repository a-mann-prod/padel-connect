import { RefreshControl, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useState } from 'react'

import {
  MatchActionButtons,
  MatchInfo,
  PreMatchRequestButton,
  ShareMatchActionsheet,
  UpdateMatchActionsheet,
  WithMatch,
} from '@/components'
import { Loader, ScrollView } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useManageMatch } from '@/hooks/useManageMatch'
import { useMe } from '@/hooks/useMe'
import {
  MatchInvitationsResponse,
  useDeleteMatchTeam,
  useInfiniteMatchInvitations,
  useMatchTeamRequest,
} from '@/services/api'
import { routing } from '@/services/routing'
import { hasAdaptedLevel } from '@/utils/user'

export default WithMatch(() => {
  const { data: me } = useMe()

  const pathname = usePathname()
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)
  const isJustCreated =
    local?.isJustCreated === 'undefined' ? false : Boolean(local?.isJustCreated)

  const [showUpdateActionsheet, setShowUpdateActionsheet] = useState(false)
  const [showShareActionsheet, setShowShareActionsheet] =
    useState(!!isJustCreated)

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

  const {
    data: matchTeamRequest,
    isLoading: isLoadingMatchTeamRequest,
    refetch: refetchMatchTeamRequest,
  } = useMatchTeamRequest({ params: { id: matchId } })

  const { mutate: deleteMatchTeam, isPending: isPendingDeleteMatchTeam } =
    useDeleteMatchTeam()

  // disabled if match_request (cannot get a team and being invited)
  const {
    data: matchInvitationsPages,
    isLoading: isLoadingMatchInvitations,
    refetch: refetchMatchInvitations,
  } = useInfiniteMatchInvitations({
    params: { matchId },
    options: { enabled: !matchTeamRequest },
  })

  const matchInvitations = matchInvitationsPages?.pages.reduce<
    MatchInvitationsResponse['results']
  >((acc, curr) => [...acc, ...curr.results], [])

  useHeaderButton(
    [
      {
        icon: 'FAS-share',
        onPress: () => setShowShareActionsheet(true),
        condition: !isMatchPassed,
      },
      {
        icon: 'FAS-pencil',
        onPress: () =>
          match?.is_reserved
            ? match?.id &&
              router.navigate(routing.matchUpdateParam.path(match.id))
            : setShowUpdateActionsheet(true),
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

  const inadaptedLevel =
    !match.is_open_to_all_level &&
    !hasAdaptedLevel(me?.calculated_level, match.calculated_level_range)

  return (
    <>
      <SafeAreaView flex={1}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => {
                refetch()
                refetchMatchInvitations()
                refetchMatchTeamRequest()
              }}
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
                onPayButtonPress={() => console.log('pay')}
                isPayButtonLoading={false}
                matchId={matchId}
                isOwner={isOwner}
                isPlayer={isPlayer}
                isReserved={match.is_reserved}
                hasPayed={hasPayed}
                isLeaveButtonLoading={isPendingDeleteMatchTeam}
                onLeaveButtonPress={() =>
                  matchTeamRequest &&
                  deleteMatchTeam({ matchId, id: matchTeamRequest.id })
                }
              />
            )}

            {!isParticipant && (
              <PreMatchRequestButton
                isLoading={
                  isLoadingMatchTeamRequest || isLoadingMatchInvitations
                }
                matchId={matchId}
                isRequesting={!!matchTeamRequest?.id}
                hasMatchInvitations={!!matchInvitations?.length}
                inadaptedLevel={inadaptedLevel}
              />
            )}
          </VStack>
        </ScrollView>
      </SafeAreaView>
      <ShareMatchActionsheet
        matchId={matchId}
        matchPath={pathname}
        isOpen={showShareActionsheet}
        onClose={() => setShowShareActionsheet(false)}
      />
      <UpdateMatchActionsheet
        matchId={matchId}
        matchPath={pathname}
        isOpen={showUpdateActionsheet}
        datetime={match.datetime}
        complexId={match.complex.id}
        onClose={() => setShowUpdateActionsheet(false)}
      />
    </>
  )
})
