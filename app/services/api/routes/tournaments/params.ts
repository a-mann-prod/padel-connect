import { Database } from '@/services/supabase/database.types'

export type GetTournamentParams = {
  id: number
}

export type GetTournamentsParams = {
  type?: Database['public']['Enums']['match_type']
  complex_id?: number
  month?: string
}
