import * as Deno from "@deno/server";
import { corsHeaders } from "../_shared/cors.ts";
import { handledByBrowser } from "../_shared/handledByBrowser.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { supabaseClient } from "../_shared/supabaseClient.ts";

// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

console.log(`Function "user-self-deletion" up and running!`);

Deno.serve(async (req) => {
  handledByBrowser(req);

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const client = supabaseClient({
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      global: {
        headers: { Authorization: req.headers.get("Authorization")! },
      },
    });

    // Now we can get the session or user object
    await client.auth.getUser();

    // And we can run queries in the context of our authenticated user
    const { data: profiles, error: userError } = await client
      .from("profiles")
      .select("id, avatar_url");
    if (userError) throw userError;
    const user_id = profiles[0].id;
    const user_avatar = profiles[0].avatar_url;

    const clientAdmin = supabaseAdmin();
    // Delete avatar if found
    if (user_avatar) {
      const { data: avatar_deletion, error: avatar_error } =
        await clientAdmin.storage.from("avatars").remove([user_avatar.name]);
      if (avatar_error) throw avatar_error;
      console.log(
        "Avatar deleted: " + JSON.stringify(avatar_deletion, null, 2)
      );
    }

    // Delete user info
    if (user_id) {
      const { error: deletion_error } = await clientAdmin.auth.admin.deleteUser(
        user_id
      );

      if (deletion_error) throw deletion_error;
      console.log("User & files deleted user_id: " + user_id);
    }

    return new Response(null, {
      headers: { ...corsHeaders },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
