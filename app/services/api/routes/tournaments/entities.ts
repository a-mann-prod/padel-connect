import { Tables } from '@/services/supabase/database.types'

export type TournamentResponse = Tables<'tournaments'> & {
  complex: Pick<Tables<'complexes'>, 'name'> | null
}

export type TournamentsResponse = TournamentResponse[]

export const getTournamentsQueryCols =
  'id, title, description, complex_id, complex:complexes(name), datetime, type, created_at'
