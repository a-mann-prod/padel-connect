import { matchFilterQueryCols } from './entities'
import { GetMatchFilterParams } from './params'

import { supabase } from '@/services/supabase'

export const getMatchFilterFn = (params: GetMatchFilterParams) =>
  supabase
    .from('match_filters')
    .select(matchFilterQueryCols)
    .eq('user_id', params.userId)
    .single()

export const setMatchFilterFn = () => supabase.from('match_filters')
