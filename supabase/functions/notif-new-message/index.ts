import { corsHeaders } from "../_shared/cors.ts";
import { handledByBrowser } from "../_shared/handledByBrowser.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { getUsername } from "../_shared/user.ts";

interface Message {
  id: number;
  content: string;
  sender_id: string;
  match_id: number;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Message;
  schema: "public";
  old_record: null | Message;
}

Deno.serve(async (req) => {
  handledByBrowser(req);

  const clientAdmin = supabaseAdmin();

  const expoNotifUrl = Deno.env.get("EXPO_NOTIF_URL") || "";
  const expoNotifToken = Deno.env.get("EXPO_NOTIF_TOKEN") || "";

  const payload: WebhookPayload = await req.json();

  const record = payload.record;

  // get sender name
  const { data: sender } = await clientAdmin
    .from("profiles")
    .select("id, first_name, last_name")
    .eq("id", record.sender_id)
    .maybeSingle();

  const senderName = getUsername(sender?.first_name, sender?.last_name);

  // get users to be notified on match insert
  const { data: users } = await clientAdmin
    .from("profiles")
    .select(
      "id, first_name, last_name, push_token, language, match_requests!inner(user_id)"
    )
    .neq("push_token", null)
    .neq("id", record.sender_id)
    .eq("is_new_message_notification_enabled", true)
    .eq("match_requests.match_id", record.match_id)
    .eq("match_requests.status", "ACCEPTED");

  if (!users?.length) {
    return new Response(JSON.stringify({ errorCode: "user_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const promises = users.map((u) => {
    return fetch(expoNotifUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${expoNotifToken}`,
      },
      body: JSON.stringify({
        to: u.push_token,
        sound: "default",
        title: senderName,
        body: record.content,
      }),
    });
  });

  Promise.all(promises);

  return new Response("done", {
    headers: { "Content-Type": "application/json" },
  });
});
