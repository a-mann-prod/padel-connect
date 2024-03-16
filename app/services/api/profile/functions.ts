import { supabase } from '@/services/supabase'
import { queryCols } from './entities'
import { GetProfileParams } from './params'

export const getProfileFn = (params: GetProfileParams = {}) =>
  supabase.from('profiles').select(queryCols).eq('id', params.id).single()

export const setProfileFn = () => supabase.from('profiles')
