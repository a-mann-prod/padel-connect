import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { LoginResponse } from './entities'
import { loginFn, loginWithOAuthFn } from './functions'
import { LoginParams, LoginWithOAuthParams } from './params'

import { useAuthContext } from '@/contexts'

// login with email / password
export const useLogin = (
  options: UseMutationOptions<LoginResponse, Error, LoginParams> = {}
) => {
  const { signIn } = useAuthContext()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      signIn(data)
      options.onSuccess?.(data, variables, context)
    },
    mutationFn: loginFn,
  })
}

// login with OAuth (Apple / Google)
export const useLoginWithOAuth = (
  options: UseMutationOptions<void, Error, LoginWithOAuthParams> = {}
) => {
  // const { signIn } = useAuthContext()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      //signIn(data)
      options.onSuccess?.(data, variables, context)
    },
    mutationFn: loginWithOAuthFn,
  })
}
