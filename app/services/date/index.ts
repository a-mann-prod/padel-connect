import dayjs from 'dayjs'
//plugins
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import RelativeTime from 'dayjs/plugin/relativeTime'

//locales
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import { Language } from '../i18n/app/types'

dayjs.extend(RelativeTime)
dayjs.extend(LocalizedFormat)

export const date = {
  fromNow: (date: string) => dayjs(date).fromNow(),
  setLocale: (locale: Language) => {
    dayjs.locale(locale)
  },
  format: (date: string) => dayjs(date).format('LL'),
  now: () => dayjs(),
}
