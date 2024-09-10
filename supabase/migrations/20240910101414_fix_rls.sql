drop policy "Accepted requests are viewable by everyone" on "public"."match_requests";

drop policy "Captains and players can see messages" on "public"."messages";

drop policy "Owners and players can add message" on "public"."messages";

create policy "Accepted requests are viewable by everyone"
on "public"."match_requests"
as permissive
for select
to public
using ((status = 'ACCEPTED'::match_request_status));


create policy "Captains and players can see messages"
on "public"."messages"
as permissive
for select
to authenticated
using ((match_id IN ( SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));


create policy "Owners and players can add message"
on "public"."messages"
as permissive
for insert
to authenticated
with check ((match_id IN ( SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));




