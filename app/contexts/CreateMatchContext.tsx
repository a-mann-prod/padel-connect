import { router } from 'expo-router'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import { matchFormServices, MatchFormValues } from '@/components'
import { useCreateMatch } from '@/services/api'
import { buildContext } from '@/services/buildContext'
import { routing } from '@/services/routing'

const { formatToParams } = matchFormServices

type CreateMatchContextProps = {
  setFormValues: Dispatch<SetStateAction<MatchFormValues | undefined>>
  createMatch: (values?: Partial<MatchFormValues>) => void
  isPendingCreateMatch: boolean
}

const [_, Provider, useCreateMatchContext] =
  buildContext<CreateMatchContextProps>('CreateMatchContext')

export { useCreateMatchContext }

export function CreateMatchProvider({ children }: { children: ReactNode }) {
  const { mutate, isPending } = useCreateMatch({
    options: {
      onSuccess: (data) => {
        const newItem = data
        router.replace(routing.match.path(newItem?.id))
      },
    },
  })

  const [formValues, setFormValues] = useState<MatchFormValues>()

  const createMatch = (values?: Partial<MatchFormValues>) =>
    mutate(
      formatToParams({ ...(formValues || {}), ...values } as MatchFormValues)
    )

  return (
    <Provider
      value={{
        setFormValues,
        createMatch,
        isPendingCreateMatch: isPending,
      }}
    >
      {children}
    </Provider>
  )
}
