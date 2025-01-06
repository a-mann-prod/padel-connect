import { useMutation, useQuery } from '@tanstack/react-query'

import { UseMutationProps, UseQueryProps } from '../../queryHooks'
import { BookingResponse, CreateBookingResponse } from './entities'
import { createBookingFn, getBookingFn } from './functions'
import { CreateBookingParams, GetBookingParams } from './params'

export const useBooking = ({
  params,
  options,
}: UseQueryProps<BookingResponse, GetBookingParams>) =>
  useQuery<BookingResponse>({
    queryKey: ['booking', params.id],
    queryFn: () => getBookingFn(params),
    staleTime: 0,
    ...options,
  })

export const useCreateBooking = ({
  options,
}: UseMutationProps<CreateBookingResponse, CreateBookingParams> = {}) =>
  useMutation({
    mutationFn: createBookingFn,
    ...options,
  })
