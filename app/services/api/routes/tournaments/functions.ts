import { getTournamentsQueryCols } from './entities'
import { GetTournamentParams, GetTournamentsParams } from './params'

import { date } from '@/services/date'
import { supabase } from '@/services/supabase'

const today = date.now().toISOString()

export const getTournamentFn = (params: GetTournamentParams) =>
  supabase
    .from('tournaments')
    .select(getTournamentsQueryCols)
    .eq('id', params.id)
    .single()

export const getTournamentsFn = (params: GetTournamentsParams) => {
  let query = supabase
    .from('tournaments')
    .select(getTournamentsQueryCols)
    .gte('datetime', today)
    .order('datetime', { ascending: true })

  return query
}
