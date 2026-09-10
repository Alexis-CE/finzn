## 💸 Finzn

Tracker de finanzas personales: registra ingresos y gastos, ponte metas y presupuestos, visualiza en qué se te va el dinero, sincroniza automáticamente entre tus dispositivos, y pide un análisis con IA vía Groq a través de un proxy propio.

Finzn usa login real con email/contraseña o Google. Las cuentas, sesiones y datos sincronizados viven en Cloudflare D1.

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
- **Sync entre dispositivos**: sincronización automática por cuenta autenticada usando Cloudflare D1
- **Autenticación**: email/contraseña, Google OAuth y recuperación de contraseña por correo con Resend
- **Persistencia local**: tus datos, meta y presupuestos se guardan en `localStorage`
- **Export/Import**: JSON completo (respaldo) o CSV (para abrir en Excel/Sheets)
- **Mobile-first**: tabla se convierte en tarjetas en pantallas chicas, header responsive
- **PWA instalable**: puede instalarse como app desde Chrome/Edge y conserva la interfaz en caché para abrirla sin conexión

### Setup

1. Clona el repo
2. Abre `index.html` en tu navegador, o entra directo a [finzn.pages.dev](https://finzn.pages.dev)
3. El análisis de IA pasa por un Cloudflare Worker propio (`cloudflare-worker.js`) que guarda la key de Groq como secret
4. Inicia sesión con email/contraseña o Google para que los datos se sincronicen automáticamente entre dispositivos

### Instalar como app

En Chrome o Edge, abre Finzn por HTTPS y usa el botón **Descargar app** del menú lateral. Si el navegador no muestra el aviso automático, abre el menú del navegador y selecciona **Instalar Finzn**. En iPhone/iPad usa **Compartir > Agregar a pantalla de inicio**.

La interfaz principal se guarda en caché mediante el service worker `sw.js`, por lo que el dashboard puede abrirse sin conexión. Las funciones que necesitan servicios externos, como Google, IA y sincronización en la nube, requieren internet.

### Stack

- HTML / CSS / JavaScript vanilla — sin frameworks, sin build step
- [Chart.js](https://www.chartjs.org/) para las gráficas
- [Groq API](https://groq.com/) (`openai/gpt-oss-20b`) para el análisis con IA, vía un [Cloudflare Worker]

### Notas

- Tus datos se guardan localmente para permitir uso offline y se sincronizan automáticamente con la cuenta autenticada cuando hay conexión
- La sincronización usa Cloudflare D1 y el token de sesión; no depende de códigos secretos ni de Cloudflare KV
- El Worker (`finzn-proxy`) solo acepta peticiones desde `finzn.pages.dev` — CORS restringido
