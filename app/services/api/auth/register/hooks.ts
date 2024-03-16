import { UseMutationOptions, useMutation } from '@tanstack/react-query'
import { RegisterResponse } from './entities'
import { registerFn } from './functions'
import { RegisterParams } from './params'

// register
export const useRegister = (
  options: UseMutationOptions<RegisterResponse, Error, RegisterParams> = {}
) =>
  useMutation({
    ...options,
    mutationFn: registerFn,
  })
