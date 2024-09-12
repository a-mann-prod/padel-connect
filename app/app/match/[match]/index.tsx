import { SafeAreaView, VStack } from '@gluestack-ui/themed'
import * as AuthSession from 'expo-auth-session'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { useState } from 'react'
import { Share } from 'react-native'

import {
  MatchActionButtons,
  MatchInfo,
  MatchRequestButton,
  WithMatch,
} from '@/components'
import { Actionsheet, Loader, ScrollView } from '@/designSystem'
import { useHeaderButton } from '@/hooks/useHeaderButton'
import { getMatchTimes, useManageMatch } from '@/hooks/useManageMatch'
import { useMe } from '@/hooks/useMe'
import { useTranslate } from '@/services/i18n'
import { routing } from '@/services/routing'

export default WithMatch(() => {
  const t = useTranslate('match')

  const { data: me } = useMe()

  const [showRequestActionsheet, setShowRequestActionsheet] = useState(false)

  const pathname = usePathname()
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const {
    match,
    isOwner,
    isRequesting,
    requestMatch,
    isRequestMatchPending,
    cancelRequestMatch,
    isCancelRequestMatchPending,
    isLoading,
    isPlayer,
    payMatch,
    isPayMatchPending,
  } = useManageMatch(matchId)

  const { isMatchPassed } = match
    ? getMatchTimes(match)
    : {
        isMatchPassed: true,
      }

  useHeaderButton(
    [
      {
        icon: 'FAS-share',
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

  const { matchStartTime, matchEndTime } = getMatchTimes(match)

  const hasPayedUserIds =
    match.match_requests
      .filter(({ has_payed }) => !!has_payed)
      .map(({ user_id }) => user_id) || []

  const hasPayed = me?.id ? hasPayedUserIds.includes(me.id) : false

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <VStack p="$3" gap="$3">
            <MatchInfo
              match={match}
              onEmptyPress={() => setShowRequestActionsheet(true)}
              isMatchPassed={isMatchPassed}
              matchStartTime={matchStartTime}
              matchEndTime={matchEndTime}
              hasPayedUserIds={hasPayedUserIds}
              isParticipant={isOwner || isPlayer}
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
