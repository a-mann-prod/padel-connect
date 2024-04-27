import { getStorageFn } from '@/services/api/image'

export const getPublicAvatarUrl = (url: string) =>
  getStorageFn('avatars').getPublicUrl(url).data.publicUrl
