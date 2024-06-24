import { corsHeaders } from "../_shared/cors.ts";
import { Database } from "../_shared/database.types.ts";
import { handledByBrowser } from "../_shared/handledByBrowser.ts";
import { routing } from "../_shared/routing.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { Language, translations } from "../_shared/translations.ts";

type Match = Database["public"]["Tables"]["matches"]["Row"];
type Notification = Database["public"]["Tables"]["notifications"]["Insert"];

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Match;
  schema: "public";
  old_record: null | Match;
}

Deno.serve(async (req) => {
  handledByBrowser(req);

  const clientAdmin = supabaseAdmin();

  // match newly added
  const payload: WebhookPayload = await req.json();
  const match = payload.record;

  // get users to be notified on match insert
  const { data: users } = await clientAdmin
    .from("profiles")
    .select("id, language, match_filters!inner(user_id)")
    .neq("id", match.owner_id)
    .eq("is_new_match_notification_enabled", true)
    .lte("match_filters.min_level", match.level)
    .gte("match_filters.max_level", match.level);

  if (!users?.length) {
    return new Response(JSON.stringify({ errorCode: "users_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const rowsToInsert: Notification[] = users.map((u) => {
    const language: Language = u.language || "en";

    return {
      title: translations[language].newMatch.title,
      subtitle: translations[language].newMatch.body,
      url: routing.match.path(match.id),
      user_id: u.id,
      type: "NEW_MATCH",
    };
  });

  // Insert notifications
  await clientAdmin.from("notifications").insert(rowsToInsert);

  return new Response("done", {
    headers: { "Content-Type": "application/json" },
  });
});
