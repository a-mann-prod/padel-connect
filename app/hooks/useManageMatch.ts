import { date } from '@/services/date'
import { useMe } from './useMe'

import { MatchResponse, useMatch } from '@/services/api'

export const useManageMatch = (matchId: number) => {
  const { data: me } = useMe()

  const {
    data: match,
    isLoading: isLoadingMatch,
    ...rest
  } = useMatch({
    params: { id: matchId },
    options: { enabled: !!matchId },
  })

  const participants = match?.teams.reduce<
    MatchResponse['teams'][number]['participants']
  >((acc, curr) => [...acc, ...curr.participants], [])

  const isOwner = match?.user === me?.id
  const isParticipant = !!participants?.some((p) => p.id === me?.id)
  const isPlayer = isParticipant && !isOwner

  return {
    match,
    participants,

    isMatchPassed: !!(
      match && getMatchTimes(match.datetime, match.duration).isMatchPassed
    ),

    isOwner,
    isPlayer,
    isParticipant,

    isLoading: isLoadingMatch,
    ...rest,
  }
}

export const getMatchTimes = (datetime: string, duration: number) => {
  const matchStartTime = date.dayjs(datetime)
  const matchEndTime = matchStartTime.add(duration, 'm')
  const isMatchPassed = matchEndTime.isBefore(date.now())

  return {
    matchStartTime,
    matchEndTime,
    isMatchPassed,
  }
}
