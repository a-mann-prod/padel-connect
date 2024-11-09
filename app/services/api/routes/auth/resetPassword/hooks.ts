import { useMutation } from '@tanstack/react-query'

import { UseMutationProps } from '@/services/api/queryHooks'
import { resetPasswordFn } from './functions'
import { ResetPasswordParams } from './params'

// reset password with email
export const useResetPassword = (
  options: UseMutationProps<void, ResetPasswordParams>
) =>
  useMutation({
    ...options,
    mutationFn: resetPasswordFn,
  })
