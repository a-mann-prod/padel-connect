import { Session, User } from '@supabase/supabase-js'

export type RegisterResponse = { user: User | null; session: Session | null }
