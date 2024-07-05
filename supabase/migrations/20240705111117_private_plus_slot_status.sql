create type "public"."match_slot_status" as enum ('AVAILABLE', 'BOOKED', 'UNAVAILABLE');

alter table "public"."matches" drop column "booked_url";

alter table "public"."matches" add column "is_private" boolean not null default false;

alter table "public"."matches" add column "slot_status" match_slot_status;



