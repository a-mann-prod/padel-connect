alter table "public"."profiles" alter column "defense_level" set data type real using "defense_level"::real;

alter table "public"."profiles" alter column "offense_level" set data type real using "offense_level"::real;

alter table "public"."profiles" alter column "service_level" set data type real using "service_level"::real;



