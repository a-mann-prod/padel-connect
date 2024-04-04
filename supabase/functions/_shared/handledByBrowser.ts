import { corsHeaders } from "./cors.ts";

export const handledByBrowser = (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
};
