import { describe, expect, it } from '@jest/globals'

import { calculLevel, getLevel } from './index'
import { Level, LevelInput } from './types'

describe('calculLevel', () => {
  it('should add coef 4 to the minus level per inputs and return average (floor) per inputs', () => {
    // ARRANGE
    const level: LevelInput[] = [
      { type: 'defense', value: 5 },
      { type: 'defense', value: 3 },
      { type: 'defense', value: 4 },

      { type: 'offense', value: 3 },
      { type: 'offense', value: 5 },
      { type: 'offense', value: 7 },

      { type: 'service', value: 5 },
    ]

    const expected: Level = {
      defense_level: 3.4,
      offense_level: 3.8,
      service_level: 5,
    }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should add coeff 4 to the minus level (even if same values) per inputs and return average (floor) per inputs', () => {
    // ARRANGE
    const level: LevelInput[] = [
      { type: 'defense', value: 5 },
      { type: 'defense', value: 5 },
      { type: 'defense', value: 5 },

      { type: 'offense', value: 4 },
      { type: 'offense', value: 4 },
      { type: 'offense', value: 4 },

      { type: 'service', value: 5 },
    ]

    const expected: Level = {
      defense_level: 5,
      offense_level: 4,
      service_level: 5,
    }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should add coeff 4 to the minus level (even if 2 same values) per inputs and return average (floor) per inputs, rounded', () => {
    // ARRANGE

    const level: LevelInput[] = [
      { type: 'defense', value: 2 },
      { type: 'defense', value: 2 },
      { type: 'defense', value: 5 },

      { type: 'offense', value: 3 },
      { type: 'offense', value: 3 },
      { type: 'offense', value: 4 },

      { type: 'service', value: 5 },
    ]

    const expected: Level = {
      defense_level: 2.4,
      offense_level: 3.1,
      service_level: 5,
    }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getLevel', () => {
  it('should return average (floor) per inputs', () => {
    // ARRANGE
    const level: Level = {
      defense_level: 3,
      offense_level: 4,
      service_level: 5,
    }

    const expected = 4

    // ACT
    const current = getLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return average (floor) per inputs with float & zero', () => {
    // ARRANGE
    const level: Level = {
      defense_level: 0,
      offense_level: 1.2,
      service_level: 2.3,
    }

    const expected = 1.1

    // ACT
    const current = getLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })
})
