import { values } from 'remeda'

import { Level } from './types'

export const getLevel = (level: Level): number => {
  const arr = values(level)
  const sum = arr.reduce<number>((acc, curr) => acc + (curr || 0), 0)

  return Math.floor((sum / arr.length) * 10) / 10
}
