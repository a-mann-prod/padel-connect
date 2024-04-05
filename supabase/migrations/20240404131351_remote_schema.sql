create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'avatars'::text) AND (name = ( SELECT profiles.avatar_url
   FROM profiles
  WHERE (profiles.id = auth.uid())))));


  
