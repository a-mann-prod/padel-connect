import { Tables } from '@/services/supabase/database.types'

export type MatchResponse = Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name'> | null
  players: { id: string }[]
}

export type MatchesResponse = (Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name'> | null
  players: { id: string }[]
})[]

export type MatchesCountResponse = Pick<Tables<'matches'>, 'id' | 'datetime'>[]

export const getMatchQueryCols =
  'id, complex:complexes (id, name), owner_id, players:match_requests!left(id:user_id), datetime, booked_url, duration, level, updated_at, created_at'

export const getMatchesQueryCols =
  'id, complex:complexes (id, name), owner_id, players:match_requests!left(id:user_id), datetime, booked_url, duration, level, updated_at, created_at'
