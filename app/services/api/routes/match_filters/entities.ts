import { Tables } from '@/services/supabase/database.types'

export type MatchFilterResponse = Tables<'match_filters'>

export const matchFilterQueryCols = 'is_my_level_range, complex_id, created_at'
