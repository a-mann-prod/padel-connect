import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { useMe } from '@/hooks/useMe'
import {
  GetInfiniteTournamentsParams,
  UpdateMatchFiltersParams,
  useMatchFilters,
  useUpdateMatchFilters,
} from '@/services/api'
import { buildContext } from '@/services/buildContext'

export type MatchFilters = UpdateMatchFiltersParams

type FiltersContextProps = {
  filters: MatchFilters
  saveFilters: (value: MatchFilters) => void
  isServerFiltersLoading: boolean

  tournamentsFilters: GetInfiniteTournamentsParams
  setTournamentsFilters: Dispatch<SetStateAction<GetInfiniteTournamentsParams>>
}

const [_, Provider, useFiltersContext] =
  buildContext<FiltersContextProps>('FiltersContext')

export { useFiltersContext }

export function FiltersProvider({ children }: { children: ReactNode }) {
  const { data: me } = useMe()
  const [filters, setFilters] = useState<MatchFilters>({})
  const [tournamentsFilters, setTournamentsFilters] = useState<any>({})

  const { data: serverFilters, isLoading: isServerFiltersLoading } =
    useMatchFilters({ options: { enabled: !!me?.id } })

  const { mutate: updateMatchFilter } = useUpdateMatchFilters()

  useEffect(() => {
    if (serverFilters && me?.id) setFilters(serverFilters)
  }, [serverFilters, me?.id])

  const saveFilters = (value: MatchFilters) => updateMatchFilter(value)

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
