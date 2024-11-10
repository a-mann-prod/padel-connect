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
  uri: string
  type: string
  name: string
}

export const prepareFile = async ({
  uri,
  fileName,
  mimeType,
}: File): Promise<FileInput> => {
  const fileExt = getFileExtension(FileExtension.JPEG, fileName)

  return {
    uri,
    type: mimeType ?? MimeType.JPEG,
    name: `${uuid()}.${fileExt}`,
  }
}
