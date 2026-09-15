-- Notification dispatch (in-app / email / mobile).

const CHANNELS = new Set(["in_app", "email", "mobile"]);

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await request.json().catch(() => ({}));
  const channel = body.channel ?? "in_app";

  if (!CHANNELS.has(channel)) {
    return Response.json({ error: "Unsupported notification channel" }, { status: 400 });
  }

  if (!body.user_id) {
    return Response.json({ error: "user_id is required" }, { status: 400 });
  }

  return Response.json({
    source: "notify",
    status: "queued",
    channel,
    user_id: body.user_id,
  });
});
