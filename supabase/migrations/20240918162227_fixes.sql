drop policy "Accepted requests are viewable by everyone" on "public"."match_requests";

drop policy "Owners can accept or refuse pending request" on "public"."match_requests";

drop policy "Pending/Rejected requests are viewable by captains or owners" on "public"."match_requests";

drop policy "Owners can delete their own matches" on "public"."matches";

drop policy "Owners can update their own matches" on "public"."matches";

drop policy "Captains and players can see messages" on "public"."messages";

drop policy "Owners and players can add message" on "public"."messages";

drop policy "Users can create match_requests" on "public"."match_requests";

create policy "Captains can accept or refuse pending request"
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


create policy "Requests are viewable by everyone"
on "public"."match_requests"
as permissive
for select
to public
using (true);


create policy "Captains can delete their own matches"
on "public"."matches"
as permissive
for delete
to authenticated
using (((EXISTS ( SELECT 1
   FROM match_requests
  WHERE ((match_requests.match_id = matches.id) AND (match_requests.user_id = auth.uid()) AND (match_requests.is_owner = true)))) AND (datetime < now())));


create policy "Captains can update their own matches"
on "public"."matches"
as permissive
for update
to authenticated
using ((EXISTS ( SELECT 1
   FROM match_requests
  WHERE ((match_requests.match_id = matches.id) AND (match_requests.user_id = auth.uid()) AND (match_requests.is_owner = true)))));


create policy "Match players can add message"
on "public"."messages"
as permissive
for insert
to authenticated
with check ((match_id IN ( SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));


create policy "Match players can see messages"
on "public"."messages"
as permissive
for select
to authenticated
using ((match_id IN ( SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));


create policy "Users can create match_requests"
on "public"."match_requests"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM matches
  WHERE ((matches.id = match_requests.match_id) AND (matches.datetime > now())))));




