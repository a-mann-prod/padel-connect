export type Field = {
  id: number
  name: string
  startingDateZuluTime: string
  durations: number[]
}

export type BookingFieldsResponse = {
  startingDateZuluTime: string
  fields: Field[]
}

export type BookingFieldsResponses = BookingFieldsResponse[]
