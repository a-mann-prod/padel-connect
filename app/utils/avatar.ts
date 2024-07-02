import { getStorageFn } from '@/services/api/routes/image'

export const getPublicAvatarUrl = (url: string) =>
  getStorageFn('avatars').getPublicUrl(url).data.publicUrl
