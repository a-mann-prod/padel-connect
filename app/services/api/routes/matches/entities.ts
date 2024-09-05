import { PostgrestSingleResponse } from '@supabase/supabase-js'

import { ProfileResponse } from '../profiles'

import { Tables } from '@/services/supabase/database.types'

export type DefaultMatchResponse = PostgrestSingleResponse<Tables<'matches'>[]>

export type MatchResponse = Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name'> | null
  match_requests: { user_id: string; match_id: number; is_owner: boolean }[]
}

export type MatchesResponse = (Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name'> | null
  match_requests: {
    user_id: string
    match_id: number
    is_owner: boolean
    user: Pick<ProfileResponse, 'id' | 'avatar_url'> | null
  }[]
})[]

export type MatchesCountResponse = Pick<Tables<'matches'>, 'id' | 'datetime'>[]

export const getMatchQueryCols =
  'id, complex:complexes(id, name), match_requests!inner(match_id, user_id, is_owner), datetime, slot_status, duration, level, is_private, is_competition, updated_at, created_at'

export const getMatchesQueryCols =
  'id, complex:complexes(id, name), match_requests!inner(match_id, user_id, is_owner, user:profiles(id, avatar_url)), datetime, slot_status, duration, level, is_private, is_competition, updated_at, created_at'
