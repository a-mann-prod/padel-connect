import { useLocalSearchParams } from 'expo-router'
import { FC } from 'react'

import { Loader } from '@/designSystem'
import { ListEmpty } from '@/designSystem/ListEmpty/ListEmpty'
import { useManageMatchRequest } from '@/hooks/useManageMatchRequest'
import { useMatch } from '@/services/api'
import { date } from '@/services/date'
import { useTranslate } from '@/services/i18n'

const WithMatchWrapper: FC<{ Component: FC }> = ({ Component }) => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { data: match, isLoading } = useMatch({
    params: { id: matchId },
    options: { enabled: !!local?.match },
  })

  const { isPlayer, isOwner } = useManageMatchRequest(matchId)

  const isParticipant = isOwner || isPlayer

  if (isLoading) return <Loader />

  if (!match) return <MatchNotFound />

  const isMatchPassed = date
    .dayjs(match.datetime)
    .add(match.duration, 'm')
    .isBefore(date.now())

  if (isMatchPassed && !isParticipant) return <MatchNotFound />

  return <Component />
}

export const WithMatch = (Component: FC) => () => (
  <WithMatchWrapper Component={Component} />
)

const MatchNotFound = () => {
  const t = useTranslate('match')

  return <ListEmpty title={t('matchNotFound')} />
}
