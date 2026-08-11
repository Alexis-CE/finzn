## 💸 Finzn

Tracker de finanzas personales: registra ingresos y gastos, ponte metas y presupuestos, visualiza en qué se te va el dinero, y pide un análisis con IA (gratis, vía Groq a través de un proxy propio) sobre tus patrones de gasto.

Sin backend propio para los datos, sin login, sin base de datos. Todo corre en tu navegador — solo el análisis de IA pasa por un Cloudflare Worker que oculta la key.

### Features

- **Dashboard**: balance, ingresos, gastos, tasa de ahorro, y comparativa vs el mes anterior
- **Registro rápido**: gastos por categoría, ingresos por fuente (mesada, freelance, trabajo), con autocompletado de descripciones ya usadas
- **Editar y borrar movimientos**, con confirmación antes de borrar
- **Gastos/ingresos recurrentes**: márcalos como "se repite cada mes" y se regeneran solos al entrar en un mes nuevo
- **Buscador y filtro por mes** en la tabla de movimientos, con orden por fecha o monto
- **Gráficas** de gastos por categoría e ingresos por fuente (Chart.js)
- **Meta de ahorro** con fecha objetivo: barra de progreso y cuánto necesitas ahorrar al mes para llegar a tiempo
- **Presupuesto por categoría** con semáforo (verde/amarillo/rojo) según cuánto llevas gastado este mes vs tu límite
- **Análisis con IA**: revisa tus movimientos (y tu meta, si tienes una) y te da focos rojos + consejos concretos, completamente bilingüe
- **Bilingüe ES/EN**: toda la interfaz y el análisis de IA responden en el idioma que elijas
- **Persistencia local**: tus datos, meta y presupuestos se guardan en `localStorage`
- **Export/Import**: JSON completo (respaldo) o CSV (para abrir en Excel/Sheets)
- **Mobile-first**: tabla se convierte en tarjetas en pantallas chicas, header responsive

### Setup

1. Clona el repo
2. Abre `index.html` en tu navegador, o entra directo a [finzn.pages.dev](https://finzn.pages.dev)
3. El análisis de IA ya funciona sin pedirte nada — pasa por un Cloudflare Worker propio (`cloudflare-worker.js`) que guarda la key de Groq como secret, nadie necesita su propia key

### Stack

- HTML / CSS / JavaScript vanilla — sin frameworks, sin build step
- [Chart.js](https://www.chartjs.org/) para las gráficas
- [Groq API](https://groq.com/) (`llama-3.3-70b-versatile`) para el análisis con IA, vía un [Cloudflare Worker](https://workers.cloudflare.com/) proxy

### Notas

- Tus datos (`localStorage`) nunca salen de tu navegador ni se suben a este repo
- Si exportas un `mis_finanzas.json`, el `.gitignore` ya lo bloquea por default
- El Worker (`finzn-proxy`) solo acepta peticiones desde `finzn.pages.dev` — CORS restringido
