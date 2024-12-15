import api from '../../axiosConfig'

import { BookingsResponses } from './entities'
import { GetBookingsParams } from './params'

export const getBookingsFn = async (params: GetBookingsParams) => {
  const { data } = await api.get<BookingsResponses>('/bookings/', {
    params,
  })

  return data
}
