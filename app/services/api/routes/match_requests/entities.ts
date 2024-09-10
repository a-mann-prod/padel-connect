import { ProfileResponse } from '../profiles'

import { Tables } from '@/services/supabase/database.types'

export type MatchRequestResponse = Pick<
  Tables<'match_requests'>,
  'is_owner' | 'status' | 'match_id' | 'user_id' | 'has_payed'
>

export type MatchRequestsResponse = (Tables<'match_requests'> & {
  player: Pick<
    ProfileResponse,
    'id' | 'first_name' | 'last_name' | 'avatar_url'
  > | null
})[]

export const getMatchRequestQueryCols =
  'match_id, user_id, status, is_owner, has_payed'

export const getMatchRequestsQueryCols =
  'match_id, user_id, player:profiles!inner(id, first_name, last_name, avatar_url, side_preference, manual_preference), is_owner, status, has_payed, is_guest, created_at'
