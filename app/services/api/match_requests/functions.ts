import { formatSearch } from '../utils'
import { getMatchRequestQueryCols, getMatchRequestsQueryCols } from './entities'
import { GetMatchRequestParams, GetMatchRequestsParams } from './params'

import { supabase } from '@/services/supabase'

export const getMatchRequestFn = (params: GetMatchRequestParams) =>
  supabase
    .from('match_requests')
    .select(getMatchRequestQueryCols)
    .eq('match_id', params.match_id)
    .eq('user_id', params.user_id)
    .limit(1)

export const getMatchRequestsFn = (params: GetMatchRequestsParams) => {
  let query = supabase.from('match_requests').select(getMatchRequestsQueryCols)

  query = query.eq('match_id', params.match_id).eq('status', 'PENDING')

  if (params.search) {
    query = query.or(
      `first_name.ilike.${formatSearch(params.search)}, last_name.ilike.${formatSearch(params.search)}`,
      {
        referencedTable: 'profiles',
      }
    )
  }

  return query.order('created_at', { ascending: true })
}

export const setMatchRequestFn = () => supabase.from('match_requests')
