import { Provider, SignInWithPasswordCredentials } from '@supabase/supabase-js'

export type LoginParams = SignInWithPasswordCredentials

export type LoginWithOAuthParams = Extract<Provider, 'google' | 'apple'>
