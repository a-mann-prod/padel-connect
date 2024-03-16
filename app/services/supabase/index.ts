import { createClient } from '@supabase/supabase-js'

import 'react-native-url-polyfill/auto'
import { storage } from '../storage'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // TODO: Change it asap
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

export const supabase = createClient(
  // todo: remove cast
  process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
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
