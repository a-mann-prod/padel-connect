import { isNilOrEmpty } from '@/utils/global'
import { getMatchQueryCols, getMatchesQueryCols } from './entities'
import {
  GetMatchParams,
  GetMatchesCountParams,
  GetMatchesParams,
} from './params'

import { supabase } from '@/services/supabase'

export const getMatchFn = (params: GetMatchParams) =>
  supabase
    .from('matches')
    .select(getMatchQueryCols)
    .eq('match_requests.status', 'ACCEPTED')
    .eq('id', params.id)
    .single()

export const getMatchesFn = (params: GetMatchesParams) => {
  let query = supabase
    .from('matches')
    .select(getMatchesQueryCols)
    .eq('match_requests.status', 'ACCEPTED')

  query = query.gte('datetime', params.dates.start)

  if (params.dates.end) {
    query = query.lte('datetime', params.dates.end)
  }

  if (params.level) {
    if (params.level.min) {
      query = query.gte('level', params.level.min)
    }
    if (params.level.min) {
      query = query.lte('level', params.level.max)
    }
  }

  if (!isNilOrEmpty(params.reserved)) {
    if (params.reserved) {
      query = query.neq('booked_url', '').neq('booked_url', null)
    } else {
      query = query.in('booked_url', ['', null])
    }
  }

  return query.order('datetime', { ascending: true })
}

export const getMatchesCountFn = (params: GetMatchesCountParams) => {
  let query = supabase.from('matches').select('id, datetime')

  return query
    .gte('datetime', params.dates.start)
    .lte('datetime', params.dates.end)
}

export const setMatchFn = () => supabase.from('matches')
