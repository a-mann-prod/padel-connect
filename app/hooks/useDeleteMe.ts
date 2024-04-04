import { useHandleError } from './useHandleError'

import { useAuthContext } from '@/contexts'
import { useSelfDelete } from '@/services/api'

export const useDeleteMe = () => {
  const onError = useHandleError()
  const { signOut, isLoadingSignOut } = useAuthContext()

  const { isPending, ...rest } = useSelfDelete({
    onSuccess: () => signOut(true),
    onError,
  })

  return {
    isPending: isPending || isLoadingSignOut,
    ...rest,
  }
}
