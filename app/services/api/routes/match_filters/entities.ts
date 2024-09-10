import { Tables } from '@/services/supabase/database.types'

export type MatchFilterResponse = Omit<Tables<'match_filters'>, 'user_id'>

export const matchFilterQueryCols = 'is_my_level_range, complex_id, created_at'
