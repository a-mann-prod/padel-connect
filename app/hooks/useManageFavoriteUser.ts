import {
  ProfileResponse,
  useAddFavoriteUser,
  useRemoveFavoriteUser,
} from '@/services/api'

export const useManageFavoriteUser = (user?: ProfileResponse) => {
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
