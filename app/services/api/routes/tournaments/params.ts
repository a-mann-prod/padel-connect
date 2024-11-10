import { MatchType } from '../../types'

export type GetTournamentParams = {
  id: number
}

export type GetInfiniteTournamentsParams = {
  type?: MatchType
  complex?: number
  month?: string
}
