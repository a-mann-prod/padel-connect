import { useQuery } from '@tanstack/react-query'

import { UseQueryProps } from '../../queryHooks'

import { BookingsResponses } from './entities'
import { getBookingsFn } from './functions'
import { GetBookingsParams } from './params'

export const useBookings = ({
  params,
  options,
}: UseQueryProps<BookingsResponses, GetBookingsParams>) =>
  useQuery<BookingsResponses>({
    queryKey: ['bookings', params],
    queryFn: () => getBookingsFn(params),
    staleTime: 3600 * 1,
    ...options,
  })
