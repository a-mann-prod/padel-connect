import { useQuery } from '@tanstack/react-query'

import { UseQueryProps } from '../../queryHooks'

import { BookingFieldsResponses } from './entities'
import { getBookingsFn } from './functions'
import { GetBookingFieldsParams } from './params'

export const useBookingFields = ({
  params,
  options,
}: UseQueryProps<BookingFieldsResponses, GetBookingFieldsParams>) =>
  useQuery<BookingFieldsResponses>({
    queryKey: ['booking-fields', params],
    queryFn: () => getBookingsFn(params),
    staleTime: 3600 * 1,
    ...options,
  })
