import { getComplexesQueryCols } from './entities'
import { GetComplexParams, GetComplexesParams } from './params'

import { supabase } from '@/services/supabase'

export const getComplexFn = (params: GetComplexParams) =>
  supabase
    .from('complexes')
    .select(getComplexesQueryCols)
    .eq('id', params.id)
    .single()

export const getComplexesFn = (params: GetComplexesParams) => {
  let query = supabase.from('complexes').select(getComplexesQueryCols)

  // if (params.current_user_id) {
  //   query = query.neq('id', params.current_user_id)
  // }

  // if (params.search) {
  //   query = query.like('first_name', formatSearch(params.search))
  // }

  return query
}
