import { IconNameProp } from '@/designSystem'
import { Database } from '@/services/supabase/database.types'

export const mapTypeToIcon: Record<
  Database['public']['Enums']['match_type'],
  IconNameProp
> = {
  COMPETITION: 'FAS-trophy',
  LEISURE: 'FAR-hand-peace',
}
