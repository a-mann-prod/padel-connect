import Constants from 'expo-constants'

export type Env = 'local' | 'preview' | 'production'

export const config = {
  env: process.env.EXPO_PUBLIC_ENV as Env,
  version: Constants.expoConfig?.version,
  sentryUrl: process.env.EXPO_PUBLIC_SENTRY_URL as string,
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL as string,
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string,
  reversedClientId: process.env.EXPO_PUBLIC_REVERSED_CLIENT_ID as string,
}
