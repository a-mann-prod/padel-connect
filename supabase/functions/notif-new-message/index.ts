import { corsHeaders } from "../_shared/cors.ts";
import { Database } from "../_shared/database.types.ts";
import { handledByBrowser } from "../_shared/handledByBrowser.ts";
import { routing } from "../_shared/routing.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";
import { getUsername } from "../_shared/user.ts";

type Message = Database["public"]["Tables"]["messages"]["Row"];
type Notification = Database["public"]["Tables"]["notifications"]["Insert"];

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

  // message newly added
  const payload: WebhookPayload = await req.json();
  const message = payload.record;

  // get sender name
  const { data: sender } = await clientAdmin
    .from("profiles")
    .select("id, first_name, last_name")
    .eq("id", message.sender_id)
    .maybeSingle();

  const senderName = getUsername(sender?.first_name, sender?.last_name);

  // get players to be notified on new message
  const { data: players } = await clientAdmin
    .from("profiles")
    .select("id, language, match_requests!inner(user_id)")
    .neq("id", message.sender_id)
    .eq("match_requests.match_id", message.match_id)
    .eq("match_requests.status", "ACCEPTED")
    .eq("is_new_message_notification_enabled", true);

  const users = players || [];

  if (!users.length) {
    return new Response(JSON.stringify({ errorCode: "users_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  const rowsToInsert: Notification[] = users.map((u) => ({
    title: senderName,
    subtitle: message.content,
    url: routing.matchChat.path(message.match_id as number),
    user_id: u.id,
    type: "NEW_MESSAGE",
  }));

  // Insert notifications
  await clientAdmin.from("notifications").insert(rowsToInsert);

  return new Response("done", {
    headers: { "Content-Type": "application/json" },
  });
});
