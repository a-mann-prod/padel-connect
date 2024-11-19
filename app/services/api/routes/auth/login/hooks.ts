import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '../../../../../contexts/AuthContext'
import { LoginResponse } from './entities'
import { loginFn } from './functions'
import { LoginParams } from './params'

import { UseMutationProps } from '@/services/api/queryHooks'

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
