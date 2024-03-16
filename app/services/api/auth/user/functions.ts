import { UserResponse } from './entities'
import { UpdateUserParams } from './params'
import { handleSupabaseAuthError } from '../shared'

import { supabase } from '@/services/supabase'

export const updateUserFn = async (
  params: UpdateUserParams
): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.updateUser(params)

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}
