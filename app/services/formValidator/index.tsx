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
    optional: () => z.number().nullable().optional(),
    array: () => numberRequired,
  },
  boolean: {
    required: () => booleanRequired,
    optional: () => z.boolean().optional(),
  },
}

export const refineFunctions = {
  passwordsMatch: <T extends { new_password: string; re_new_password: string }>(
    { new_password, re_new_password }: T,
    ctx: RefinementCtx
  ) => {
    if (new_password !== re_new_password) {
      ctx.addIssue({
        path: ['re_new_password'],
        code: z.ZodIssueCode.custom,
        message: 'string.passwordsNotMatch',
      })
    }
  },
}
