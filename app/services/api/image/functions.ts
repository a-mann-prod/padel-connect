import { supabase } from '@/services/supabase'
import { StorageResponse } from './entities'
import { GetStorageParams } from './params'

export const getStorageFn = (
  storageType: GetStorageParams = 'images'
): StorageResponse => supabase.storage.from(storageType)
