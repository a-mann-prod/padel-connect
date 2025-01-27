import { date } from '@/services/date'
import { useMe } from './useMe'

import { useMatch } from '@/services/api'

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

  const participants = [
    ...(match?.team_1_users || []),
    ...(match?.team_2_users || []),
  ]

  const isOwner = match?.user === me?.id
  const isParticipant = !!participants?.some((p) => p.id === me?.id)
  const isPlayer = isParticipant && !isOwner

  return {
    match,
    participants,

    isMatchPassed: !!(
      match && getMatchTimes(match.datetime, match.duration).isMatchPassed
    ),
    isMatchStarted: !!(
      match && getMatchTimes(match.datetime, match.duration).isMatchStarted
    ),
    isMatchComplete:
      !!match && [...match.team_1_users, ...match.team_2_users].length > 3,

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
  const isMatchStarted = matchStartTime.isBefore(date.now())

  return {
    matchStartTime,
    matchEndTime,
    isMatchPassed,
    isMatchStarted,
  }
}
