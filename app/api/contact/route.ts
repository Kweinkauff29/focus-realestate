export async function POST(request: Request) {
  const form = await request.formData();
  const payload = Object.fromEntries([...form.entries()].map(([key, value]) => [key, String(value)]));
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return Response.json({ ok: false, message: "We could not submit your request. Please call 239-297-2777." }, { status: 502 });
  }

  return Response.redirect(new URL("/contact-us?sent=1", request.url), 303);
}

