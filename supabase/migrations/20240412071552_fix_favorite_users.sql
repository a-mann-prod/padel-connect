alter table "public"."favorite_users" drop constraint "favorite_users_pkey";

drop index if exists "public"."favorite_users_pkey";

alter table "public"."favorite_users" drop column "id";

alter table "public"."favorite_users" alter column "favorite_user_id" set not null;

alter table "public"."favorite_users" alter column "user_id" set not null;

alter table "public"."profiles" alter column "created_at" set not null;

CREATE UNIQUE INDEX favorite_users_pkey ON public.favorite_users USING btree (user_id, favorite_user_id);

alter table "public"."favorite_users" add constraint "favorite_users_pkey" PRIMARY KEY using index "favorite_users_pkey";



