import { Tables } from '@/services/supabase/database.types'

export type MatchResponse = Omit<
  Tables<'matches'>,
  'complex_id' | 'owner_id'
> & {
  complex: Tables<'complexes'>
  owner: Pick<Tables<'profiles'>, 'id' | 'first_name' | 'last_name'>
}

export type MatchesResponse = (Omit<Tables<'matches'>, 'complex_id'> & {
  complex: Tables<'complexes'>
})[]

export type MatchesCountResponse = Pick<Tables<'matches'>, 'id' | 'datetime'>[]

export const getMatchQueryCols =
  'id, complex:complexes (id, name), owner:profiles (id, first_name, last_name), datetime, booked_url, duration, price, level, updated_at, created_at'

export const getMatchesQueryCols =
  'id, complex:complexes (id, name), owner_id, datetime, booked_url, duration, price, level, updated_at, created_at'
