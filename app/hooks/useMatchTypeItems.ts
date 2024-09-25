import { useTranslate } from '@/services/i18n'
import { Database } from '@/services/supabase/database.types'

const types: Database['public']['Enums']['match_type'][] = [
  'LEISURE',
  'COMPETITION',
]

export const useMatchTypeItems = () => {
  const t = useTranslate(undefined, { keyPrefix: 'matchType' })

  return types.map((type) => ({ label: t(type.toLowerCase()), value: type }))
}
