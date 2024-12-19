import { LoginResponse } from './entities'
import { LoginParams } from './params'

import api from '@/services/api/axiosConfig'

export const loginFn = async (params: LoginParams): Promise<LoginResponse> => {
  const response = await api.post('/login/', params)

  return response.data
}
