import { supabase } from '@/services/supabase'
import { messagesQueryCols } from './entities'
import { GetMessageParams, GetMessagesParams } from './params'

export const getMessagesFn = (params: GetMessagesParams) => {
  let query = supabase
    .from('messages')
    .select(messagesQueryCols)
    .eq('match_id', params.match_id)
    .order('id', { ascending: false })

  return query
}

export const getMessageFn = (params: GetMessageParams) => {
  let query = supabase
    .from('messages')
    .select(messagesQueryCols)
    .eq('id', params.id)

  return query
}

export const setMessagesFn = () => supabase.from('messages')
