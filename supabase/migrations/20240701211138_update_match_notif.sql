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
        match_filters m 
    ON 
        p.id = m.user_id
    WHERE 
        p.id != match_owner_id::uuid
        AND p.is_new_match_notification_enabled = true
        AND (m.complex_id = match_complex_id::integer OR m.complex_id IS NULL)
        AND (
            m.is_my_level_range = false 
            OR (
                m.is_my_level_range = true 
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



