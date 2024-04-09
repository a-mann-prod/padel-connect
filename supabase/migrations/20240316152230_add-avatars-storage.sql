INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id") VALUES
	('avatars', 'avatars', NULL, '2024-03-16 14:51:51.483596+00', '2024-03-16 14:51:51.483596+00', true, false, 2097152, '{image/*}', NULL);

create policy "Everyone can see avatars."
on "storage"."objects"
as permissive
for select
to public
using (bucket_id = 'avatars'::text);

create policy "Everyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check (bucket_id = 'avatars'::text);

create policy "Users can delete their own avatar"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'avatars'::text) AND (name = ( SELECT profiles.avatar_url
   FROM profiles
  WHERE (profiles.id = auth.uid())))));