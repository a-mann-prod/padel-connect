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

  // if private, do not add
  if (match.is_private)
    return new Response("Private match", {
      headers: { "Content-Type": "application/json" },
    });

  // get users
  const { data: users } = await clientAdmin
    .from("profiles")
    .select(
      "id, language, match_filters!inner(user_id), match_requests(user_id)"
    )
    .eq("match_requests.is_owner", false)
    .eq("is_new_match_notification_enabled", true);
  // a revoir
  // .or(
  //   `match_filters.complex_id.eq.${match.complex_id}, match_filters.complex_id.is.null`
  // );
  //   .gte("match_filters.level_range[0]", match.level) // match.level >= min
  //   .lte("match_filters.level_range[1]", match.level); // match.level <= max

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
