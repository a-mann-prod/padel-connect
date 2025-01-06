import api from '../../axiosConfig'

import { BookingResponse, CreateBookingResponse } from './entities'
import { CreateBookingParams, GetBookingParams } from './params'

export const getBookingFn = async ({ id, ...params }: GetBookingParams) => {
  const { data } = await api.get<BookingResponse>(`/bookings/${id}/`, {
    params,
  })

  return data
}

export const createBookingFn = async (params: CreateBookingParams) => {
  const { data } = await api.put<CreateBookingResponse>(`/bookings/`, {
    params,
  })

  return data
}
