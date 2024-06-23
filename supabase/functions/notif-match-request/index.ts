import { corsHeaders } from "../_shared/cors.ts";
import { Database } from "../_shared/database.types.ts";
import { handledByBrowser } from "../_shared/handledByBrowser.ts";
import { routing } from "../_shared/routing.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { Language, translations } from "../_shared/translations.ts";

type MatchRequest = Database["public"]["Tables"]["match_requests"]["Row"];
type Notification = Database["public"]["Tables"]["notifications"]["Insert"];

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: MatchRequest;
  schema: "public";
  old_record: null | MatchRequest;
}

Deno.serve(async (req) => {
  handledByBrowser(req);

  const clientAdmin = supabaseAdmin();

  // match request newly added
  const payload: WebhookPayload = await req.json();
  const matchRequest = payload.record;

  // get owner to be notified on match request insert
  const { data: user } = await clientAdmin
    .from("profiles")
    .select(
      "id, language, matches!public_matches_owner_id_fkey!inner(owner_id)"
    )
    .eq("matches.id", matchRequest.match_id)
    .maybeSingle();

  if (!user) {
    return new Response(JSON.stringify({ errorCode: "user_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const language: Language = user.language || "en";

  const rowToInsert: Notification = {
    title: translations[language].newMatchRequest.title,
    subtitle: translations[language].newMatchRequest.body,
    url: routing.matchPlayersManage.path(matchRequest.match_id),
    user_id: user.id,
    type: "NEW_MATCH_REQUEST",
  };

  // Insert notifications
  await clientAdmin.from("notifications").insert(rowToInsert);

  return new Response("done", {
    headers: { "Content-Type": "application/json" },
  });
});
