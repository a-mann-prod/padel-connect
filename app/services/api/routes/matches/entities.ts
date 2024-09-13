import { PostgrestSingleResponse } from '@supabase/supabase-js'

import { ProfileResponse } from '../profiles'

import { Tables } from '@/services/supabase/database.types'

export type DefaultMatchResponse = PostgrestSingleResponse<Tables<'matches'>[]>

export type MatchResponse = Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name' | 'phone_number'> | null
  match_requests: {
    user_id: string
    match_id: number
    is_owner: boolean
    has_payed: boolean
  }[]
}

export type MatchesResponse = (Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Pick<Tables<'complexes'>, 'id' | 'name' | 'phone_number'> | null
  match_requests: {
    user_id: string
    match_id: number
    is_owner: boolean
    has_payed: boolean
    user: Pick<ProfileResponse, 'id' | 'avatar_url'> | null
  }[]
})[]

export type MatchesCountResponse = Pick<Tables<'matches'>, 'id' | 'datetime'>[]

export const getMatchQueryCols =
  'id, complex:complexes(id, name, phone_number), match_requests!inner(match_id, user_id, is_owner, has_payed), datetime, duration, level, is_private, is_competition, updated_at, created_at'

export const getMatchesQueryCols =
  'id, complex:complexes(id, name, phone_number), match_requests!inner(match_id, user_id, is_owner, has_payed, user:profiles(id, avatar_url)), datetime, duration, level, is_private, is_competition, updated_at, created_at'
