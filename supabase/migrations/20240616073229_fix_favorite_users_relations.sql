alter table "public"."favorite_users" drop constraint "public_favorite_users_favorite_user_id_fkey";

alter table "public"."favorite_users" drop constraint "public_favorite_users_user_id_fkey";

alter table "public"."favorite_users" add constraint "public_favorite_users_favorite_user_id_fkey" FOREIGN KEY (favorite_user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."favorite_users" validate constraint "public_favorite_users_favorite_user_id_fkey";

alter table "public"."favorite_users" add constraint "public_favorite_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."favorite_users" validate constraint "public_favorite_users_user_id_fkey";



