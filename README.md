## 💸 Finzn

Tracker de finanzas personales simple: registra ingresos y gastos, visualiza en qué se te va el dinero, y pide un análisis con IA (gratis, vía Groq) sobre tus patrones de gasto.

Sin backend, sin login, sin base de datos. Todo corre en tu navegador.

### Features

- **Dashboard**: balance, ingresos, gastos y tasa de ahorro de un vistazo
- **Registro rápido**: gastos por categoría, ingresos por fuente (mesada, freelance, trabajo)
- **Gráfica de gastos por categoría** (Chart.js)
- **Análisis con IA**: revisa tus movimientos y te da focos rojos + consejos concretos
- **Persistencia local**: tus datos se guardan en `localStorage`, sobreviven a recargas y cierres
- **Export/Import JSON**: respaldo manual de tus datos cuando quieras

### Setup

1. Clona el repo
2. Abre `gastos_2.html` en tu navegador (no necesita servidor)
3. Dale click a **Analizar mis finanzas** — te va a pedir una API Key de Groq
4. Sácala gratis en [console.groq.com/keys](https://console.groq.com/keys) y pégala
5. Listo, la key se queda guardada en tu navegador (nunca se sube al repo)

### Stack

- HTML / CSS / JavaScript vanilla — sin frameworks, sin build step
- [Chart.js](https://www.chartjs.org/) para la gráfica de categorías
- [Groq API](https://groq.com/) (`llama-3.3-70b-versatile`) para el análisis con IA

### Notas

- Tus datos (`localStorage`) y tu API Key nunca salen de tu navegador ni se suben a este repo
- Si exportas un `mis_finanzas.json`, el `.gitignore` ya lo bloquea por default
