import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { UseMutationProps, UseQueryProps } from '@/services/api/queryHooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: updateMeProfileFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['me-profile'], data)
      onSuccess()
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useUpdateMeAvatar = ({
  options,
}: UseMutationProps<MeProfileResponse, UpdateMeAvatarParams> = {}) => {
  const queryClient = useQueryClient()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: updateMeAvatarFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['me-profile'], data)
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}

export const useDeleteMeAvatar = ({ options }: UseMutationProps<void> = {}) => {
  const queryClient = useQueryClient()
  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: deleteMeAvatarFn,
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(['me-profile'], (oldData: MeProfileResponse) =>
        oldData
          ? {
              ...oldData,
              avatar_url: null,
            }
          : oldData
      )
      onSuccess()
      options?.onSuccess?.(data, variables, context)
    },
    onError,
  })
}
