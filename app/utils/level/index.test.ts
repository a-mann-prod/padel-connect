import { describe, expect, it } from '@jest/globals'

import { calculLevel, getLevel, getLevelRange } from './index'
import { Level, LevelInput } from './types'

describe('calculLevel', () => {
  it('should add coeff 2 to the minus level per inputs and return average (floor) per inputs', () => {
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
      defense_level: 3.6,
      offense_level: 4.2,
      service_level: 5,
    }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should add coeff 2 to the minus level (even if same values) per inputs and return average (floor) per inputs', () => {
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

  it('should add coeff 2 to the minus level (even if 2 same values) per inputs and return average (floor) per inputs, rounded', () => {
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
      defense_level: 2.6,
      offense_level: 3.2,
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

describe('getLevelRange', () => {
  it('should return [0, 2] for level 1', () => {
    // ARRANGE
    const level = 1
    const expected = [0, 2]

    // ACT
    const current = getLevelRange(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return [0, 1] for level 0', () => {
    // ARRANGE
    const level = 0
    const expected = [0, 1]

    // ACT
    const current = getLevelRange(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return [9, 10] for level 10', () => {
    // ARRANGE
    const level = 10
    const expected = [9, 10]

    // ACT
    const current = getLevelRange(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return [4, 6] for level 5.5 if rounded', () => {
    // ARRANGE
    const level = 5.5
    const expected = [4, 6]

    // ACT
    const current = getLevelRange(level, false)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return [4.5, 6.5] for level 5.5 if not rounded', () => {
    // ARRANGE
    const level = 5.5
    const expected = [4.5, 6.5]

    // ACT
    const current = getLevelRange(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return [0, 1] for level 0.1 if rounded', () => {
    // ARRANGE
    const level = 0.1
    const expected = [0, 1]

    // ACT
    const current = getLevelRange(level, false)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return [0, 1.1] for level 0.1 if not rounded', () => {
    // ARRANGE
    const level = 0.1
    const expected = [0, 1.1]

    // ACT
    const current = getLevelRange(level)

    // ASSERT
    expect(current).toEqual(expected)
  })
})
