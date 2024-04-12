import { useMe } from './useMe'

import {
  useDeleteFavoriteUser,
  useFavoriteUser,
  useInsertFavoriteUser,
} from '@/services/api'

export const useManageFavoriteUser = (favUserId?: string) => {
  const { data: me } = useMe()

  const { data: fav, isLoading } = useFavoriteUser({
    params: {
      user_id: me?.id as string,
      favorite_user_id: favUserId as string,
    },
    options: {
      enabled: !!(me?.id && favUserId),
    },
  })

  const { mutate: insertFav, isPending: isPendingInsert } =
    useInsertFavoriteUser()
  const { mutate: deleteFav, isPending: isPendingDelete } =
    useDeleteFavoriteUser()

  const isFavorite = !!fav

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFav({ user_id: me?.id, favorite_user_id: favUserId })
    } else {
      me?.id &&
        favUserId &&
        insertFav([{ user_id: me?.id, favorite_user_id: favUserId }])
    }
  }

  return {
    isFavorite,
    toggleFavorite,
    isLoading: isLoading || isPendingInsert || isPendingDelete,
  }
}
