import { describe, expect, it } from '@jest/globals'

import { getInitials, getUserName } from './index'

describe('getUserName', () => {
  it('should return firstname and first letter of lastname with uppercase', () => {
    // ARRANGE
    const lastname = 'Réno'
    const firstname = 'Jean'
    const expected = 'Jean R.'

    // ACT
    const current = getUserName(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getUserName', () => {
  it('should return firstName and first letter of lastname with uppercase with a composed firstname', () => {
    // ARRANGE
    const lastname = 'Goldman'
    const firstname = 'Jean Jacques'
    const expected = 'Jean Jacques G.'

    // ACT
    const current = getUserName(firstname, lastname)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getInitials', () => {
  it('should return initials', () => {
    // ARRANGE
    const lastname = 'Réno'
    const firstname = 'Jean'
    const expected = 'JR'

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
    const expected = 'JR'

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
    const expected = 'JG'

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
