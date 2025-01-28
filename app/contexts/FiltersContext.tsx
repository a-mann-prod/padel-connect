import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { useMe } from '@/hooks/useMe'
import {
  GetTournamentsParams,
  UpdateMatchFiltersParams,
  useMatchFilters,
  useUpdateMatchFilters,
} from '@/services/api'
import { MatchType, Sex } from '@/services/api/types'
import { buildContext } from '@/services/buildContext'

export type MatchFilters = UpdateMatchFiltersParams

type FiltersContextProps = {
  filters: MatchFilters
  saveFilters: (value: MatchFilters) => void
  isServerFiltersLoading: boolean

  tournamentsFilters: GetTournamentsParams & { type?: MatchType; gender?: Sex }
  setTournamentsFilters: Dispatch<
    SetStateAction<GetTournamentsParams & { type?: MatchType; gender?: Sex }>
  >
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (serverFilters && me?.id) {
      const { created_at, updated_at, ...rest } = serverFilters
      setFilters(rest)
    }
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
