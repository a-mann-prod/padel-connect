import { Level, LevelInput } from './types'

const COEFF = 4

export const calculLevel = (levelInputs: LevelInput[]): Level => {
  // Helper function to calculate the average with an additional coeff 4 to the minimum level
  const calculateAverage = (values: number[]): number => {
    if (values.length === 0) return 0
    const minValue = Math.min(...values)
    const adjustedSum =
      values.reduce((sum, val) => sum + val, 0) + COEFF * minValue
    const average = adjustedSum / (values.length + COEFF)
    return Math.floor(average * 10) / 10
  }

  return {
    defense_level: calculateAverage(
      levelInputs.reduce<number[]>(
        (acc, { type, value }) => (type === 'defense' ? [...acc, value] : acc),
        []
      )
    ),
    offense_level: calculateAverage(
      levelInputs.reduce<number[]>(
        (acc, { type, value }) => (type === 'offense' ? [...acc, value] : acc),
        []
      )
    ),
    service_level: calculateAverage(
      levelInputs.reduce<number[]>(
        (acc, { type, value }) => (type === 'service' ? [...acc, value] : acc),
        []
      )
    ),
  }
}
