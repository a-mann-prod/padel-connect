import { RefreshControl, SafeAreaView, VStack } from '@gluestack-ui/themed'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useState } from 'react'

import {
  MatchActionButtons,
  MatchInfo,
  MatchPlayers,
  MatchTiles,
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
  useBooking,
  useBookingFields,
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

  const { data: bookingFields, isLoading: isLoadingBookingFields } =
    useBookingFields({
      params: {
        complex: match?.complex.id as number,
        date: match?.datetime.substring(0, 10) as string,
      },
      options: { enabled: !!match && !!me },
    })

  const { data: booking, isLoading: isLoadingBooking } = useBooking({
    params: { id: match?.four_padel_booking_id as number },
    options: { enabled: !!match?.four_padel_booking_id && !!me },
  })

  const isFieldAvailable =
    !isLoadingBookingFields && bookingFields
      ? bookingFields.some(({ fields }) =>
          fields.some(({ id }) => id === match?.four_padel_field_id)
        )
      : undefined

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
          match?.is_booked
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

  const inadaptedLevel = me
    ? !match.is_open_to_all_level &&
      !hasAdaptedLevel(me.calculated_level, match.calculated_level_range)
    : undefined

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
            <MatchTiles
              isPast={isMatchPassed}
              isPrivate={match.is_private}
              isCompetitive={match.is_competitive}
            />
            <MatchInfo
              complexName={match.complex.name}
              datetime={match.datetime}
              duration={match.duration}
              fieldName={match.four_padel_field_name}
              isOpenToAll={match.is_open_to_all_level}
              levelRange={match.calculated_level_range}
              owner={participants?.find((p) => p.id === match.user)}
              isBooked={match.is_booked}
              isFieldAvailable={isFieldAvailable}
            />
            <MatchPlayers
              participants={participants}
              hasPayedUserIds={booking?.participations.map(({ user }) => user)}
              onPress={(id) =>
                router.navigate(routing.matchUser.path(match.id, id))
              }
              isCompetitive={match.is_competitive}
              isMatchPast={isMatchPassed}
            />
            {!isMatchPassed && (
              <MatchActionButtons
                matchId={matchId}
                booking={booking}
                isLoadingBooking={isLoadingBooking}
                isOwner={isOwner}
                isPlayer={isPlayer}
                isFieldAvailable={isFieldAvailable}
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
