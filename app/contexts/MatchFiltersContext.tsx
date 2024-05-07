import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

import { LEVEL_MAX, LEVEL_MIN } from '@/hooks/useLevelItems'
import { GetMatchesParams } from '@/services/api'
import { buildContext } from '@/services/buildContext'

export type MatchFilters = Omit<GetMatchesParams, 'dates'>

type FiltersContextProps = {
  matchFilters: MatchFilters
  setMatchFilters: Dispatch<SetStateAction<MatchFilters>>
  defaultMatchFilters: MatchFilters
}

const [_, Provider, useMatchFiltersContext] = buildContext<FiltersContextProps>(
  'MatchFiltersContext'
)

const defaultMatchFilters: MatchFilters = {
  level: {
    min: LEVEL_MIN,
    max: LEVEL_MAX,
  },
  reserved: undefined,
}

export { useMatchFiltersContext }

export const FiltersProvider = ({ children }: PropsWithChildren) => {
  const [matchFilters, setMatchFilters] =
    useState<MatchFilters>(defaultMatchFilters)

  return (
    <Provider
      value={{
        matchFilters,
        setMatchFilters,
        defaultMatchFilters,
      }}
    >
      {children}
    </Provider>
  )
}
