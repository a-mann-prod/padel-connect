import { anyPass, isEmpty, isNil } from 'remeda'

export const isNilOrEmpty = anyPass([isNil, isEmpty])
