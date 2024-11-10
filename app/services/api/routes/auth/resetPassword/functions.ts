import { ResetPasswordParams } from './params'

import api from '@/services/api/axiosConfig'

export const resetPasswordFn = async ({
  email,
}: ResetPasswordParams): Promise<void> => {
  // TODO: handle redirection
  // const redirectTo = AuthSession.makeRedirectUri({
  //   path: '/(modals)/root/password-reset',
  // })

  const { data } = await api.post('/users/reset_password/')

  return data
}
