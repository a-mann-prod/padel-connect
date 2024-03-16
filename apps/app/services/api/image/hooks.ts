import {
  useFileUrl,
  useUpload,
} from '@supabase-cache-helpers/storage-react-query'
import { UseFileUrlProps, UseUploadProps } from '../types'
import { getStorageFn } from './functions'
import { GetImageParams } from './params'

export const useImage = ({
  params,
  options,
}: UseFileUrlProps<GetImageParams> = {}) =>
  useFileUrl(
    getStorageFn(params?.storageType),
    params?.path || '',
    'public',
    options
  )

export const useSaveImage = ({ storageType, ...options }: UseUploadProps) =>
  useUpload(getStorageFn(storageType), options)
