import { Tables } from '@/services/supabase/database.types'

export type FavoriteUserResponse = Tables<'favorite_users'>

export type FavoriteUsersResponse = Tables<'favorite_users'>[]

export const favoriteUsersqueryCols = 'user_id, favorite_user_id, created_at'
