import * as AuthSession from 'expo-auth-session'

import { handleEmailTranslation, handleSupabaseAuthError } from '../shared'
import { RegisterResponse } from './entities'
import { RegisterParams } from './params'

import { supabase } from '@/services/supabase'

export const registerFn = async ({
  email,
  password,
}: RegisterParams): Promise<RegisterResponse> => {
  const emailRedirectTo = AuthSession.makeRedirectUri({
    path: '/(modals)/root/email-verified',
  })

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo, data: handleEmailTranslation() },
  })

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}
