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
    .eq('id', params.id)
    .single()

export const getMatchesFn = (params: GetMatchesParams) => {
  let query = supabase.from('matches').select(getMatchesQueryCols)

  query = query
    .gte('datetime', params.dates.start)
    .lte('datetime', params.dates.end)

  return query.order('datetime', { ascending: true })
}

export const getMatchesCountFn = (params: GetMatchesCountParams) => {
  let query = supabase.from('matches').select('id, datetime')

  return query
    .gte('datetime', params.dates.start)
    .lte('datetime', params.dates.end)
}

export const setMatchFn = () => supabase.from('matches')
