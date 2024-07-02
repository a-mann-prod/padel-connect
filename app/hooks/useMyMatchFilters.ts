import { useMe } from './useMe'

import { useMatchFilter } from '@/services/api'

export const useMyMatchFilters = () => {
  const { data: me } = useMe()

  return useMatchFilter({
    params: { userId: me?.id as string },
    options: { enabled: !!me?.id },
  })
}
