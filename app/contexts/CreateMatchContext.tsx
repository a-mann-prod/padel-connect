import { router } from 'expo-router'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import { matchFormServices, MatchFormValues } from '@/components'
import { useCreateMatch } from '@/services/api'
import { buildContext } from '@/services/buildContext'
import { routing } from '@/services/routing'

const { formatToParams } = matchFormServices

export type BookingFieldFormValues = Pick<
  MatchFormValues,
  | 'complex_id'
  | 'datetime'
  | 'duration'
  | 'four_padel_field_id'
  | 'four_padel_field_name'
  | 'four_padel_field_price'
>

type CreateMatchContextProps = {
  bookingFieldFormValues: BookingFieldFormValues | undefined
  setBookingFieldFormValues: Dispatch<
    SetStateAction<BookingFieldFormValues | undefined>
  >

  setFormValues: Dispatch<SetStateAction<Partial<MatchFormValues> | undefined>>
  createMatch: (values?: Partial<MatchFormValues>) => void
  isPendingCreateMatch: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_, Provider, useCreateMatchContext] =
  buildContext<CreateMatchContextProps>('CreateMatchContext')

export { useCreateMatchContext }

export function CreateMatchProvider({ children }: { children: ReactNode }) {
  const { mutate, isPending } = useCreateMatch({
    options: {
      onSuccess: (data) => {
        const newItem = data
        router.replace(routing.match.path(newItem?.id, true))
      },
    },
  })

  const [formValues, setFormValues] = useState<Partial<MatchFormValues>>()
  const [bookingFieldFormValues, setBookingFieldFormValues] =
    useState<BookingFieldFormValues>()

  const createMatch = (values?: Partial<MatchFormValues>) =>
    mutate(
      formatToParams({ ...(formValues || {}), ...values } as MatchFormValues)
    )

  return (
    <Provider
      value={{
        bookingFieldFormValues,
        setBookingFieldFormValues,
        setFormValues,
        createMatch,
        isPendingCreateMatch: isPending,
      }}
    >
      {children}
    </Provider>
  )
}
