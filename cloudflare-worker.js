// Cloudflare Worker — proxy + sync para Finzn
// 1) Oculta la API Key de Groq, solo acepta requests desde finzn.pages.dev
// 2) Guarda/lee un respaldo de tus datos en Cloudflare KV para sincronizar entre tus dispositivos
//
// DEPLOY (dashboard, sin CLI):
// 1. dash.cloudflare.com → Workers & Pages → finzn-proxy → Edit code → pega este archivo completo → Deploy
// 2. Settings → Variables and Secrets → confirma que GROQ_API_KEY ya esté (Secret)
// 3. Settings → Bindings → Add binding → KV Namespace:
//      - Si no tienes namespace: Create new → nómbralo "finzn-sync" → Create
//      - Variable name (importante, debe ser EXACTO): FINZN_KV
//    → Deploy

async function hashCode(code) {
  const enc = new TextEncoder().encode(code);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const isAllowed = origin === "https://finzn.pages.dev"
      || origin.endsWith(".finzn.pages.dev");

    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowed ? origin : "",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (!isAllowed) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };

    // --- SYNC: guardar respaldo en la nube ---
    if (url.pathname === "/sync/save" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) {
        return new Response("Bad JSON", { status: 400, headers: corsHeaders });
      }
      if (!body.code || typeof body.code !== "string" || !body.data) {
        return new Response("Bad request", { status: 400, headers: corsHeaders });
      }
      const key = "sync:" + await hashCode(body.code);
      await env.FINZN_KV.put(key, JSON.stringify(body.data));
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders });
    }

    // --- SYNC: bajar respaldo de la nube ---
    if (url.pathname === "/sync/load" && request.method === "GET") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Bad request", { status: 400, headers: corsHeaders });
      }
      const key = "sync:" + await hashCode(code);
      const stored = await env.FINZN_KV.get(key);
      if (!stored) {
        return new Response(JSON.stringify({ found: false }), { status: 200, headers: jsonHeaders });
      }
      return new Response(JSON.stringify({ found: true, data: JSON.parse(stored) }), { status: 200, headers: jsonHeaders });
    }

    // --- PROXY de Groq para el análisis de IA ---
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response("Bad JSON", { status: 400, headers: corsHeaders });
    }

    const prompt = body.prompt;
    if (!prompt || typeof prompt !== "string" || prompt.length > 6000) {
      return new Response("Bad request", { status: 400, headers: corsHeaders });
    }

    try {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + env.GROQ_API_KEY,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await groqRes.text();
      return new Response(data, {
        status: groqRes.status,
        headers: jsonHeaders,
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  },
};
