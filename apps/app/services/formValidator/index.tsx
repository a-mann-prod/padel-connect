import i18next from 'i18next'
import { RefinementCtx, z } from 'zod'
import { PASSWORD_REGEX } from './constants'

const tPrefix = 'errors.form'

const stringRequired = z
  .string()
  .trim()
  .min(1, { message: i18next.t(`${tPrefix}.string.required`) })

export const validators = {
  string: {
    required: () => stringRequired,
    email: () =>
      stringRequired.email({
        message: i18next.t(`${tPrefix}.string.invalidEmail`),
      }),
    password: () =>
      stringRequired.regex(PASSWORD_REGEX, {
        message: i18next.t(`${tPrefix}.string.invalidPassword`),
      }),
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
        message: i18next.t(`${tPrefix}.string.passwordsNotMatch`),
      })
    }
  },
}
