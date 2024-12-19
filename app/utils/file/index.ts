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

export const prepareFile = ({ uri, fileName, mimeType }: File): FileInput => {
  const fileExt = getFileExtension(FileExtension.JPEG, fileName)

  return {
    uri,
    type: mimeType ?? MimeType.JPEG,
    name: `${uuid()}.${fileExt}`,
  }
}

export const getArray8 = async (uri: string): Promise<Uint8Array> => {
  const arrayBuffer = await fetch(uri).then((res) => res.arrayBuffer())
  return new Uint8Array(arrayBuffer)
}
