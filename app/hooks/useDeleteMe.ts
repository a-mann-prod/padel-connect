import { UseMutationOptions } from '@tanstack/react-query'

import { useHandleError } from './useHandleError'

import { useAuthContext } from '@/contexts'
import { SelfDeleteParams, useSelfDelete } from '@/services/api'

export const useDeleteMe = ({
  onSuccess,
  ...options
}: UseMutationOptions<void, Error, SelfDeleteParams> = {}) => {
  const onError = useHandleError()
  const { signOut, isLoadingSignOut } = useAuthContext()

  const { isPending, ...rest } = useSelfDelete({
    onSuccess: (data: void, variables: SelfDeleteParams, context: unknown) => {
      onSuccess?.(data, variables, context)
      signOut(true)
    },
    onError,
    ...options,
  })

  return {
    isPending: isPending || isLoadingSignOut,
    ...rest,
  }
}
