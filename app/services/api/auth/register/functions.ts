import * as AuthSession from 'expo-auth-session'

import { RegisterResponse } from './entities'
import { RegisterParams } from './params'
import { handleSupabaseAuthError } from '../shared'

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
    options: { emailRedirectTo },
  })

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}
