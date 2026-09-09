async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function genToken() {
  return [...crypto.getRandomValues(new Uint8Array(32))].map(b => b.toString(16).padStart(2, "0")).join("");
}

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function getUserIdFromToken(env, request) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  const row = await env.FINZN_DB
    .prepare("SELECT user_id, expires_at FROM sessions WHERE token = ?")
    .bind(token)
    .first();
  if (!row) return null;
  if (new Date(row.expires_at) < new Date()) return null;
  return row.user_id;
}

async function getOrCreateUserByEmail(env, email) {
  const existing = await env.FINZN_DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return existing.id;
  const res = await env.FINZN_DB.prepare("INSERT INTO users (email, password_hash) VALUES (?, '')").bind(email).run();
  return res.meta.last_row_id;
}

async function issueSession(env, userId) {
  const token = genToken();
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  await env.FINZN_DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").bind(token, userId, expires).run();
  return token;
}

async function verifyGoogleIdToken(idToken, env) {
  const res = await fetch("https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(idToken));
  if (!res.ok) return null;
  const payload = await res.json();
  if (payload.aud !== env.GOOGLE_CLIENT_ID) return null;
  if (payload.email_verified !== "true" && payload.email_verified !== true) return null;
  return payload;
}

async function sendResetEmail(env, email, link) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + env.RESEND_API_KEY },
      body: JSON.stringify({
        from: env.RESEND_FROM || "Finzn <onboarding@resend.dev>",
        to: [email],
        subject: "Recupera tu contraseña de Finzn",
        html: `<p>Alguien pidió restablecer la contraseña de tu cuenta Finzn.</p><p><a href="${link}">Haz clic aquí para crear una nueva contraseña</a></p><p>Este enlace expira en 30 minutos. Si tú no lo pediste, ignora este correo.</p>`,
      }),
    });
  } catch (e) { /* no revelar errores al cliente */ }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const isAllowed = origin === "https://finzn.pages.dev"
      || origin.endsWith(".finzn.pages.dev");

    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowed ? origin : "",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    if (!isAllowed) {
      return new Response("Forbidden", { status: 403, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const jsonHeaders = { ...corsHeaders, "Content-Type": "application/json" };
    const err = (msg, status = 400) => new Response(JSON.stringify({ error: msg }), { status, headers: jsonHeaders });

    if (url.pathname === "/auth/register" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      const email = (body.email || "").trim().toLowerCase();
      const password = body.password || "";
      if (!isValidEmail(email)) return err("Email inválido");
      if (password.length < 6) return err("La contraseña necesita al menos 6 caracteres");

      const exists = await env.FINZN_DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
      if (exists) return err("Ya existe una cuenta con ese email", 409);

      const salt = crypto.randomUUID();
      const hash = await hashPassword(password, salt);
      const stored = salt + ":" + hash;
      const res = await env.FINZN_DB
        .prepare("INSERT INTO users (email, password_hash) VALUES (?, ?)")
        .bind(email, stored)
        .run();
      const userId = res.meta.last_row_id;

      const token = genToken();
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await env.FINZN_DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").bind(token, userId, expires).run();

      return new Response(JSON.stringify({ token, email }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/auth/login" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      const email = (body.email || "").trim().toLowerCase();
      const password = body.password || "";

      const user = await env.FINZN_DB.prepare("SELECT id, password_hash FROM users WHERE email = ?").bind(email).first();
      if (!user) return err("Email o contraseña incorrectos", 401);

      const [salt, storedHash] = user.password_hash.split(":");
      const hash = await hashPassword(password, salt);
      if (hash !== storedHash) return err("Email o contraseña incorrectos", 401);

      const token = genToken();
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await env.FINZN_DB.prepare("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)").bind(token, user.id, expires).run();

      return new Response(JSON.stringify({ token, email }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/auth/google" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      const payload = await verifyGoogleIdToken(body.credential, env);
      if (!payload) return err("Token de Google inválido", 401);
      const email = (payload.email || "").trim().toLowerCase();
      if (!email) return err("Google no devolvió email", 401);

      const userId = await getOrCreateUserByEmail(env, email);
      const token = await issueSession(env, userId);
      return new Response(JSON.stringify({ token, email }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/auth/facebook" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      const accessToken = body.accessToken;
      if (!accessToken) return err("Falta accessToken");

      const debugRes = await fetch(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${env.FACEBOOK_APP_ID}|${env.FACEBOOK_APP_SECRET}`);
      const debugJson = await debugRes.json();
      if (!debugJson.data || !debugJson.data.is_valid || String(debugJson.data.app_id) !== String(env.FACEBOOK_APP_ID)) {
        return err("Token de Facebook inválido", 401);
      }

      const meRes = await fetch(`https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`);
      const me = await meRes.json();
      const email = (me.email || "").trim().toLowerCase();
      if (!email) return err("Tu cuenta de Facebook no tiene email verificado", 401);

      const userId = await getOrCreateUserByEmail(env, email);
      const token = await issueSession(env, userId);
      return new Response(JSON.stringify({ token, email }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/auth/forgot" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      const email = (body.email || "").trim().toLowerCase();
      if (isValidEmail(email)) {
        const user = await env.FINZN_DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
        if (user) {
          const token = genToken();
          const expires = new Date(Date.now() + 30 * 60 * 1000).toISOString();
          await env.FINZN_DB.prepare("INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)").bind(token, user.id, expires).run();
          const resetLink = "https://finzn.pages.dev/?reset=" + token;
          await sendResetEmail(env, email, resetLink);
        }
      }
      // Siempre ok:true, así no se puede usar este endpoint para adivinar qué emails están registrados
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/auth/reset" && request.method === "POST") {
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      const token = body.token || "";
      const password = body.password || "";
      if (password.length < 6) return err("La contraseña necesita al menos 6 caracteres");

      const row = await env.FINZN_DB.prepare("SELECT user_id, expires_at FROM password_resets WHERE token = ?").bind(token).first();
      if (!row) return err("Enlace inválido o ya usado", 401);
      if (new Date(row.expires_at) < new Date()) {
        await env.FINZN_DB.prepare("DELETE FROM password_resets WHERE token = ?").bind(token).run();
        return err("El enlace expiró, pide uno nuevo", 401);
      }

      const salt = crypto.randomUUID();
      const hash = await hashPassword(password, salt);
      const stored = salt + ":" + hash;
      await env.FINZN_DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(stored, row.user_id).run();
      await env.FINZN_DB.prepare("DELETE FROM password_resets WHERE token = ?").bind(token).run();
      await env.FINZN_DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(row.user_id).run();

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/auth/logout" && request.method === "POST") {
      const auth = request.headers.get("Authorization") || "";
      const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
      if (token) await env.FINZN_DB.prepare("DELETE FROM sessions WHERE token = ?").bind(token).run();
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/sync/save" && request.method === "POST") {
      const userId = await getUserIdFromToken(env, request);
      if (!userId) return err("No autorizado", 401);
      let body;
      try { body = await request.json(); } catch (e) { return err("JSON inválido"); }
      if (!body.data) return err("Falta data");

      await env.FINZN_DB
        .prepare("INSERT INTO user_data (user_id, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(user_id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP")
        .bind(userId, JSON.stringify(body.data))
        .run();

      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: jsonHeaders });
    }

    if (url.pathname === "/sync/load" && request.method === "GET") {
      const userId = await getUserIdFromToken(env, request);
      if (!userId) return err("No autorizado", 401);

      const row = await env.FINZN_DB.prepare("SELECT data FROM user_data WHERE user_id = ?").bind(userId).first();
      if (!row) return new Response(JSON.stringify({ found: false }), { status: 200, headers: jsonHeaders });
      return new Response(JSON.stringify({ found: true, data: JSON.parse(row.data) }), { status: 200, headers: jsonHeaders });
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
          model: "openai/gpt-oss-20b",
          max_tokens: 1000,
          reasoning_effort: "low",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await groqRes.text();
      return new Response(data, {
        status: groqRes.status,
        headers: jsonHeaders,
      });
    } catch (err2) {
      return new Response(JSON.stringify({ error: err2.message }), {
        status: 500,
        headers: jsonHeaders,
      });
    }
  },
};
