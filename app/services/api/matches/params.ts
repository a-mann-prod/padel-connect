import { Database } from '@/services/supabase/database.types'

export type GetMatchParams = {
  id: number
}

export type GetMatchesParams = {
  dates: {
    start: string
    end: string
  }
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
  Database['public']['Tables']['matches']['Update']