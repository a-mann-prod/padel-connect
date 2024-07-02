import { Database } from '@/services/supabase/database.types'

export type GetMatchParams = {
  id: number
}

export type GetMatchesParams = {
  dates: {
    start: string
    end?: string
  }
  level?: {
    min?: number
    max?: number
  }
  duration?: {
    min?: number
    max?: number
  }
  reserved?: boolean
  complex_id?: number | null
}

export type GetMatchesCountParams = {
  dates: {
    start: string
    end: string
  }
}

export type InsertMatchParams =
  Database['public']['Tables']['matches']['Insert']

export type UpdateMatchParams =
  Database['public']['Tables']['matches']['Update'] & {
    id: number
  }

export type DeleteMatchParams = {
  id: number
}