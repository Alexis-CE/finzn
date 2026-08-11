// Cloudflare Worker — proxy para Finzn
// Oculta la API Key de Groq, solo acepta requests desde tu GitHub Pages.
//
// DEPLOY (dashboard, sin CLI):
// 1. dash.cloudflare.com → Workers & Pages → Create → Create Worker
// 2. Nómbralo "finzn-proxy" → Deploy
// 3. Edit code → borra todo, pega este archivo completo → Deploy
// 4. Settings → Variables and Secrets → Add → nombre: GROQ_API_KEY, tipo: Secret,
//    valor: tu key gsk_... → Save (esto la cifra, nadie la ve ni tú de nuevo)
// 5. Copia la URL que te da (algo tipo https://finzn-proxy.TU-SUBDOMINIO.workers.dev)
//    y pégala en main.js en la constante WORKER_URL

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const isAllowed = origin === "https://finzn.pages.dev"
      || origin.endsWith(".finzn.pages.dev")
      || origin === "https://alexis-ce.github.io";

    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowed ? origin : "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (!isAllowed) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }

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
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
