import { AuthError, PostgrestError } from '@supabase/supabase-js'

export const handleSupabaseAuthError = (error: AuthError) => {
  // todo: replace when https://github.com/supabase/gotrue/pull/1377 merged
  const errorCode = error.message.toLowerCase().replaceAll(' ', '_')

  //   Alert.alert('error', t(`errors.api.${errorCode}`))
  throw new Error(errorCode, { cause: error.cause })
}

export const handleSupabasePostgrestError = (error: PostgrestError) => {
  throw new Error(error.code, { cause: error.message })
}
