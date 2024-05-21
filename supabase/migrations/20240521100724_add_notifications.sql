drop policy "User can update their own favorites" on "public"."favorite_users";

drop policy "Captains and players can add message" on "public"."messages";

drop policy "Captains and players can see messages" on "public"."messages";

create table "public"."match_filters" (
    "user_id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "min_level" smallint,
    "max_level" smallint
);


alter table "public"."match_filters" enable row level security;

alter table "public"."profiles" add column "is_new_match_notification_enabled" boolean default true;

alter table "public"."profiles" add column "is_new_message_notification_enabled" boolean default true;

alter table "public"."profiles" add column "language" text;

alter table "public"."profiles" add column "push_token" text;

CREATE UNIQUE INDEX match_filters_pkey ON public.match_filters USING btree (user_id);

alter table "public"."match_filters" add constraint "match_filters_pkey" PRIMARY KEY using index "match_filters_pkey";

alter table "public"."match_filters" add constraint "public_match_filters_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."match_filters" validate constraint "public_match_filters_user_id_fkey";

grant delete on table "public"."match_filters" to "anon";

grant insert on table "public"."match_filters" to "anon";

grant references on table "public"."match_filters" to "anon";

grant select on table "public"."match_filters" to "anon";

grant trigger on table "public"."match_filters" to "anon";

grant truncate on table "public"."match_filters" to "anon";

grant update on table "public"."match_filters" to "anon";

grant delete on table "public"."match_filters" to "authenticated";

grant insert on table "public"."match_filters" to "authenticated";

grant references on table "public"."match_filters" to "authenticated";

grant select on table "public"."match_filters" to "authenticated";

grant trigger on table "public"."match_filters" to "authenticated";

grant truncate on table "public"."match_filters" to "authenticated";

grant update on table "public"."match_filters" to "authenticated";

grant delete on table "public"."match_filters" to "service_role";

grant insert on table "public"."match_filters" to "service_role";

grant references on table "public"."match_filters" to "service_role";

grant select on table "public"."match_filters" to "service_role";

grant trigger on table "public"."match_filters" to "service_role";

grant truncate on table "public"."match_filters" to "service_role";

grant update on table "public"."match_filters" to "service_role";

create policy "Users can update their own favorites"
on "public"."favorite_users"
as permissive
for update
to authenticated
using ((auth.uid() = user_id));


create policy "Users can add match filter"
on "public"."match_filters"
as permissive
for insert
to public
with check (true);


create policy "Users can update their own match filters"
on "public"."match_filters"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Users can view their own match filters"
on "public"."match_filters"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Captains and players can add message"
on "public"."messages"
as permissive
for insert
to anon, authenticated
with check ((match_id IN ( SELECT matches.id
   FROM matches
  WHERE (matches.owner_id = auth.uid())
UNION
 SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));


create policy "Captains and players can see messages"
on "public"."messages"
as permissive
for select
to anon, authenticated
using ((match_id IN ( SELECT matches.id
   FROM matches
  WHERE (matches.owner_id = auth.uid())
UNION
 SELECT match_requests.match_id
   FROM match_requests
  WHERE ((match_requests.user_id = auth.uid()) AND (match_requests.status = 'ACCEPTED'::match_request_status)))));




