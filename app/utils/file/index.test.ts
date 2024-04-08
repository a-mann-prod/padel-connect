import { describe, expect, it } from '@jest/globals'

import { FileExtension, getFileExtension } from './index'

describe('getFileExtension', () => {
  it('should file extension', () => {
    // ARRANGE
    const defaultExtension = FileExtension.JPEG
    const fileName = 'example.jpeg'
    const expected = 'jpeg'

    // ACT
    const current = getFileExtension(defaultExtension, fileName)

    // ASSERT
    expect(current).toEqual(expected)
  })
})

describe('getFileExtension', () => {
  it('should file extension', () => {
    // ARRANGE
    const defaultExtension = FileExtension.JPEG
    const fileName = 'example.dmg'
    const expected = 'dmg'

    // ACT
    const current = getFileExtension(defaultExtension, fileName)

    // ASSERT
    expect(current).toEqual(expected)
  })
})
