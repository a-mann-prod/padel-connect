import { useLocalSearchParams } from 'expo-router'
import { FC } from 'react'

import { Loader } from '@/designSystem'
import { ListEmpty } from '@/designSystem/ListEmpty/ListEmpty'
import { useManageMatch } from '@/hooks/useManageMatch'
import { useTranslate } from '@/services/i18n'

const WithMatchWrapper: FC<{ Component: FC }> = ({ Component }) => {
  const local = useLocalSearchParams()
  const matchId = Number(local?.match)

  const { match, isParticipant, isLoading, isMatchPassed } =
    useManageMatch(matchId)

  if (isLoading) return <Loader />

  if (!match) return <MatchNotFound />

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
