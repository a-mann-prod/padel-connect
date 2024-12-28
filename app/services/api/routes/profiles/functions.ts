import api from '../../axiosConfig'
import { ProfileResponse, ProfilesResponse } from './entities'
import {
  GetInfiniteProfilesParams,
  GetProfileParams,
  GetProfilesParams,
} from './params'

const ENDPOINT = '/profiles'

export const getProfileFn = async (params: GetProfileParams) => {
  const { data } = await api.get<ProfileResponse>(`${ENDPOINT}/${params.id}/`)

  return data
}

export const getProfilesFn = async (params: GetProfilesParams) => {
  const { data } = await api.get<ProfilesResponse>(`${ENDPOINT}/`, { params })

  return data
}

export const getInfiniteProfilesFn = async (
  params: GetInfiniteProfilesParams,
  pageParam: number
) => {
  const { data } = await api.get<ProfilesResponse>(`${ENDPOINT}/`, {
    params: { ...params, page: pageParam },
  })
  return data
}
