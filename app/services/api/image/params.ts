export type GetImageParams = {
  path: string
  storageType: StorageType
}

export type PostImageParams = Partial<{
  path: string
  storageType: StorageType
  arrayBuffer: ArrayBuffer
  contentType: string
}>

export type GetStorageParams = StorageType

export type StorageType = 'avatars' | 'images'
