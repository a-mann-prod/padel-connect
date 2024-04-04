import 'react-native-get-random-values'
import { v4 as uuid } from 'uuid'

export const getFileExtension = (
  defaultExtension: FileExtension,
  fileName?: string | null
): string => fileName?.split('.').pop()?.toLowerCase() ?? defaultExtension

export enum FileExtension {
  JPEG = 'jpeg',
}

export enum MimeType {
  JPEG = 'image/jpeg',
}

export type File = {
  fileName?: string | null
  uri: string
  mimeType?: string | null
}

export type FileInput = {
  data: ArrayBuffer
  type: string
  name: string
}

export const prepareFile = async ({
  uri,
  fileName,
  mimeType,
}: File): Promise<FileInput> => {
  const arrayBuffer = await fetch(uri).then((res) => res.arrayBuffer())
  const fileExt = getFileExtension(FileExtension.JPEG, fileName)

  return {
    data: arrayBuffer,
    type: mimeType ?? MimeType.JPEG,
    name: `${uuid()}.${fileExt}`,
  }
}
