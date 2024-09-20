import { ReactNode, useEffect, useState } from 'react'

import { useHandleError } from '@/hooks/useHandleError'
import { useHandleSuccess } from '@/hooks/useHandleSuccess'
import { useMe } from '@/hooks/useMe'
import {
  UpdateMatchFilterParams,
  useMatchFilter,
  useUpdateMatchFilter,
} from '@/services/api'
import { buildContext } from '@/services/buildContext'

export type MatchFilters = Omit<UpdateMatchFilterParams, 'user'>

type FiltersContextProps = {
  filters: MatchFilters
  saveFilters: (value: MatchFilters) => void
  isServerFiltersLoading: boolean
}

const [_, Provider, useFiltersContext] =
  buildContext<FiltersContextProps>('FiltersContext')

export { useFiltersContext }

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<MatchFilters>({})
  const { data: me } = useMe()

  const onSuccess = useHandleSuccess()
  const onError = useHandleError()

  const { data: serverFilters, isLoading: isServerFiltersLoading } =
    useMatchFilter({
      params: { userId: me?.id as string },
      options: { enabled: !!me?.id },
    })

  const { mutate: updateMatchFilter } = useUpdateMatchFilter({
    onSuccess,
    onError,
  })

  useEffect(() => {
    if (serverFilters) setFilters(serverFilters)
  }, [serverFilters])

  const saveFilters = (value: MatchFilters) => {
    setFilters({ ...value })
    if (!me) return

    updateMatchFilter({ user_id: me.id, ...value })
  }

  return (
    <Provider value={{ filters, saveFilters, isServerFiltersLoading }}>
      {children}
    </Provider>
  )
}
