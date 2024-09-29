import { Tables } from '@/services/supabase/database.types'

export type MatchFilterResponse = Omit<Tables<'match_filters'>, 'user_id'>

export const matchFilterQueryCols =
  'level_min, level_max, complex_id, type, created_at'
