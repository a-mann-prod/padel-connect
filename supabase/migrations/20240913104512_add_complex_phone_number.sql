drop policy "Users can update their own requests (to del and replace by fn)" on "public"."match_requests";

alter table "public"."complexes" add column "phone_number" text;

create policy "Users can update their own requests (to del cuz used 2 pay)"
on "public"."match_requests"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));




