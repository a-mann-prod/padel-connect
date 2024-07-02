import {
  AuthError,
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
  PostgrestError,
} from '@supabase/supabase-js'

export const handleSupabaseAuthError = (error: AuthError) => {
  // todo: replace when https://github.com/supabase/gotrue/pull/1377 merged
  const errorCode = error.message.toLowerCase().replaceAll(' ', '_')

  //   Alert.alert('error', t(`errors.api.${errorCode}`))
  throw new Error(errorCode, { cause: error.cause })
}

export const handleSupabasePostgrestError = (error: PostgrestError) => {
  throw new Error(error.code, { cause: error.message })
}

export const handleSupabaseEdgeFunctionError = async (
  error: FunctionsHttpError | FunctionsRelayError | FunctionsFetchError
) => {
  let errorMessage: string | undefined
  if (error instanceof FunctionsHttpError) {
    const fnError = await error.context.json()
    errorMessage = fnError.errorCode
  } else {
    errorMessage = error.message
  }

  const errorCode = errorMessage?.toLowerCase().replaceAll(' ', '_')

  throw new Error(errorCode, { cause: error.cause })
}
