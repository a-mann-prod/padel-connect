import { ProfileResponse } from '../profiles'

import { Tables } from '@/services/supabase/database.types'

export type MatchRequestResponse = Pick<Tables<'match_requests'>, 'status'>

export type MatchRequestsResponse = (Tables<'match_requests'> & {
  player: Pick<
    ProfileResponse,
    'id' | 'first_name' | 'last_name' | 'avatar_url'
  > | null
})[]

export const getMatchRequestQueryCols = 'match_id, user_id, status'

export const getMatchRequestsQueryCols =
  'match_id, user_id, player:profiles!inner(id, first_name, last_name, avatar_url, side_preference, manual_preference), status, created_at'
