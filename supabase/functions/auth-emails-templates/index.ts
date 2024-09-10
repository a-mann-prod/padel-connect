import { Webhook } from "@standardwebhooks";
import { EmailOtpType, User } from "@supabase/supabase-js";
import { Language } from "../_shared/translations.ts";
import { authEmailTranslations } from "./templates.ts";

type EmailData = {
  token: string;
  token_hash: string;
  redirect_to: string;
  email_action_type: EmailOtpType;
  site_url: string;
  token_new: string;
  token_hash_new: string;

  confirmation_url: string;
  email: string;
  new_email: string;
};

const SENDER = {
  name: "padel-connect",
  email: "no-reply@padel-connect.com",
};

Deno.serve(async (req) => {
  const payload = await req.text();
  const mailerToken = Deno.env.get("MAILER_TOKEN");
  const mailerEndpoint = Deno.env.get("MAILER_ENDPOINT");
  const base64Secret = Deno.env.get("AUTH_SEND_EMAIL_HOOK_SECRET");

  console.log("payload", payload);

  if (!mailerEndpoint || !mailerToken)
    return new Response(
      JSON.stringify({
        error: `Failed to process the request: Mailer endpoint or token not found`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  if (!base64Secret)
    return new Response(
      JSON.stringify({
        error: `Failed to process the request: Base64Secret not found`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const headers = Object.fromEntries(req.headers);
  const wh = new Webhook(base64Secret);

  console.log("webhook", wh);

  const { user, email_data } = wh.verify(payload, headers) as {
    user: User;
    email_data: EmailData;
  };

  console.log("user to get language", user);
  const language: Language =
    (user.user_metadata && user.user_metadata.i18n) || "en";

  console.log("email_data", email_data);

  const subject =
    authEmailTranslations.subjects[language][email_data.email_action_type];
  const body =
    authEmailTranslations.bodies[language][email_data.email_action_type];

  const htmlContent = body
    .replace("{{confirmation_url}}", email_data.confirmation_url)
    .replace("{{token}}", email_data.token || "")
    .replace("{{new_token}}", email_data.token_new || "")
    .replace("{{site_url}}", email_data.site_url || "")
    .replace("{{old_email}}", email_data.email || "")
    .replace("{{new_email}}", email_data.new_email || "");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "api-key": mailerToken,
    },
    body: JSON.stringify({
      sender: SENDER,
      to: [{ email: user.email }],
      subject,
      htmlContent,
    }),
  };

  try {
    const response = await fetch(mailerEndpoint, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to send email: ${errorData.Message}`);
    }
    return new Response(
      JSON.stringify({
        message: "Email sent successfully.",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to process the request: ${error.message}`,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
});
