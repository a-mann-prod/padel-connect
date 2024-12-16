export type BookingsField = {
  id: number
  name: string
  startingDateZuluTime: string
  durations: number[]
}

export type BookingsResponse = {
  startingDateZuluTime: string
  fields: BookingsField[]
}

export type BookingsResponses = BookingsResponse[]
