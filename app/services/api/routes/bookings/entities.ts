import { Entity } from '../../types'

export type BookingsField = {
  id: number
  name: string
  startingDateZuluTime: string
  endingDateZuluTime: string
  duration: number
  active: boolean
}

export type BookingsResponse = Entity<{
  startingDateZuluTime: string
  endingDateZuluTime: string
  fields: BookingsField[]
}>

export type BookingsResponses = BookingsResponse[]
