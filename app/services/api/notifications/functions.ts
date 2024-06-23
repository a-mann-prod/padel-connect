import { getNotificationsQueryCols } from './entities'
import { GetNotificationsParams } from './params'

import { supabase } from '@/services/supabase'

export const getAllNotificationsFn = (params: GetNotificationsParams) => {
  let query = supabase.from('notifications').select(getNotificationsQueryCols)

  query = query.eq('user_id', params.user_id)

  return query.order('created_at', { ascending: false })
}

export const setNotificationFn = () => supabase.from('notifications')

export const getUnreadNotifications = (params: GetNotificationsParams) => {
  let query = supabase
    .from('notifications')
    .select(getNotificationsQueryCols, { count: 'exact' })

  query = query.eq('user_id', params.user_id).eq('is_read', false)

  return query
}
