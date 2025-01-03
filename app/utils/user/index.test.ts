import { describe, expect, it } from '@jest/globals'

import { getInitials } from './index'

describe('getInitials', () => {
  it('should return initials', () => {
    // ARRANGE
    const lastname = 'Réno'
    const firstname = 'Jean'
    const expected = 'J R'

    // ACT
    const current = getInitials(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getInitials', () => {
  it('should return initials in uppercase', () => {
    // ARRANGE
    const lastname = 'réno'
    const firstname = 'jean'
    const expected = 'J R'

    // ACT
    const current = getInitials(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getInitials', () => {
  it('should return only first initials', () => {
    // ARRANGE
    const lastname = 'Goldman'
    const firstname = 'Jean Jacques'
    const expected = 'J G'

    // ACT
    const current = getInitials(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getInitials', () => {
  it('should return first initials (default case)', () => {
    // ARRANGE
    const lastname = 'R.'
    const firstname = 'Jean'
    const expected = 'J R'

    // ACT
    const current = getInitials(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getInitials', () => {
  it('should return only firstname first letter', () => {
    // ARRANGE
    const lastname = null
    const firstname = 'Jean'
    const expected = 'J'

    // ACT
    const current = getInitials(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})
