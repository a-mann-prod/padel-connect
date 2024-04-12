import { formatSearch } from '../utils'
import { profilesQueryCols } from './entities'
import { GetProfileParams, GetProfilesParams } from './params'

import { supabase } from '@/services/supabase'

export const getProfileFn = (params: GetProfileParams) =>
  supabase
    .from('profiles')
    .select(profilesQueryCols)
    .eq('id', params.id)
    .single()

export const getProfilesFn = (params: GetProfilesParams) => {
  let query = supabase.from('profiles').select(profilesQueryCols)

  if (params.current_user_id) {
    query = query.neq('id', params.current_user_id)
  }

  if (params.search) {
    query = query.like('first_name', formatSearch(params.search))
  }

  return query
}

export const setProfileFn = () => supabase.from('profiles')
