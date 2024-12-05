import { RefreshControl, SafeAreaView, VStack } from '@gluestack-ui/themed'
import * as AuthSession from 'expo-auth-session'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { Share } from 'react-native'

import {
  MatchActionButtons,
  MatchInfo,
  PreMatchRequestButton,
  WithMatch,
} from '@/components'
import { Loader, ScrollView } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { useManageMatch } from '@/hooks/useManageMatch'
import { useMe } from '@/hooks/useMe'
import { useMatchTeamRequest } from '@/services/api'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithMatch(() => {
  const t = useTranslate('match')

  const { data: me } = useMe()

  const pathname = usePathname()
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const {
    match,
    isOwner,
    isRequesting,
    cancelRequestMatch,
    isCancelRequestMatchPending,
    isLoading,
    isPlayer,
    payMatch,
    isPayMatchPending,
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
        onPress: () =>
          match?.id && router.navigate(routing.matchShareMatch.path(match.id)),
        condition: false && !isMatchPassed,
      },
      {
        icon: 'FAS-share-from-square',
        onPress: () =>
          Share.share({
            url: AuthSession.makeRedirectUri({ path: pathname }),
            message: t('shareMessage'),
          }),
        condition: !isMatchPassed,
      },
      {
        icon: 'FAS-pencil',
        onPress: () =>
          match?.id && router.navigate(routing.matchUpdate.path(match?.id)),
        condition: isOwner && !isMatchPassed,
      },
    ],
    'headerRight'
  )

  if (isLoading) return <Loader />

  if (!match) return

  // TODO A revoir
  const hasPayedUserIds = [] as number[]
  // match.match_requests
  //   .filter(({ has_payed }) => !!has_payed)
  //   .map(({ user_id }) => user_id) || []

  const hasPayed = me?.id ? hasPayedUserIds.includes(me.id) : false
  const isParticipant = isOwner || isPlayer

  return (
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
            isMatchPassed={isMatchPassed}
            hasPayedUserIds={hasPayedUserIds}
          />
          {!isMatchPassed && (
            <MatchActionButtons
              matchId={matchId}
              hasPayed={hasPayed}
              isOwner={isOwner}
              isPlayer={isPlayer}
              onLeaveButtonPress={cancelRequestMatch}
              isLeaveButtonLoading={isCancelRequestMatchPending}
              onPayButtonPress={payMatch}
              isPayButtonLoading={isPayMatchPending}
              isReserved={match.is_reserved}
            />
          )}

          {!isParticipant && (
            <PreMatchRequestButton
              isLoading={isLoadingMatchTeamRequest}
              matchId={matchId}
              isRequesting={!!matchTeamRequest?.id}
            />
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
})
