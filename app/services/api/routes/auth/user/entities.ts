import { User } from '@supabase/supabase-js'

export type UserResponse = {
  user: User | null
}
