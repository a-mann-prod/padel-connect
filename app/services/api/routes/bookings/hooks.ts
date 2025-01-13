import { useMutation, useQuery } from '@tanstack/react-query'

import { useHandleError } from '@/hooks/useHandleError'
import { useQueryCache } from '../../queryCacheHooks'
import { UseMutationProps, UseQueryProps } from '../../queryHooks'
import { BookingResponse, CreateBookingResponse } from './entities'
import { createBookingFn, getBookingFn } from './functions'
import { CreateBookingParams, GetBookingParams } from './params'

export const useBooking = ({
  params,
  options,
}: UseQueryProps<BookingResponse, GetBookingParams>) =>
  useQuery<BookingResponse>({
    queryKey: ['bookings', params.id],
    queryFn: () => getBookingFn(params),
    ...options,
  })

export const useCreateBooking = ({
  options,
}: UseMutationProps<CreateBookingResponse, CreateBookingParams> = {}) => {
  const queryCache = useQueryCache()
  const onError = useHandleError()

  return useMutation({
    ...options,
    mutationFn: createBookingFn,
    onError,
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context)

      queryCache.updateItem(['matches', variables.match], {
        id: variables.match,
        four_padel_booking_id: data.id,
      })
    },
  })
}
