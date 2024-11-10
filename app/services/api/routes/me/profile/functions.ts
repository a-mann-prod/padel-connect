import { MeProfileResponse } from './entities'
import { UpdateMeAvatarParams, UpdateMeProfileParams } from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/me/profile'

export const getMeProfileFn = async (): Promise<MeProfileResponse> => {
  const { data } = await api.get(`${ENDPOINT}/`)

  return data
}

export const updateMeProfileFn = async (params: UpdateMeProfileParams) => {
  const { data } = await api.patch(`${ENDPOINT}/`, params)

  return data
}

export const updateMeAvatarFn = async (params: UpdateMeAvatarParams) => {
  const formData = new FormData()

  formData.append('avatar_url', params as unknown as string)

  const { data } = await api.patchForm(`${ENDPOINT}/`, formData)

  return data
}

export const deleteMeAvatarFn = async () => {
  const { data } = await api.delete(`${ENDPOINT}/delete_avatar/`)

  return data
}
