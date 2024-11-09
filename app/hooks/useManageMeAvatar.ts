import { useDeleteMeAvatar, useUpdateMeAvatar } from '@/services/api'

export const useManageMeAvatar = () => {
  const { mutate: updateAvatar, isPending: isPendingUpdateMeAvatar } =
    useUpdateMeAvatar()
  const { mutate: deleteAvatar, isPending: isPendingDeleteMeAvatar } =
    useDeleteMeAvatar()

  return {
    updateAvatar,
    deleteAvatar,
    isPending: isPendingUpdateMeAvatar || isPendingDeleteMeAvatar,
  }
}
