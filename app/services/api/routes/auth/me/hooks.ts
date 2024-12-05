import { useMutation, useQuery } from '@tanstack/react-query'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
import { useAuthContext } from '../../../../../contexts/AuthContext'
import { MeResponse } from './entities'
import {
  deleteMeFn,
  getMeFn,
  updateMeEmailFn,
  updateMeFn,
  updateMePasswordFn,
} from './functions'
import {
  DeleteMeParams,
  UpdateMeEmailParams,
  UpdateMeParams,
  UpdateMePasswordParams,
} from './params'

export const useMe = ({ options }: UseQueryProps<MeResponse>) => {
  return useQuery({
    ...options,
    queryFn: getMeFn,
    queryKey: ['me'],
  })
}

export const useUpdateMeEmail = ({
  options,
}: UseMutationProps<MeResponse, UpdateMeEmailParams> = {}) => {
  const queryCache = useQueryCache()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: updateMeEmailFn,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['me'], data)
      options?.onSuccess?.(data, variables, context)
      onSuccess()
    },
    onError,
  })
}

export const useUpdateMe = ({
  options,
}: UseMutationProps<MeResponse, UpdateMeParams> = {}) => {
  const queryCache = useQueryCache()

  return useMutation({
    ...options,
    mutationFn: updateMeFn,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['me'], data)
      options?.onSuccess?.(data, variables, context)
    },
  })
}

export const useUpdateMePassword = ({
  options,
}: UseMutationProps<void, UpdateMePasswordParams> = {}) => {
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: updateMePasswordFn,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)
      onSuccess()
    },
    onError,
  })
}

export const useDeleteMe = ({
  options,
}: UseMutationProps<void, DeleteMeParams> = {}) => {
  const queryCache = useQueryCache()
  const { signOut, isLoadingSignOut } = useAuthContext()

  const { isPending, ...rest } = useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      signOut()
      queryCache.removeItem(['me'])
      options?.onSuccess?.(data, variables, context)
    },
    mutationFn: deleteMeFn,
  })

  return { isPending: isPending || isLoadingSignOut, ...rest }
}
