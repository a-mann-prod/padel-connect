import { date } from '@/services/date'
import { capitalizeLetter } from '@/utils/string'

export const useMonthItems = () => {
  const today = date.now()

  const next12Months = []

  for (let i = 0; i < 12; i++) {
    const nextMonth = today.add(i, 'month').startOf('month')
    next12Months.push({
      label: capitalizeLetter(nextMonth.format('MMMM YYYY')),
      value: nextMonth.toISOString(),
    })
  }

  return next12Months
}
