import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { UserResponse } from './entities'
import {
  selfDeleteFn,
  updateEmailFn,
  updatePasswordFn,
  updateUserFn,
} from './functions'
import {
  SelfDeleteParams,
  UpdateEmailParams,
  UpdatePasswordParams,
  UpdateUserParams,
} from './params'

export const useUpdateUser = (
  options: UseMutationOptions<UserResponse, Error, UpdateUserParams> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: updateUserFn,
  })
}

export const useUpdatePassword = (
  options: UseMutationOptions<UserResponse, Error, UpdatePasswordParams> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: updatePasswordFn,
  })
}

export const useUpdateEmail = (
  options: UseMutationOptions<UserResponse, Error, UpdateEmailParams> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: updateEmailFn,
  })
}

export const useSelfDelete = (
  options: UseMutationOptions<void, Error, SelfDeleteParams> = {}
) => useMutation({ ...options, mutationFn: selfDeleteFn })
