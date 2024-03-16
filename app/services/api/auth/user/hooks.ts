import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { UserResponse } from './entities'
import { updateUserFn } from './functions'
import { UpdateUserParams } from './params'

export const useUpdateUser = (
  options: UseMutationOptions<UserResponse, Error, UpdateUserParams> = {}
) => {
  return useMutation({
    ...options,
    mutationFn: updateUserFn,
  })
}
