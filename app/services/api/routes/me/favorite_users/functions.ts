import { ProfileResponse } from '../../profiles'
import { FavoriteUsersResponse } from './entities'
import {
  AddOrRemoveFavoriteUserParams,
  GetInfiniteFavoriteUsersParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/me/favorite_users'

export const getInfiniteFavoriteUsersFn = async (
  params: GetInfiniteFavoriteUsersParams,
  pageParam: number
) => {
  const { data } = await api.get<FavoriteUsersResponse>(`${ENDPOINT}/`, {
    params: { ...params, page: pageParam },
  })

  return data
}

export const addFavoriteUser = async (
  params: AddOrRemoveFavoriteUserParams
) => {
  const { data } = await api.post<ProfileResponse>(
    `${ENDPOINT}/${params.id}/add/`
  )

  return data
}

export const removeFavoriteUser = async (
  params: AddOrRemoveFavoriteUserParams
) => {
  const { data } = await api.post<void>(`${ENDPOINT}/${params.id}/remove/`)

  return data
}
