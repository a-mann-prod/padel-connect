import { Sex } from '../../types'

export type TournamentResponse = {
  id: number
  name: string
  startingDate: string
  endingDate: string
  competitionLevel: string
  isCompetitive: boolean
  sex: Sex
  complexName: string
  remainingPlaces: number
}

export type TournamentsResponse = TournamentResponse[]
