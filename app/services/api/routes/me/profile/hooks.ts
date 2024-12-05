import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useQueryCache } from '@/services/api/queryCacheHooks'
import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MeProfileResponse } from './entities'
import {
  deleteMeAvatarFn,
  getMeProfileFn,
  updateMeAvatarFn,
  updateMeProfileFn,
} from './functions'
import { UpdateMeAvatarParams, UpdateMeProfileParams } from './params'

export const useMeProfile = ({
  options,
}: UseQueryProps<MeProfileResponse> = {}) =>
  useQuery<MeProfileResponse>({
    ...options,
    queryKey: ['me-profile'],
    queryFn: getMeProfileFn,
  })

export const useUpdateMeProfile = ({
  options,
}: UseMutationProps<MeProfileResponse, UpdateMeProfileParams> = {}) => {
  const queryCache = useQueryCache()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: updateMeProfileFn,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['me-profile'], data)
      onSuccess()
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useUpdateMeAvatar = ({
  options,
}: UseMutationProps<MeProfileResponse, UpdateMeAvatarParams> = {}) => {
  const queryCache = useQueryCache()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: updateMeAvatarFn,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['me-profile'], data)
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useDeleteMeAvatar = ({ options }: UseMutationProps<void> = {}) => {
  const queryCache = useQueryCache()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: deleteMeAvatarFn,
    onSuccess: (data, variables, context) => {
      queryCache.updateItem(['me-profile'], { avatar_url: null })
      onSuccess()
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}
