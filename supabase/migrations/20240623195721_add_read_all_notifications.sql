set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.mark_all_notifications_as_read()
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
  UPDATE public.notifications
  SET is_read = true
  WHERE user_id = auth.uid();
END;
$function$
;



