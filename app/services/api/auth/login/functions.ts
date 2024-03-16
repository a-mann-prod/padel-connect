import { supabase } from '@/services/supabase'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { handleSupabaseAuthError, handleUnverifiedUser } from '../shared'
import { LoginResponse } from './entities'
import { LoginParams, LoginWithOAuthParams } from './params'

export const loginFn = async (params: LoginParams): Promise<LoginResponse> => {
  const { data, error } = await supabase.auth.signInWithPassword(params)

  if (error) {
    handleSupabaseAuthError(error)
  }

  if (!data.session) {
    handleUnverifiedUser()
  }

  return data
}

export const loginWithOAuthFn = async (params: LoginWithOAuthParams) => {
  WebBrowser.maybeCompleteAuthSession() // required for web only
  const redirectTo = AuthSession.makeRedirectUri()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: params,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  })

  if (error) {
    handleSupabaseAuthError(error)
  }

  const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo)

  if (res.type === 'success') {
    console.log('youpi')
  }
}
