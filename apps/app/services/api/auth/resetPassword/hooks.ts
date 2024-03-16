import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { ResetPasswordResponse } from './entities'
import { resetPasswordFn } from './functions'
import { ResetPasswordParams } from './params'

// reset password with email
export const useResetPassword = (
  options: UseMutationOptions<
    ResetPasswordResponse,
    Error,
    ResetPasswordParams
  > = {}
) =>
  useMutation({
    ...options,
    mutationFn: resetPasswordFn,
  })
