import { useHandleError } from './useHandleError'

import { useAuthContext } from '@/contexts'
import { GetProfileParams, useUpdateProfile } from '@/services/api'
import { useSaveImage } from '@/services/api/image'
import { UseMutationProps } from '@/services/api/types'

// TODO useUpdateMe instead ?
export const useUpdateProfileWithAvatar = (
  options?: UseMutationProps<any, GetProfileParams, any>
) => {
  const onError = useHandleError()
  const { user } = useAuthContext()

  const { mutate: updateProfile, isPending: isPendingProfile } =
    useUpdateProfile({
      onError,
      ...options,
    })

  const { mutateAsync: saveAvatarAsync, isPending: isPendingAvatar } =
    useSaveImage({
      storageType: 'avatars',
      onError,
    })

  const mutateAsync = async ({ avatarFile, ...data }: any) => {
    let avatar_url
    if (avatarFile) {
      avatar_url = await saveAvatarAsync(avatarFile).then(
        (data) => data[0]?.data?.path
      )
    }

    updateProfile({ id: user?.id, ...data, avatar_url })
  }

  return { mutateAsync, isPending: isPendingProfile || isPendingAvatar }
}
