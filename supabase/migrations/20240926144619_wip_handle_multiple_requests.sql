alter table "public"."match_requests" add column "invite_status" match_request_status not null default 'PENDING'::match_request_status;

alter table "public"."match_requests" add column "request_id" uuid not null default gen_random_uuid();

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_match()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin    
  insert into public.match_requests (match_id, user_id, is_owner, status, invite_status)
  values (new.id, auth.uid(), true, 'ACCEPTED', 'ACCEPTED');

  return new;
end;$function$
;



