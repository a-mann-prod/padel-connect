import { LoginResponse } from './entities'
import { LoginParams } from './params'

import api from '@/services/api/axiosConfig'

export const loginFn = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await api.post('/auth/jwt/create/', params)

  return response.data
}
