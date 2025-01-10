export type FieldExtra = {
  duration: number
  price: number
}

export type Field = {
  id: number
  name: string
  startingDateZuluTime: string
  extras: FieldExtra[]
}

export type BookingFieldsResponse = {
  startingDateZuluTime: string
  fields: Field[]
}

export type BookingFieldsResponses = BookingFieldsResponse[]
