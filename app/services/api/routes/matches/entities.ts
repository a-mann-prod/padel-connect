import { PostgrestSingleResponse } from '@supabase/supabase-js'

import { ProfileResponse } from '../profiles'

import { Tables } from '@/services/supabase/database.types'

export type DefaultMatchResponse = PostgrestSingleResponse<Tables<'matches'>[]>

export type MatchResponse = Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name'> | null
  match_requests: { user_id: string; match_id: number }[]
}

export type MatchesResponse = (Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name'> | null
  match_requests: {
    user_id: string
    match_id: number
    user: Pick<ProfileResponse, 'id' | 'avatar_url'> | null
  }[]
  owner: Pick<ProfileResponse, 'id' | 'avatar_url'> | null
})[]

export type MatchesCountResponse = Pick<Tables<'matches'>, 'id' | 'datetime'>[]

export const getMatchQueryCols =
  'id, complex:complexes(id, name), owner_id, match_requests(match_id, user_id), datetime, slot_status, duration, level, is_private, updated_at, created_at'

export const getMatchesQueryCols =
  'id, complex:complexes(id, name), owner_id, owner:profiles!public_matches_owner_id_fkey(id, avatar_url), match_requests(match_id, user_id, user:profiles(id, avatar_url)), datetime, slot_status, duration, level, is_private, updated_at, created_at'
