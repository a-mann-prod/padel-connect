import { User } from '@supabase/supabase-js'

import { useMe } from './useMe'
import { useUpdateMe } from './useUpdateMe'

import { ProfileResponse } from '@/services/api'
import { useDeleteImages, useSaveImage } from '@/services/api/image'
import { UseUploadProps } from '@/services/api/types'
import { FileInput } from '@/utils/file'

export type UseUpdateMe = {
  data: Partial<ProfileResponse & Pick<User, 'id' | 'created_at'>>
  isLoading: boolean
}

export const useUpdateAvatarMe = (
  options?: Omit<UseUploadProps, 'storageType'>
) => {
  const { data: me, isLoading: isLoadingMe } = useMe()
  const { mutate: updateMe, isPending: isPendingUpdateMe } = useUpdateMe()

  const { mutate: deleteImages } = useDeleteImages({ storageType: 'avatars' })

  const { isPending, mutate: saveImage } = useSaveImage({
    ...options,
    storageType: 'avatars',
    onSuccess: (data) => {
      // delete old image if necessary
      if (me?.avatar_url) {
        deleteImages([me.avatar_url])
      }

      const avatar_url = data[0]?.data?.path
      updateMe({ avatar_url })
    },
  })

  const mutate = (fileInput?: FileInput) => {
    if (fileInput) {
      // create or update
      saveImage({ files: [fileInput] })
      return
    }

    // delete
    if (me?.avatar_url) {
      deleteImages([me.avatar_url])
      updateMe({ avatar_url: null })
    }
  }

  return {
    mutate,
    isPending: isPending || isLoadingMe || isPendingUpdateMe,
  }
}
