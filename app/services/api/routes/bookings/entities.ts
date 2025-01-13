import { BookingStatus } from '../../types'

export type Participation = {
  id: number
  user: number
  nb_slot_paid: number
}

export type BookingResponse = {
  id: number
  booking_status: BookingStatus
  payment_link: string
  participations: Participation[]
}

export type CreateBookingResponse = {
  id: number
  payment_link: string
}
