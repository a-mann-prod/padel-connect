import { date } from '@/services/date'

const formatWithNextMinuteInterval = (value: Date, interval = 30): Date => {
  const currentDate = date.dayjs(value)

  const minute = currentDate.minute()
  let newDate = currentDate.clone().second(0).millisecond(0)

  const minutesToAdd = interval - (minute % interval)

  newDate = newDate.add(minutesToAdd, 'minute')

  return newDate.toDate()
}

export const formDateTimePickerServices = { formatWithNextMinuteInterval }
