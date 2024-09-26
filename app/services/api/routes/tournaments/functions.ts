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

  if (params.complex_id) {
    query = query.eq('complex_id', params.complex_id)
  }

  if (params.type) {
    query = query.eq('type', params.type)
  }

  if (params.month) {
    const month = date.dayjs(params.month)
    const [start, end] = [month.startOf('month'), month.endOf('month')]
    query = query.gte('datetime', start).lte('datetime', end)
  }

  return query
}
