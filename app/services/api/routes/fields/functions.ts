import api from '../../axiosConfig'
import { BookingFieldsResponses } from './entities'

import { GetBookingFieldsParams } from './params'

export const getBookingsFn = async (params: GetBookingFieldsParams) => {
  const { data } = await api.get<BookingFieldsResponses>('/fields/', {
    params,
  })

  return data
}
