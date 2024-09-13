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

  // match request newly updated
  const payload: WebhookPayload = await req.json();
  const matchRequest = payload.record;

  // maybe to remove when adapted to 4Padel ?
  if (payload.old_record?.has_payed !== matchRequest.has_payed) {
    return new Response("No request response notification if user has payed", {
      headers: { "Content-Type": "application/json" },
    });
  }

  // get users to be notified on match request update
  const { data: user } = await clientAdmin
    .from("profiles")
    .select("id, language")
    .eq("id", matchRequest.user_id)
    .maybeSingle();

  if (!user) {
    return new Response(JSON.stringify({ errorCode: "user_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const language: Language = user.language || "en";

  const partialNotification: Pick<Notification, "title" | "subtitle" | "type"> =
    matchRequest.status === "ACCEPTED"
      ? {
          title: translations[language].matchRequestAccepted.title,
          subtitle: translations[language].matchRequestAccepted.body,
          type: "MATCH_REQUEST_RESPONSE_ACCEPTED",
        }
      : {
          title: translations[language].matchRequestRefused.title,
          subtitle: translations[language].matchRequestRefused.body,
          type: "MATCH_REQUEST_RESPONSE_REFUSED",
        };

  const rowToInsert: Notification = {
    ...partialNotification,
    url: routing.match.path(matchRequest.match_id),
    user_id: user.id,
  };

  // Insert notifications
  await clientAdmin.from("notifications").insert(rowToInsert);

  return new Response("done", {
    headers: { "Content-Type": "application/json" },
  });
});
