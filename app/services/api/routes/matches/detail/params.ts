import { MatchType } from '../../../types'

export type GetMatchParams = {
  id: number
}

export type GetInfiniteMatchesParams = {
  level_min?: number
  level_max?: number

  start_datetime?: string
  end_datetime?: string

  reserved?: boolean
  complex?: number
  type?: MatchType
}

export type GetInfiniteMatchesInvitationsParams = object

export type GetInfiniteIncomingMatchesParams = object

export type GetUserMatchesParams = {
  user_id: string
  dates?: {
    start?: string
    end?: string
  }
}

export type GetMatchesCountParams = {
  dates: {
    start: string
    end: string
  }
}

export type CreateMatchParams = {
  complex_id: number
  four_padel_field_id: number
  four_padel_field_name: string
  datetime: string
  duration: number
  is_private: boolean
  level: number
  is_competitive: boolean
  players?: number[]
  is_super_tie_break?: boolean
  is_decisive_point?: boolean
}

export type UpdateMatchParams = CreateMatchParams & {
  id: number
}

export type DeleteMatchParams = {
  id: number
}
