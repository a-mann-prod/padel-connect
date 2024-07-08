set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_new_match_notified_users(match_level integer, match_owner_id uuid, match_complex_id integer)
 RETURNS TABLE(id uuid, language text)
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.language
    FROM 
        profiles p
    INNER JOIN 
        match_filters mf 
    ON 
        p.id = mf.user_id
    WHERE 
        p.id != match_owner_id::uuid
        AND p.is_new_match_notification_enabled = true
        AND (mf.complex_id = match_complex_id::integer OR mf.complex_id IS NULL)
        AND (
            mf.is_my_level_range = false 
            OR (
                mf.is_my_level_range = true 
                AND match_level::integer BETWEEN 
                    CASE 
                        WHEN FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) = 10 THEN 9
                        ELSE FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) - 1 
                    END
                    AND 
                    CASE 
                        WHEN FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) = 0 THEN 1
                        ELSE FLOOR((p.offense_level + p.defense_level + p.service_level) / 3) + 1 
                    END
            )
        );

END$function$
;

CREATE OR REPLACE FUNCTION public.mark_notifications_as_read(ids integer[])
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
  UPDATE public.notifications
  SET is_read = true
  WHERE id = ANY(ids);
end;$function$
;



