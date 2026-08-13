## 💸 Finzn

Tracker de finanzas personales: registra ingresos y gastos, ponte metas y presupuestos, visualiza en qué se te va el dinero, sincroniza entre tus dispositivos, y pide un análisis con IA (gratis, vía Groq a través de un proxy propio) sobre tus patrones de gasto.

Sin backend propio para los datos, sin login tradicional, sin base de datos SQL. Todo corre en tu navegador — solo el análisis de IA y el sync pasan por un Cloudflare Worker que oculta la key y guarda un respaldo cifrado por código.

### Features

- **Dashboard**: balance, ingresos, gastos, tasa de ahorro, y comparativa vs el mes anterior
- **Registro rápido**: gastos por categoría, ingresos por fuente (mesada, freelance, trabajo), con autocompletado de descripciones ya usadas
- **Editar y borrar movimientos**, con confirmación antes de borrar
- **Gastos/ingresos recurrentes**: switch para marcarlos "se repite cada mes", se regeneran solos al entrar en un mes nuevo
- **Buscador y filtro por mes** en la tabla de movimientos, con orden por fecha o monto
- **Gráficas** de gastos por categoría e ingresos por fuente (Chart.js)
- **Meta de ahorro** con fecha objetivo: barra de progreso y cuánto necesitas ahorrar al mes para llegar a tiempo
- **Presupuesto por categoría** con semáforo (verde/amarillo/rojo) según cuánto llevas gastado este mes vs tu límite
- **Análisis con IA**: revisa tus movimientos (y tu meta, si tienes una) y te da focos rojos + consejos concretos, completamente bilingüe
- **Bilingüe ES/EN**: toda la interfaz y el análisis de IA responden en el idioma que elijas
- **Tema claro/oscuro** con transición animada
- **Menú ☰ lateral** para saltar entre secciones en mobile
- **Sync entre dispositivos**: código secreto propio + Cloudflare KV — subes datos en un dispositivo, los bajas en otro (manual, no en tiempo real)
- **Persistencia local**: tus datos, meta y presupuestos se guardan en `localStorage`
- **Export/Import**: JSON completo (respaldo) o CSV (para abrir en Excel/Sheets)
- **Mobile-first**: tabla se convierte en tarjetas en pantallas chicas, header responsive

### Setup

1. Clona el repo
2. Abre `index.html` en tu navegador, o entra directo a [finzn.pages.dev](https://finzn.pages.dev)
3. El análisis de IA ya funciona sin pedirte nada — pasa por un Cloudflare Worker propio (`cloudflare-worker.js`) que guarda la key de Groq como secret
4. Para sync entre dispositivos: dale a "☁️⬆" la primera vez, inventa un código secreto, y en tu otro dispositivo usa el mismo código con "☁️⬇"

### Stack

- HTML / CSS / JavaScript vanilla — sin frameworks, sin build step
- [Chart.js](https://www.chartjs.org/) para las gráficas
- [Groq API](https://groq.com/) (`llama-3.3-70b-versatile`) para el análisis con IA, vía un [Cloudflare Worker](https://workers.cloudflare.com/) proxy
- [Cloudflare KV](https://developers.cloudflare.com/kv/) para el respaldo de sync entre dispositivos (namespace `finzn-sync`, binding `FINZN_KV`)
- Hosteado en [Cloudflare Pages](https://pages.cloudflare.com/), conectado a este repo (deploy automático con cada push a `main`)

### Notas

- Tus datos (`localStorage`) nunca salen de tu navegador salvo cuando usas sync explícitamente
- El código de sync se cifra (SHA-256) antes de usarse como llave en KV — ni con acceso al namespace se puede ver tu código real
- Sync es manual, no en tiempo real: si editas en 2 dispositivos sin sincronizar entre medio, gana el último que subió
- Si exportas un `mis_finanzas.json`, el `.gitignore` ya lo bloquea por default
- El Worker (`finzn-proxy`) solo acepta peticiones desde `finzn.pages.dev` — CORS restringido

### Posible evolución futura

Si algún día se quiere sync en tiempo real de verdad (no manual) o multi-usuario real con login, la app podría migrar a usar una base de datos propia corriendo en el home lab (MariaDB en el NAS, mismo patrón que CodeLab vía Tailscale+socat) en vez de Cloudflare KV — permitiría login real, historial de cambios, y sync automático sin códigos que recordar. No es necesario ahorita, es solo la ruta de escalamiento si el proyecto crece.
