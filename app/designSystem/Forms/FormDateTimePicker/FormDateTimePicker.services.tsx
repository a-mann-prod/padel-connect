import { date } from '@/services/date'

const formatWithMinuteInterval = (value: Date): Date => {
  const currentDate = date.dayjs(value)

  const minute = currentDate.minute()
  let newDate = currentDate.clone().second(0).millisecond(0)

  if (minute % 15 !== 0) {
    newDate = newDate.minute(minute - (minute % 15))
  }
  return newDate.toDate()
}

export const formDateTimePickerServices = { formatWithMinuteInterval }
