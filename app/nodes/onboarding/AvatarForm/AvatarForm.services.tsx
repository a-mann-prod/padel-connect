import { z } from 'zod'

export type AvatarFormValues = z.infer<typeof schema>

const getDefaultValues = (props?: AvatarFormValues): AvatarFormValues => ({
  avatar: props?.avatar,
})

const schema = z.object({
  avatar: z
    .object({
      fileName: z.string().optional(),
      mimeType: z.string().optional(),
      uri: z.string(),
    })
    .optional(),
})

export const avatarFormServices = {
  getDefaultValues,
  schema,
}
