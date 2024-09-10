drop policy "Accepted requests are viewable by everyone" on "public"."match_requests";

alter table "public"."match_requests" add column "has_payed" boolean not null default false;

alter table "public"."match_requests" add column "is_guest" boolean not null default false;

create policy "Users can update their own requests (to del and replace by fn)"
on "public"."match_requests"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Accepted requests are viewable by everyone"
on "public"."match_requests"
as permissive
for select
to anon
using ((status = 'ACCEPTED'::match_request_status));




