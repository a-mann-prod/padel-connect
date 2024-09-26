import { getMatchQueryCols, getMatchesQueryCols } from './entities'
import {
  GetMatchParams,
  GetMatchesCountParams,
  GetMatchesParams,
  GetUserMatchesParams,
} from './params'

import { supabase } from '@/services/supabase'
import { isNilOrEmpty } from '@/utils/global'

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

  if (params.dates.start) {
    query = query.gte('datetime', params.dates.start)
  }

  if (params.dates.end) {
    query = query.lte('datetime', params.dates.end)
  }

  if (params.complex_id) {
    query = query.eq('complex_id', params.complex_id)
  }

  if (params.type) {
    query = query.eq('type', params.type)
  }

  if (params.level) {
    if (!isNilOrEmpty(params.level.min)) {
      query = query.gte('level', params.level.min)
    }
    if (!isNilOrEmpty(params.level.max)) {
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

  if (!isNilOrEmpty(params.match_ids) && params.match_ids) {
    query = query.in('id', params.match_ids)
  }

  return query.order('datetime', {
    ascending: params?.orderBy?.datetime ?? true,
  })
}

export const getUserMatchesFn = (params: GetUserMatchesParams) => {
  let query = supabase
    .from('matches')
    .select('id, match_requests!inner(user_id)')

  if (params?.dates?.start) {
    query = query.gte('datetime', params.dates.start)
  }

  if (params?.dates?.end) {
    query = query.lte('datetime', params.dates.end)
  }

  return query.eq('match_requests.user_id', params.user_id)
}

export const getMatchesCountFn = (params: GetMatchesCountParams) => {
  let query = supabase.from('matches').select('id, datetime')

  return query
    .gte('datetime', params.dates.start)
    .lte('datetime', params.dates.end)
}

export const setMatchFn = () => supabase.from('matches')
