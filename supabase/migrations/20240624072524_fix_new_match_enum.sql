alter type "public"."notification" rename to "notification__old_version_to_be_dropped";

create type "public"."notification" as enum ('NEW_MESSAGE', 'NEW_MATCH', 'NEW_MATCH_REQUEST', 'MATCH_REQUEST_RESPONSE_ACCEPTED', 'MATCH_REQUEST_RESPONSE_REFUSED');

alter table "public"."notifications" alter column type type "public"."notification" using type::text::"public"."notification";

drop type "public"."notification__old_version_to_be_dropped";



