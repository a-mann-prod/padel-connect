import { values } from 'remeda'

import { isNilOrEmpty } from '../global'
import { Level } from './types'

export const getLevel = (level: Level): number | undefined => {
  if (
    isNilOrEmpty(level.defense_level) ||
    isNilOrEmpty(level.offense_level) ||
    isNilOrEmpty(level.service_level)
  )
    return

  const arr = values(level)
  const sum = arr.reduce<number>((acc, curr) => acc + (curr || 0), 0)

  return Math.floor((sum / arr.length) * 10) / 10
}
