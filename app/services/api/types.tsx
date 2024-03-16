import { StorageError } from '@supabase/storage-js'
import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js'
import {
  UploadFetcherConfig,
  UploadFileResponse,
  UseUploadInput,
} from '@supabase-cache-helpers/storage-react-query'
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query'

import { StorageType } from './image'

// QueryOptions from Supa cache helper
export type QueryOptions<TResponse, TError> = Omit<
  UseQueryOptions<
    PostgrestSingleResponse<TResponse>,
    TError,
    PostgrestSingleResponse<TResponse>,
    QueryKey
  >,
  'queryKey' | 'queryFn'
>

// MutationOptions from Supa cache helper
export type MutationOptions<TResponse, TParams, TError> = Omit<
  UseMutationOptions<TResponse, TError, TParams>,
  'mutationFn'
>

// FileUrlOptions from Supa cache helper
export type FileUrlOptions = Omit<
  UseQueryOptions<
    string | undefined,
    StorageError,
    string | undefined,
    QueryKey
  >,
  'queryKey' | 'queryFn'
>

export type UploadOptions = UploadFetcherConfig &
  Omit<
    UseMutationOptions<UploadFileResponse[], StorageError, UseUploadInput>,
    'mutationFn'
  >

// Hooks props from Supa cache helper
export type UseQueryProps<
  TResponse,
  TParams,
  TError = PostgrestError,
> = Partial<{
  params: TParams
  options: QueryOptions<TResponse, TError>
}>

export type UseMutationProps<TResponse, TParams, TError> = Partial<
  MutationOptions<TResponse, Partial<TParams>, TError>
>

export type UseFileUrlProps<TParams> = Partial<{
  params: TParams
  options: FileUrlOptions
}>

export type UseUploadProps = {
  storageType: StorageType
} & Partial<UploadOptions>
