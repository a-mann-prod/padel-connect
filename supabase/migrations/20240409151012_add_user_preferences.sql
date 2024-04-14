create type "public"."manual_preference" as enum ('LEFT_HANDED', 'RIGHT_HANDED');

create type "public"."side_preference" as enum ('LEFT', 'RIGHT', 'BOTH');

alter table "public"."profiles" add column "manual_preference" manual_preference;

alter table "public"."profiles" add column "side_preference" side_preference;



