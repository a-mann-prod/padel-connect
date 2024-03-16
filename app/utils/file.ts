export const getFileExtension = (
  defaultExtension: FileExtension,
  fileName?: string
): string => fileName?.split('.').pop()?.toLowerCase() ?? defaultExtension

export enum FileExtension {
  JPEG = 'jpeg',
}

export enum MimeType {
  JPEG = 'image/jpeg',
}
