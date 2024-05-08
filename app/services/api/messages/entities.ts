import { Tables } from '@/services/supabase/database.types'

export type MessageResponse = Tables<'messages'>

export type MessagesResponse = MessageResponse[]

export const messagesQueryCols = 'id, sender_id, match_id, content, created_at'

// export const messagesQueryCols =
// 'id, sender_id, match_id, sender:profiles(id, first_name, last_name, avatar_url), content, created_at'
