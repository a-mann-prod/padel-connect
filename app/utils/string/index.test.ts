import { describe, expect, it } from '@jest/globals'

import { capitalizeLetter } from './index'

describe('capitalizeLetter', () => {
  it('should return word with upperCase in first position', () => {
    // ARRANGE
    const word = 'jean'
    const expected = 'Jean'

    // ACT
    const current = capitalizeLetter(word)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return word with upperCase in first position bis', () => {
    // ARRANGE
    const word = 'jean'
    const expected = 'Jean'
    const position = 0

    // ACT
    const current = capitalizeLetter(word, position)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return word with upperCase in second position', () => {
    // ARRANGE
    const word = 'jean'
    const expected = 'jEan'
    const position = 1

    // ACT
    const current = capitalizeLetter(word, position)

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should return word without upperCase if out of position', () => {
    // ARRANGE
    const word = 'jean'
    const expected = 'jean'
    const position = 4

    // ACT
    const current = capitalizeLetter(word, position)

    // ASSERT
    expect(current).toEqual(expected)
  })
})
