import { MeResponse } from './entities'
import {
  DeleteMeParams,
  UpdateMeEmailParams,
  UpdateMeParams,
  UpdateMePasswordParams,
} from './params'

import api from '@/services/api/axiosConfig'

const ENDPOINT = '/auth/users'

export const getMeFn = async () => {
  const { data } = await api.get<MeResponse>(`${ENDPOINT}/me/`)

  return data
}

export const updateMeEmailFn = async (params: UpdateMeEmailParams) => {
  const { data } = await api.post<MeResponse>(`${ENDPOINT}/set_email/`, params)

  return data
}

export const updateMeFn = async (params: UpdateMeParams) => {
  const { data } = await api.patch<MeResponse>(`${ENDPOINT}/me/`, params)

  return data
}

export const updateMePasswordFn = async (params: UpdateMePasswordParams) => {
  const { data } = await api.post<void>(`${ENDPOINT}/set_password/`, params)

  return data
}

export const deleteMeFn = async (params: DeleteMeParams) => {
  const { data } = await api.delete<void>(`${ENDPOINT}/me/`, { data: params })

  return data
}
