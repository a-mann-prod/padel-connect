import { useMutation } from '@tanstack/react-query'

import { UseMutationProps } from '@/services/api/queryHooks'
import { RegisterResponse } from './entities'
import { registerFn } from './functions'
import { RegisterParams } from './params'

// register
export const useRegister = ({
  options,
}: UseMutationProps<RegisterResponse, RegisterParams> = {}) =>
  useMutation({
    ...options,
    mutationFn: registerFn,
  })
