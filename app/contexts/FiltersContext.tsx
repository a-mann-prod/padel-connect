import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

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

  tournamentsFilters: any
  setTournamentsFilters: Dispatch<SetStateAction<any>>
}

const [_, Provider, useFiltersContext] =
  buildContext<FiltersContextProps>('FiltersContext')

export { useFiltersContext }

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<MatchFilters>({})
  const [tournamentsFilters, setTournamentsFilters] = useState<any>({})

  const { data: me } = useMe()

  const { data: serverFilters, isLoading: isServerFiltersLoading } =
    useMatchFilter({
      params: { userId: me?.id as string },
      options: { enabled: !!me?.id },
    })

  const { mutate: updateMatchFilter } = useUpdateMatchFilter()

  useEffect(() => {
    if (serverFilters) setFilters(serverFilters)
  }, [serverFilters])

  const saveFilters = (value: MatchFilters) => {
    setFilters({ ...value })
    if (!me) return

    updateMatchFilter({ user_id: me.id, ...value })
  }

  return (
    <Provider
      value={{
        filters,
        saveFilters,
        isServerFiltersLoading,
        tournamentsFilters,
        setTournamentsFilters,
      }}
    >
      {children}
    </Provider>
  )
}
