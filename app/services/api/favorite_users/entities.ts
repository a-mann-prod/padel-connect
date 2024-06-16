import { Tables } from '@/services/supabase/database.types'
import { ProfileResponse } from '../profiles'

export type FavoriteUserResponse = Tables<'favorite_users'>

export type FavoriteUsersResponse = Tables<'favorite_users'>[]

export type FavoriteUsersInfiniteResponse = Tables<'favorite_users'> & {
  id: string
  favorite_user: Pick<
    ProfileResponse,
    | 'id'
    | 'first_name'
    | 'last_name'
    | 'avatar_url'
    | 'manual_preference'
    | 'side_preference'
  > | null
}

export const favoriteUsersQueryCols = 'user_id, favorite_user_id, created_at'

export const favoriteUsersInfiniteQueryCols =
  'id:favorite_user_id, user_id, favorite_user:profiles!public_favorite_users_favorite_user_id_fkey(id, first_name, last_name, avatar_url, manual_preference, side_preference), favorite_user_id, created_at'
