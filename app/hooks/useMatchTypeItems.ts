import { MatchType } from '@/services/api/types'
import { useTranslate } from '@/services/i18n'
import { values } from 'remeda'

const types = values(MatchType)

export const useMatchTypeItems = () => {
  const t = useTranslate(undefined, { keyPrefix: 'matchType' })

  return types.map((type) => ({ label: t(type.toLowerCase()), value: type }))
}
