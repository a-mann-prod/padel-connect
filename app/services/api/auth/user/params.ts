import { UserAttributes } from '@supabase/supabase-js'

export type UpdateUserParams = UserAttributes & { redirectTo?: string }

export type UpdatePasswordParams = { password: string }

export type UpdateEmailParams = {
  email: string
}
