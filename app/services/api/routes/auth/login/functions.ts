import { LoginResponse } from './entities'
import { GoogleLoginParams, LoginParams } from './params'

import api from '@/services/api/axiosConfig'

export const loginFn = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await api.post('/login/', params)

  return response.data
}

export const googleLoginFn = async (
  params: GoogleLoginParams
): Promise<LoginResponse> => {
  const response = await api.post('/login/google/', params)

  return response.data
}
