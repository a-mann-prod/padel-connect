import { queryCols } from './entities'
import { GetProfileParams } from './params'

import { supabase } from '@/services/supabase'

export const getProfileFn = (params: GetProfileParams = {}) =>
  supabase.from('profiles').select(queryCols).eq('id', params.id).single()

export const setProfileFn = () => supabase.from('profiles')
