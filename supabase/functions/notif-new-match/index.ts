import { corsHeaders } from "../_shared/cors.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { Language, translations } from "../_shared/translations.ts";

interface Match {
  id: number;
  level: number;
  duration: number;
  datetime: string;
  owner_id: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Match;
  schema: "public";
  old_record: null | Match;
}

const clientAdmin = supabaseAdmin();

const expoNotifUrl = Deno.env.get("EXPO_NOTIF_URL") || "";
const expoNotifToken = Deno.env.get("EXPO_NOTIF_TOKEN") || "";

// how lbc notifications r working ? Trigger first time then wait 15-30mn
// (if another notific need to be fired) and send notif anyway
Deno.serve(async (req) => {
  const payload: WebhookPayload = await req.json();

  const record = payload.record;

  // get users to be notified on match insert
  const { data: users } = await clientAdmin
    .from("profiles")
    .select("id, push_token, language, match_filters!inner(user_id)")
    .neq("push_token", null)
    .neq("id", record.owner_id)
    .eq("is_new_match_notification_enabled", true)
    .lte("match_filters.min_level", record.level)
    .gte("match_filters.max_level", record.level);

  if (!users?.length) {
    return new Response(JSON.stringify({ errorCode: "user_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const promises = users.map((u) => {
    const language = (u.language || "en") as Language;

    console.log("user", u);

    return fetch(expoNotifUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${expoNotifToken}`,
      },
      body: JSON.stringify({
        to: u.push_token,
        sound: "default",
        title: translations[language].newMatch.title,
        body: translations[language].newMatch.body,
      }),
    });
  });

  Promise.all(promises);

  return new Response("done", {
    headers: { "Content-Type": "application/json" },
  });
});
