import { profilesQueryCols } from './entities'
import { GetProfileParams, GetProfilesParams } from './params'

import { supabase } from '@/services/supabase'

export const getProfileFn = (params: GetProfileParams) =>
  supabase
    .from('profiles')
    .select(profilesQueryCols)
    .eq('id', params.id)
    .single()

export const getProfilesFn = (params: GetProfilesParams) =>
  supabase
    .from('profiles')
    .select(profilesQueryCols)
    .neq('id', params.current_user_id)

export const setProfileFn = () => supabase.from('profiles')
