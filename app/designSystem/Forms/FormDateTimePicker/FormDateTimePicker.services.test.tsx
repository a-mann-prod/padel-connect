import { describe, expect, it } from '@jest/globals'

import { formDateTimePickerServices } from './FormDateTimePicker.services'

import { date } from '@/services/date'

describe('formatWithNextMinuteInterval', () => {
  it('should go to next 15mns with 10mn left', () => {
    // ARRANGE
    const interval = 15
    const testDate = date.dayjs('2000/01/01 20:05:00').toDate()
    const expected = date.dayjs('2000/01/01 20:15:00').toISOString()

    // ACT
    const current = formDateTimePickerServices
      .formatWithNextMinuteInterval(testDate, interval)
      .toISOString()

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should go to next 15mns with 1 mn left', () => {
    // ARRANGE
    const interval = 15
    const testDate = date.dayjs('2000/01/01 20:29:00').toDate()
    const expected = date.dayjs('2000/01/01 20:30:00').toISOString()

    // ACT
    const current = formDateTimePickerServices
      .formatWithNextMinuteInterval(testDate, interval)
      .toISOString()

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should go to next 15mns with 15 mn left', () => {
    // ARRANGE
    const interval = 15
    const testDate = date.dayjs('2000/01/01 20:15:00').toDate()
    const expected = date.dayjs('2000/01/01 20:30:00').toISOString()

    // ACT
    const current = formDateTimePickerServices
      .formatWithNextMinuteInterval(testDate, interval)
      .toISOString()

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should go to next 30mns with 10mn left', () => {
    // ARRANGE
    const interval = 30
    const testDate = date.dayjs('2000/01/01 20:05:00').toDate()
    const expected = date.dayjs('2000/01/01 20:30:00').toISOString()

    // ACT
    const current = formDateTimePickerServices
      .formatWithNextMinuteInterval(testDate, interval)
      .toISOString()

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should go to next 30mns with 1 mn left', () => {
    // ARRANGE
    const interval = 30
    const testDate = date.dayjs('2000/01/01 20:29:00').toDate()
    const expected = date.dayjs('2000/01/01 20:30:00').toISOString()

    // ACT
    const current = formDateTimePickerServices
      .formatWithNextMinuteInterval(testDate, interval)
      .toISOString()

    // ASSERT
    expect(current).toEqual(expected)
  })

  it('should go to next 30mns with 30 mn left', () => {
    // ARRANGE
    const interval = 30
    const testDate = date.dayjs('2000/01/01 20:00:00').toDate()
    const expected = date.dayjs('2000/01/01 20:30:00').toISOString()

    // ACT
    const current = formDateTimePickerServices
      .formatWithNextMinuteInterval(testDate, interval)
      .toISOString()

    // ASSERT
    expect(current).toEqual(expected)
  })
})
