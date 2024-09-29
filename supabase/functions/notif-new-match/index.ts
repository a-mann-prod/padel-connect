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

  // get owners
  const { data: owners } = await clientAdmin
    .from("match_requests")
    .select("user_id")
    .eq("match_id", 31)
    .eq("is_owner", true);

  const ownerIds = owners?.map(({ user_id }) => user_id) || [];

  // get users
  const { data: users, error } = await clientAdmin
    .from("profiles")
    .select("id, language, match_filters!inner(user_id)")
    .not("id", "in", `(${ownerIds})`)
    .eq("is_new_match_notification_enabled", true)
    .or(`complex_id.eq.${match.complex_id}, complex_id.is.null`, {
      foreignTable: "match_filters",
    })
    .lte("match_filters.level_min", match.level)
    .gte("match_filters.level_max", match.level);

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
