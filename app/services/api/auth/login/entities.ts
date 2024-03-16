import { Session, User, WeakPassword } from '@supabase/supabase-js'

export type LoginResponse = {
  user: User | null
  session: Session | null
  weakPassword?: WeakPassword | null
}
