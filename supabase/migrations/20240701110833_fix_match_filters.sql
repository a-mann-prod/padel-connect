alter table "public"."match_filters" drop column "max_level";

alter table "public"."match_filters" drop column "min_level";

alter table "public"."match_filters" add column "complex_id" smallint;

alter table "public"."match_filters" add column "is_my_level_range" boolean not null default false;

alter table "public"."match_filters" add constraint "public_match_filters_complex_id_fkey" FOREIGN KEY (complex_id) REFERENCES complexes(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."match_filters" validate constraint "public_match_filters_complex_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, is_onboarding_completed)
  values (new.id, false);
  
  insert into public.match_filters (id)
  values (new.id);

  return new;
end;
$function$
;

drop policy "Users can add match filter" on "public"."match_filters";



