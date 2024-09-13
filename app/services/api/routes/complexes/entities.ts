import { Tables } from '@/services/supabase/database.types'

export type ComplexResponse = Tables<'complexes'>

export type ComplexesResponse = Tables<'complexes'>[]

export const getComplexesQueryCols = 'id, name, phone_number, created_at'
