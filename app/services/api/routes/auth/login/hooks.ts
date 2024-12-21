import { useMutation } from '@tanstack/react-query'

import { UseMutationProps } from '@/services/api/queryHooks'
import { useAuthContext } from '../../../../../contexts/AuthContext'

import { LoginResponse } from './entities'
import { googleLoginFn, loginFn } from './functions'
import { GoogleLoginParams, LoginParams } from './params'

// login with email / password
export const useLogin = ({
  options,
}: UseMutationProps<LoginResponse, LoginParams> = {}) => {
  const { signIn } = useAuthContext()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      signIn(data)
      options?.onSuccess?.(data, variables, context)
    },
    mutationFn: loginFn,
  })
}

export const useGoogleLogin = ({
  options,
}: UseMutationProps<LoginResponse, GoogleLoginParams> = {}) => {
  const { signIn } = useAuthContext()

  return useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      signIn(data)
      options?.onSuccess?.(data, variables, context)
    },
    mutationFn: googleLoginFn,
  })
}
