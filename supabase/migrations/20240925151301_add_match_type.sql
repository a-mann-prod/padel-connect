create type "public"."match_type" as enum ('LEISURE', 'COMPETITION');

alter table "public"."match_filters" add column "type" match_type;

alter table "public"."matches" drop column "is_competition";

alter table "public"."matches" add column "type" match_type not null default 'LEISURE'::match_type;

alter table "public"."tournaments" alter column "type" set data type match_type using "type"::text::match_type;

alter table "public"."tournaments" alter column "type" set default 'LEISURE'::match_type;

drop type "public"."tournament_type";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_match_request_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$DECLARE
  count integer;
BEGIN
  SELECT count(*) INTO count
  FROM match_requests
  WHERE match_requests.match_id = NEW.match_id AND match_requests.STATUS = 'ACCEPTED'::match_request_status;

  IF NEW.STATUS = 'ACCEPTED' AND count >= 4 THEN
    RAISE EXCEPTION 'MATCH_FULL';
  END IF;

  return NEW;
END;$function$
;



