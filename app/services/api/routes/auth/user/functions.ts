import * as AuthSession from 'expo-auth-session'

import {
  handleSupabaseAuthError,
  handleSupabaseEdgeFunctionError,
} from '../shared'
import { UserResponse } from './entities'
import {
  SelfDeleteParams,
  UpdateEmailParams,
  UpdatePasswordParams,
  UpdateUserParams,
} from './params'

import { supabase } from '@/services/supabase'

export const updateUserFn = async ({
  redirectTo,
  ...params
}: UpdateUserParams): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.updateUser(params, {
    emailRedirectTo: redirectTo,
  })

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}

export const updatePasswordFn = async (
  params: UpdatePasswordParams
): Promise<UserResponse> => {
  const { data, error } = await supabase.auth.updateUser(params)

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}

export const updateEmailFn = async (
  params: UpdateEmailParams
): Promise<UserResponse> => {
  const emailRedirectTo = AuthSession.makeRedirectUri({
    path: '/(modals)/root/email-verified',
  })

  const { data, error } = await supabase.auth.updateUser(params, {
    emailRedirectTo,
  })

  if (error) {
    handleSupabaseAuthError(error)
  }

  return data
}

export const selfDeleteFn = async (params: SelfDeleteParams) => {
  const { data, error } = await supabase.functions.invoke(
    'user-self-deletion',
    { body: params }
  )

  if (error) {
    await handleSupabaseEdgeFunctionError(error)
  }

  return data
}
