drop policy "Captains can accept or refuse pending request" on "public"."match_requests";

drop policy "Users can requests match (captains can't)" on "public"."match_requests";

drop policy "Users can delete their own matches" on "public"."matches";

drop policy "Users can update their own matches" on "public"."matches";

drop policy "Captains and players can add message" on "public"."messages";

drop policy "Pending/Rejected requests are viewable by captains or owners" on "public"."match_requests";

drop policy "Captains and players can see messages" on "public"."messages";

alter table "public"."matches" drop constraint "public_matches_owner_id_fkey";

drop function if exists "public"."get_new_match_notified_users"(match_level integer, match_owner_id uuid, match_complex_id integer);

alter table "public"."match_requests" add column "is_owner" boolean not null default false;

alter table "public"."matches" drop column "owner_id";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_new_match_notified_users(match_level integer, match_complex_id integer)
 RETURNS TABLE(id uuid, language text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.language
    FROM 
        profiles p
    INNER JOIN 
        match_filters m 
    ON 
        p.id = m.user_id
    INNER JOIN
        match_requests mr
    ON
        mr.match_id = match_complex_id::integer
    WHERE 
        mr.is_owner = true
        AND m.is_private = false 
        AND p.id != mr.user_id
        AND p.is_new_match_notification_enabled = true
        AND (m.complex_id = match_complex_id::integer OR m.complex_id IS NULL)
        AND (
            m.is_my_level_range = false 
            OR (
                m.is_my_level_range = true 
                AND match_level::integer BETWEEN 
                    CASE 
                        WHEN FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) = 10 THEN 9
                        ELSE FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) - 1 
                    END
                    AND 
                    CASE 
                        WHEN FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) = 0 THEN 1
                        ELSE FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) + 1 
                    END
            )
        );

END$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_match()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin    
  insert into public.match_requests (match_id, user_id, is_owner, status)
  values (new.id, auth.uid(), true, 'ACCEPTED');

  return new;
end;$function$
;

create policy "Owners can accept or refuse pending request"
on "public"."match_requests"
as permissive
for update
to authenticated
using (((status = 'PENDING'::match_request_status) AND (EXISTS ( SELECT 1
   FROM match_requests owner_requests
  WHERE ((owner_requests.match_id = match_requests.match_id) AND (owner_requests.user_id = auth.uid()) AND (owner_requests.is_owner = true))))))
with check (((status = 'PENDING'::match_request_status) AND (EXISTS ( SELECT 1
   FROM match_requests owner_requests
  WHERE ((owner_requests.match_id = match_requests.match_id) AND (owner_requests.user_id = auth.uid()) AND (owner_requests.is_owner = true))))));


create policy "Users can create match_requests"
on "public"."match_requests"
as permissive
for insert
to authenticated
with check (true);


create policy "Owners can delete their own matches"
on "public"."matches"
as permissive
for delete
to authenticated
using ((EXISTS ( SELECT 1
   FROM match_requests
  WHERE ((match_requests.match_id = matches.id) AND (match_requests.user_id = auth.uid()) AND (match_requests.is_owner = true)))));


create policy "Owners can update their own matches"
on "public"."matches"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM match_requests
  WHERE ((match_requests.match_id = matches.id) AND (match_requests.user_id = auth.uid()) AND (match_requests.is_owner = true)))));


create policy "Owners and players can add message"
on "public"."messages"
as permissive
for insert
to anon, authenticated
with check ((match_id IN ( SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));


create policy "Pending/Rejected requests are viewable by captains or owners"
on "public"."match_requests"
as permissive
for select
to authenticated
using (((status <> 'ACCEPTED'::match_request_status) AND ((user_id = auth.uid()) OR (is_owner = true))));


create policy "Captains and players can see messages"
on "public"."messages"
as permissive
for select
to anon, authenticated
using ((match_id IN ( SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));


CREATE TRIGGER handle_new_match AFTER INSERT ON public.matches FOR EACH ROW EXECUTE FUNCTION handle_new_match();



