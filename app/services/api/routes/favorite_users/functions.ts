import {
  favoriteUsersInfiniteQueryCols,
  favoriteUsersQueryCols,
} from './entities'
import { GetFavoriteUserParams, GetFavoriteUsersParams } from './params'

import { supabase } from '@/services/supabase'

export const getFavoriteUserFn = (params: GetFavoriteUserParams) =>
  supabase
    .from('favorite_users')
    .select(favoriteUsersQueryCols)
    .eq('user_id', params.user_id)
    .eq('favorite_user_id', params.favorite_user_id)
    .limit(1)

export const getFavoriteUsersInfiniteFn = (params: GetFavoriteUsersParams) =>
  supabase
    .from('favorite_users')
    .select(favoriteUsersInfiniteQueryCols)
    .eq('user_id', params.user_id)

export const setFavoriteUserFn = () => supabase.from('favorite_users')
