import { MatchType } from '../../../types'

export type GetMatchParams = {
  id: number
}

export type GetInfiniteMatchesParams = {
  min_level?: number
  max_level?: number

  start_datetime?: string
  end_datetime?: string

  reserved?: boolean
  complex?: number
  type?: MatchType
}

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
  datetime: string
  duration: number
  is_private: boolean
  level: number
  type: MatchType
}

export type UpdateMatchParams = CreateMatchParams & {
  id: number
}

export type DeleteMatchParams = {
  id: number
}
