import { describe, expect, it } from '@jest/globals'

import { Level, LevelInput, calculLevel } from './index'

describe('calculLevel', () => {
  it('should add coef 4 to the minus level per inputs and return average (floor) per inputs', () => {
    // ARRANGE
    const level: LevelInput = {
      defense: [5, 3, 4],
      offense: [3, 5, 7],
      service: [5],
    }
    const expected: Level = { defense: 3.4, offense: 3.8, service: 5 }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should add coeff 4 to the minus level (even if same values) per inputs and return average (floor) per inputs', () => {
    // ARRANGE
    const level: LevelInput = {
      defense: [5, 5, 5],
      offense: [4, 4, 4],
      service: [5],
    }
    const expected: Level = { defense: 5, offense: 4, service: 5 }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should add coeff 4 to the minus level (even if 2 same values) per inputs and return average (floor) per inputs, rounded', () => {
    // ARRANGE
    const level: LevelInput = {
      defense: [2, 2, 5],
      offense: [3, 3, 4],
      service: [5],
    }
    const expected: Level = { defense: 2.4, offense: 3.1, service: 5 }

    // ACT
    const current = calculLevel(level)

    // ASSERT
    expect(current).toEqual(expected)
  })
})
