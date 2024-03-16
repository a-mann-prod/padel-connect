import * as AuthSession from 'expo-auth-session'

import { ResetPasswordResponse } from './entities'
import { ResetPasswordParams } from './params'
import { handleSupabaseAuthError } from '../shared'

import { supabase } from '@/services/supabase'

export const resetPasswordFn = async ({
  email,
}: ResetPasswordParams): Promise<ResetPasswordResponse> => {
  const redirectTo = AuthSession.makeRedirectUri({
    path: '/(modals)/root/password-reset',
  })

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  })

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}
