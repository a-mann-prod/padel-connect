import { RegisterResponse } from './entities'
import { RegisterParams } from './params'

import api from '@/services/api/axiosConfig'

export const registerFn = async (
  params: RegisterParams
): Promise<RegisterResponse> => {
  // handle redirection

  // const emailRedirectTo = AuthSession.makeRedirectUri({
  //   path: '/(modals)/root/email-verified',
  // })

  const { data } = await api.post('/auth/users/', params)

  return data
}
