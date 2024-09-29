alter table "public"."match_filters" drop column "level_range";

alter table "public"."match_filters" add column "level_max" smallint not null default '10'::smallint;

alter table "public"."match_filters" add column "level_min" smallint not null default '0'::smallint;



