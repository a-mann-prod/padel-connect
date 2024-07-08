set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.mark_notifications_as_read(ids integer[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
  UPDATE notifications
  SET is_read = true
  WHERE id = ANY(ids);
end;$function$
;

