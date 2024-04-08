import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

import { config } from '../config'
import { storage } from '../storage'
import { Database } from './database.types'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // TODO: Change it asap
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

export const supabase = createClient<Database>(
  config.supabaseUrl,
  config.supabaseAnonKey,
  {
    auth: {
      storage,
    },
    global: {
      headers: {
        ...corsHeaders,
      },
    },
  }
)
