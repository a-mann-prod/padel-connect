import { RefinementCtx, z } from 'zod'

import { PASSWORD_REGEX } from './constants'

const stringRequired = z.string().trim().min(1, { message: 'string.required' })
const numberRequired = z.number().min(0, { message: 'number.required' })
const booleanRequired = z.boolean()

export const validators = {
  string: {
    required: () => stringRequired,
    email: () =>
      stringRequired.email({
        message: 'string.invalidEmail',
      }),
    optional: () => z.string().nullable().optional(),
    password: () =>
      stringRequired.regex(PASSWORD_REGEX, {
        message: 'string.invalidPassword',
      }),
  },
  number: {
    required: () => numberRequired,
  },
  boolean: {
    required: () => booleanRequired,
  },
}

export const refineFunctions = {
  passwordsMatch: <T extends { password: string; confirmPassword: string }>(
    { password, confirmPassword }: T,
    ctx: RefinementCtx
  ) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        code: z.ZodIssueCode.custom,
        message: 'string.passwordsNotMatch',
      })
    }
  },
}
