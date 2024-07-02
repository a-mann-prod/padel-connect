import { StorageResponse } from './entities'
import { GetStorageParams } from './params'

import { supabase } from '@/services/supabase'

export const getStorageFn = (
  storageType: GetStorageParams = 'images'
): StorageResponse => supabase.storage.from(storageType)
