import { useAddFavoriteUser, useRemoveFavoriteUser } from '@/services/api'
import { DefaultProfileResponse } from '@/services/api/types'

export const useManageFavoriteUser = (
  user?: Omit<DefaultProfileResponse, 'is_favorite'> & { is_favorite?: boolean }
) => {
  const { mutate: insertFav, isPending: isPendingInsert } = useAddFavoriteUser()
  const { mutate: deleteFav, isPending: isPendingDelete } =
    useRemoveFavoriteUser()

  const isFavorite = user?.is_favorite

  const toggleFavorite = () => {
    if (!user?.id) return

    if (isFavorite) {
      deleteFav({ id: user.id })
    } else {
      insertFav({ id: user.id })
    }
  }

  return {
    toggleFavorite,
    isLoading: isPendingInsert || isPendingDelete,
  }
}
