alter table "public"."matches" alter column "owner_id" drop not null;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin    
  insert into public.profiles (id, is_onboarding_completed)
  values (new.id, false);

  insert into public.match_filters (user_id)
  values (new.id);

  return new;
end;
$function$
;



