## Important cmd

### Default

`supabase start`

`supabase stop` (--no-backup to clear db)

`supabase gen types typescript --local  > types/supabase.ts` to generate supabase types from local

### Link local & prod

`supabase link --project-ref <project-id>` \<project-id\> can be found from project's dashboard URL: https://supabase.com/dashboard/project/\<project-id\>

`supabase db pull` This will erase local db and replace it by prod db

`supabase db pull --schema auth,storage` This will pull all schema (auth and storage are exluded by default)

`supabase db pull --schema auth` This will pull only auth schema (with RLS policies)

`supabase db pull --schema storage` Same for bucket storage

`supabase migration up` Apply migration to local

### Deploy to prod

`supabase db diff | supabase migration new <migration_name>` Create local migration

`supabase db push` Push migration to prod

`supabase functions deploy <function_name>`

## For more info

- [how to config.toml](https://supabase.com/docs/guides/cli/config)
- [how to local dev](https://supabase.com/docs/guides/cli/local-development)
