import { supabase } from '@/services/supabase'
import * as AuthSession from 'expo-auth-session'
import { handleSupabaseAuthError } from '../shared'
import { ResetPasswordResponse } from './entities'
import { ResetPasswordParams } from './params'

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
