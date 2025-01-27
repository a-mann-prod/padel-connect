import dayjs, { Dayjs } from 'dayjs'
//plugins
import Duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import RelativeTime from 'dayjs/plugin/relativeTime'

//locales
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import { Language } from '../i18n/app/types'

export type DateFormat = Date | string | undefined

dayjs.extend(RelativeTime)
dayjs.extend(LocalizedFormat)
dayjs.extend(Duration)

export const date = {
  fromNow: (date: DateFormat) => dayjs(date).fromNow(),
  setLocale: (locale: Language) => {
    dayjs.locale(locale)
  },
  duration: (time: number, units: Duration.DurationUnitType) =>
    dayjs.duration(time, units),
  format: (date: DateFormat) => dayjs(date).format('LL'),
  now: () => dayjs(),
  dayjs: (date?: DateFormat) =>
    dayjs(
      date === null || date === undefined || date === '' ? undefined : date
    ),
  getDaysBetween(start: Dayjs, end: Dayjs) {
    const range = []
    let current = start
    while (!current.isAfter(end)) {
      range.push(current)
      current = current.add(1, 'days')
    }
    return range
  },
}
