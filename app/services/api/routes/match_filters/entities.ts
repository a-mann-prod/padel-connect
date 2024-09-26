import { Tables } from '@/services/supabase/database.types'

export type MatchFilterResponse = Omit<Tables<'match_filters'>, 'user_id'>

export const matchFilterQueryCols = 'level_range, complex_id, type, created_at'
