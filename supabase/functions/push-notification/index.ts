import { corsHeaders } from "../_shared/cors.ts";
import { Database } from "../_shared/database.types.ts";
import { handledByBrowser } from "../_shared/handledByBrowser.ts";
import { supabaseAdmin } from "../_shared/supabaseAdmin.ts";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Notification;
  schema: "public";
  old_record: null | Notification;
}

// how lbc notifications r working ? Trigger first time then wait 15-30mn
// (if another notific need to be fired) and send notif anyway
Deno.serve(async (req) => {
  handledByBrowser(req);

  const clientAdmin = supabaseAdmin();

  const expoNotifUrl = Deno.env.get("EXPO_NOTIF_URL") || "";
  const expoNotifToken = Deno.env.get("EXPO_NOTIF_TOKEN") || "";

  // notification newly added
  const payload: WebhookPayload = await req.json();
  const notification = payload.record;

  // get user to be notified
  const { data: user } = await clientAdmin
    .from("profiles")
    .select("push_token")
    .eq("id", payload.record.user_id)
    .neq("push_token", null)
    .maybeSingle();

  if (!user) {
    return new Response(JSON.stringify({ errorCode: "user_not_found" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }

  // send notification
  await fetch(expoNotifUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${expoNotifToken}`,
    },
    body: JSON.stringify({
      to: user.push_token,
      _contentAvailable: true, // used for background notifications
      sound: "default",
      title: notification.title,
      body: notification.subtitle,
      data: {
        id: notification.id, // used to make notification as read
        url: notification.url,
      },
    }),
  });

  return new Response("Notification sent", {
    headers: { "Content-Type": "application/json" },
  });
});
