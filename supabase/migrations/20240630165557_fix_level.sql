alter table "public"."profiles" drop column "level";

alter table "public"."profiles" add column "defense_level" smallint;

alter table "public"."profiles" add column "offense_level" smallint;

alter table "public"."profiles" add column "service_level" smallint;



