drop policy "Users can update their own match filters" on "public"."match_filters";

alter table "public"."match_filters" drop column "is_my_level_range";

alter table "public"."match_filters" add column "level_range" smallint[] not null default '{0,10}'::smallint[];

create policy "Users can update their own match filters"
on "public"."match_filters"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));




