const ICONS = {Comida:'🍔',Transporte:'🚌',Ropa:'👕','Salidas/Ocio':'🎮',Suscripciones:'🔁',Escuela:'📚','Videojuegos/Apps':'🕹',Mascota:'🐾',Otro:'🔹',
  Mesada:'🏠','Chambita/Freelance':'💻',Trabajo:'💼'};

const CATEGORY_LABELS = {
  Comida:{es:'Comida',en:'Food'},
  Transporte:{es:'Transporte',en:'Transport'},
  Ropa:{es:'Ropa',en:'Clothes'},
  'Salidas/Ocio':{es:'Salidas/Ocio',en:'Going out'},
  Suscripciones:{es:'Suscripciones',en:'Subscriptions'},
  Escuela:{es:'Escuela',en:'School'},
  'Videojuegos/Apps':{es:'Videojuegos/Apps',en:'Games/Apps'},
  Mascota:{es:'Mascota',en:'Pet'},
  Otro:{es:'Otro',en:'Other'},
  Mesada:{es:'Mesada',en:'Allowance'},
  'Chambita/Freelance':{es:'Chambita/Freelance',en:'Freelance gig'},
  Trabajo:{es:'Trabajo',en:'Job'}
};

const I18N = {
  es: {
    title: '💸 ¿En qué se me va la lana?',
    subtitle: 'Ingresos, gastos y consejos con IA',
    btnExport: '⬇ Exportar', btnExportCSV: '⬇ CSV', btnImport: '⬆ Importar',
    lblBalance: 'Balance', lblIn: 'Ingresos', lblOut: 'Gastos', lblRate: 'Tasa de ahorro',
    tabGasto: '📉 Gasto', tabIngreso: '📈 Ingreso',
    phMonto: 'Monto', phDescG: 'Descripción (opcional)', phDescI: 'Descripción (ej. tarea de Python)',
    btnAgregar: 'Agregar', btnGuardarCambios: 'Guardar cambios', btnCancelarEdicion: 'Cancelar edición',
    recurLabel: '🔁 Se repite cada mes',
    movTitle: '📋 Movimientos',
    thFecha: 'Fecha', thTipo: 'Categoría', thDesc: 'Descripción', thMonto: 'Monto',
    emptyState: 'Todavía no hay movimientos. Agrega tu primer gasto o ingreso arriba ↑',
    emptyFiltro: 'Nada coincide con tu búsqueda/filtro.',
    buscarPlaceholder: '🔍 Buscar en movimientos...',
    filtroTodos: 'Todos los meses',
    comparativaTexto: 'vs mes anterior:',
    chartTitle: '🍩 Gastos por categoría',
    ingresosChartTitle: '📊 Ingresos por fuente',
    iaTitle: '🤖 Análisis con IA',
    iaBadge: 'La IA revisa tus movimientos y te dice en qué se te va el dinero, si tus ingresos cubren tus gastos y qué podrías ajustar. No sustituye consejo financiero profesional.',
    btnAnalizar: 'Analizar mis finanzas',
    btnAnalizando: 'Analizando...',
    meterIn: 'Ingresos', meterOut: 'Gastos',
    registros: 'registros',
    alertMovimiento: 'Agrega al menos un movimiento primero',
    confirmBorrar: '¿Seguro que quieres borrar este movimiento?',
    pensando: 'Pensando...',
    noAnalisis: 'No se pudo generar el análisis.',
    errorConexion: 'Error al conectar con la IA: ',
    archivoInvalido: 'Archivo inválido',
    metaTitle: '🎯 Meta de ahorro',
    phMetaNombre: '¿Para qué? (ej. laptop nueva)',
    phMetaMonto: 'Monto objetivo',
    btnGuardarMeta: 'Guardar meta',
    btnEliminarMeta: '✕ Borrar meta',
    metaLograda: '¡Ya la lograste! 🎉',
    metaNecesitas: 'Necesitas ahorrar',
    metaFechaPasada: 'Esa fecha ya pasó, elige una fecha futura.',
    presupuestoTitle: '🚦 Presupuesto por categoría',
    phPresupuestoMonto: 'Límite mensual',
    btnGuardarPresupuesto: 'Guardar límite',
    presupuestoVacio: 'Aún no has puesto límites. Agrega uno arriba.',
    presupuestoDe: 'de',
    syncCodePrompt: 'Inventa un código secreto para sincronizar entre tus dispositivos (usa el mismo en todos):',
    syncSubido: '☁️ Datos subidos a la nube.',
    syncBajado: '☁️ Datos bajados y actualizados.',
    syncNoEncontrado: 'No hay nada guardado con ese código todavía. Sube tus datos primero desde otro dispositivo.',
    syncConfirmar: 'Esto va a reemplazar tus datos locales con los de la nube. ¿Continuar?',
    syncError: 'Error de sincronización: '
  },
  en: {
    title: '💸 Where does my money go?',
    subtitle: 'Income, expenses and AI advice',
    btnExport: '⬇ Export', btnExportCSV: '⬇ CSV', btnImport: '⬆ Import',
    lblBalance: 'Balance', lblIn: 'Income', lblOut: 'Expenses', lblRate: 'Savings rate',
    tabGasto: '📉 Expense', tabIngreso: '📈 Income',
    phMonto: 'Amount', phDescG: 'Description (optional)', phDescI: 'Description (e.g. Python homework)',
    btnAgregar: 'Add', btnGuardarCambios: 'Save changes', btnCancelarEdicion: 'Cancel edit',
    recurLabel: '🔁 Repeats monthly',
    movTitle: '📋 Transactions',
    thFecha: 'Date', thTipo: 'Category', thDesc: 'Description', thMonto: 'Amount',
    emptyState: 'No transactions yet. Add your first expense or income above ↑',
    emptyFiltro: 'Nothing matches your search/filter.',
    buscarPlaceholder: '🔍 Search transactions...',
    filtroTodos: 'All months',
    comparativaTexto: 'vs last month:',
    chartTitle: '🍩 Expenses by category',
    ingresosChartTitle: '📊 Income by source',
    iaTitle: '🤖 AI analysis',
    iaBadge: 'The AI reviews your transactions and tells you where your money is going, whether your income covers your expenses, and what you could adjust. Not a substitute for professional financial advice.',
    btnAnalizar: 'Analyze my finances',
    btnAnalizando: 'Analyzing...',
    meterIn: 'Income', meterOut: 'Expenses',
    registros: 'records',
    alertMovimiento: 'Add at least one transaction first',
    confirmBorrar: 'Delete this transaction?',
    pensando: 'Thinking...',
    noAnalisis: 'Could not generate the analysis.',
    errorConexion: 'Error connecting to the AI: ',
    archivoInvalido: 'Invalid file',
    metaTitle: '🎯 Savings goal',
    phMetaNombre: 'What for? (e.g. new laptop)',
    phMetaMonto: 'Target amount',
    btnGuardarMeta: 'Save goal',
    btnEliminarMeta: '✕ Delete goal',
    metaLograda: 'You reached it! 🎉',
    metaNecesitas: 'You need to save',
    metaFechaPasada: 'That date already passed, pick a future date.',
    presupuestoTitle: '🚦 Budget by category',
    phPresupuestoMonto: 'Monthly limit',
    btnGuardarPresupuesto: 'Save limit',
    presupuestoVacio: 'No limits set yet. Add one above.',
    presupuestoDe: 'of',
    syncCodePrompt: 'Make up a secret code to sync between your devices (use the same one everywhere):',
    syncSubido: '☁️ Data uploaded to the cloud.',
    syncBajado: '☁️ Data downloaded and updated.',
    syncNoEncontrado: 'Nothing saved under that code yet. Upload your data first from another device.',
    syncConfirmar: 'This will replace your local data with the cloud version. Continue?',
    syncError: 'Sync error: '
  }
};

const STORAGE_KEY = 'finanzas_datos_v1';
const LANG_STORAGE = 'finanzas_lang';
const THEME_STORAGE = 'finanzas_theme';
const GOAL_STORAGE = 'finanzas_meta';
const BUDGET_STORAGE = 'finanzas_presupuestos';
const TOKEN_STORAGE = 'finzn_token';
const WORKER_URL = 'https://finzn-proxy.2020pomelo.workers.dev';
let authMode = 'login';

function genId(){
  return (crypto.randomUUID ? crypto.randomUUID() : 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2));
}

const DEMO_GASTOS = [
  {id:genId(), tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Comida", desc:"Tacos con amigos", monto:120, recurrente:false},
  {id:genId(), tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Suscripciones", desc:"Spotify", monto:115, recurrente:true},
  {id:genId(), tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Videojuegos/Apps", desc:"Skin de juego", monto:200, recurrente:false},
];
const DEMO_INGRESOS = [
  {id:genId(), tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria:"Mesada", desc:"Semanal", monto:300, recurrente:true},
  {id:genId(), tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria:"Chambita/Freelance", desc:"Tarea de programación para compañero", monto:250, recurrente:false},
];

function migrar(arr){
  arr.forEach(m=>{
    if(!m.id) m.id = genId();
    if(m.recurrente === undefined) m.recurrente = false;
  });
  return arr;
}

function cargarDatos(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const data = JSON.parse(raw);
      return {gastos: migrar(data.gastos || []), ingresos: migrar(data.ingresos || [])};
    }
  }catch(e){}
  return {gastos: DEMO_GASTOS, ingresos: DEMO_INGRESOS};
}

function guardarDatos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({gastos, ingresos}));
  programarSyncNube();
}

function cargarMeta(){
  try{
    const raw = localStorage.getItem(GOAL_STORAGE);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
function guardarMeta(){
  if(meta) localStorage.setItem(GOAL_STORAGE, JSON.stringify(meta));
  else localStorage.removeItem(GOAL_STORAGE);
  programarSyncNube();
}

function cargarPresupuestos(){
  try{
    const raw = localStorage.getItem(BUDGET_STORAGE);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function guardarPresupuestos(){
  localStorage.setItem(BUDGET_STORAGE, JSON.stringify(presupuestos));
  programarSyncNube();
}

const datosIniciales = cargarDatos();
let gastos = datosIniciales.gastos;
let ingresos = datosIniciales.ingresos;
let currentLang = localStorage.getItem(LANG_STORAGE) || 'es';
let currentTheme = localStorage.getItem(THEME_STORAGE) || 'dark';
let meta = cargarMeta();
let presupuestos = cargarPresupuestos();
let editando = null;
let sortField = null, sortDir = 1;

let chart, chartIngresos;

function procesarRecurrentes(){
  const hoyMes = new Date().toISOString().slice(0,7);
  [gastos, ingresos].forEach(arr=>{
    const ultimaOcurrencia = {};
    arr.forEach(m=>{
      if(!m.recurrente) return;
      const key = m.tipo + '|' + m.categoria + '|' + (m.desc||'');
      const mes = m.fecha.slice(0,7);
      if(!ultimaOcurrencia[key] || ultimaOcurrencia[key].mes < mes){
        ultimaOcurrencia[key] = {mes, item:m};
      }
    });
    Object.values(ultimaOcurrencia).forEach(({mes, item})=>{
      if(mes < hoyMes){
        arr.push({...item, id: genId(), fecha: hoyMes + '-01'});
      }
    });
  });
}
procesarRecurrentes();

function switchTab(t){
  document.getElementById('tabGasto').classList.toggle('active', t==='gasto');
  document.getElementById('tabIngreso').classList.toggle('active', t==='ingreso');
  document.getElementById('formGasto').style.display = t==='gasto' ? 'grid' : 'none';
  document.getElementById('formIngreso').style.display = t==='ingreso' ? 'grid' : 'none';
}

function pop(el){
  el.classList.remove('pop');
  void el.offsetWidth;
  el.classList.add('pop');
}

function traducirSelect(id){
  const select = document.getElementById(id);
  if(!select) return;
  [...select.options].forEach(opt=>{
    const label = CATEGORY_LABELS[opt.value] ? CATEGORY_LABELS[opt.value][currentLang] : opt.value;
    opt.textContent = (ICONS[opt.value]||'') + ' ' + label;
  });
}

function setIdioma(lang){
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE, lang);
  aplicarIdioma();
}

function setTema(theme){
  currentTheme = theme;
  localStorage.setItem(THEME_STORAGE, theme);
  aplicarTema();
}

function aplicarTema(){
  document.documentElement.setAttribute('data-theme', currentTheme);
  document.querySelectorAll('#themeSwitch .lang-opt').forEach(b=>b.classList.toggle('active', b.dataset.theme===currentTheme));
  document.getElementById('themeIndicator').style.transform = currentTheme==='light' ? 'translateX(100%)' : 'translateX(0)';
}

function toggleMenu(){
  document.getElementById('sideMenu').classList.toggle('open');
  document.getElementById('menuOverlay').classList.toggle('open');
}

function aplicarIdioma(){
  const t = I18N[currentLang];
  document.documentElement.lang = currentLang;
  document.getElementById('appTitle').textContent = t.title;
  document.getElementById('appSub').textContent = t.subtitle;
  document.getElementById('lblBalance').textContent = t.lblBalance;
  document.getElementById('lblIn').textContent = t.lblIn;
  document.getElementById('lblOut').textContent = t.lblOut;
  document.getElementById('lblRate').textContent = t.lblRate;
  document.getElementById('tabGasto').textContent = t.tabGasto;
  document.getElementById('tabIngreso').textContent = t.tabIngreso;
  document.getElementById('montoG').placeholder = t.phMonto;
  document.getElementById('montoI').placeholder = t.phMonto;
  document.getElementById('descG').placeholder = t.phDescG;
  document.getElementById('descI').placeholder = t.phDescI;
  document.getElementById('btnAgregarG').textContent = editando && editando.tipo==='gasto' ? t.btnGuardarCambios : t.btnAgregar;
  document.getElementById('btnAgregarI').textContent = editando && editando.tipo==='ingreso' ? t.btnGuardarCambios : t.btnAgregar;
  document.getElementById('cancelEdit').textContent = t.btnCancelarEdicion;
  document.getElementById('recurLabelG').textContent = t.recurLabel;
  document.getElementById('recurLabelI').textContent = t.recurLabel;
  document.getElementById('movTitle').textContent = t.movTitle;
  document.getElementById('thFecha').textContent = t.thFecha;
  document.getElementById('thTipo').textContent = t.thTipo;
  document.getElementById('thDesc').textContent = t.thDesc;
  document.getElementById('thMonto').textContent = t.thMonto;
  document.getElementById('buscador').placeholder = t.buscarPlaceholder;
  document.getElementById('chartTitle').textContent = t.chartTitle;
  document.getElementById('ingresosChartTitle').textContent = t.ingresosChartTitle;
  document.getElementById('iaTitle').textContent = t.iaTitle;
  document.getElementById('iaBadge').textContent = t.iaBadge;
  document.getElementById('btnAnalizar').textContent = t.btnAnalizar;
  document.getElementById('metaTitle').textContent = t.metaTitle;
  document.getElementById('metaNombre').placeholder = t.phMetaNombre;
  document.getElementById('metaMonto').placeholder = t.phMetaMonto;
  document.getElementById('btnGuardarMeta').textContent = t.btnGuardarMeta;
  document.getElementById('btnEliminarMeta').textContent = t.btnEliminarMeta;
  document.getElementById('presupuestoTitle').textContent = t.presupuestoTitle;
  document.getElementById('presMonto').placeholder = t.phPresupuestoMonto;
  document.getElementById('btnGuardarPresupuesto').textContent = t.btnGuardarPresupuesto;

  document.querySelectorAll('#langSwitch .lang-opt').forEach(b=>b.classList.toggle('active', b.dataset.lang===currentLang));
  document.getElementById('langIndicator').style.transform = currentLang==='en' ? 'translateX(100%)' : 'translateX(0)';

  traducirSelect('categoria');
  traducirSelect('fuente');
  traducirSelect('presCategoria');

  render();
}

function ordenarPor(campo){
  if(sortField===campo) sortDir = -sortDir; else { sortField = campo; sortDir = 1; }
  render();
}

function poblarFiltroMes(){
  const sel = document.getElementById('filtroMes');
  const t = I18N[currentLang];
  const mesesSet = new Set([...gastos, ...ingresos].map(m=>m.fecha.slice(0,7)));
  const meses = [...mesesSet].sort().reverse();
  const val = sel.value || 'todos';
  sel.innerHTML = `<option value="todos">${t.filtroTodos}</option>` + meses.map(m=>`<option value="${m}">${m}</option>`).join('');
  sel.value = (val === 'todos' || meses.includes(val)) ? val : 'todos';
}

function poblarDatalists(){
  const descsG = [...new Set(gastos.map(g=>g.desc).filter(Boolean))];
  const descsI = [...new Set(ingresos.map(g=>g.desc).filter(Boolean))];
  document.getElementById('descListG').innerHTML = descsG.map(d=>`<option value="${d.replace(/"/g,'&quot;')}">`).join('');
  document.getElementById('descListI').innerHTML = descsI.map(d=>`<option value="${d.replace(/"/g,'&quot;')}">`).join('');
}

function calcularComparativa(){
  const t = I18N[currentLang];
  const hoy = new Date();
  const mesActual = hoy.toISOString().slice(0,7);
  const mesAnteriorDate = new Date(hoy.getFullYear(), hoy.getMonth()-1, 1);
  const mesAnterior = mesAnteriorDate.toISOString().slice(0,7);
  const gastoMesActual = gastos.filter(g=>g.fecha.slice(0,7)===mesActual).reduce((s,g)=>s+g.monto,0);
  const gastoMesAnterior = gastos.filter(g=>g.fecha.slice(0,7)===mesAnterior).reduce((s,g)=>s+g.monto,0);
  const el = document.getElementById('comparativa');
  if(gastoMesAnterior === 0 || gastoMesActual === 0){ el.textContent = ''; return; }
  const delta = ((gastoMesActual-gastoMesAnterior)/gastoMesAnterior*100);
  const signo = delta >= 0 ? '+' : '';
  el.textContent = `${t.comparativaTexto} ${signo}${delta.toFixed(0)}% ${I18N[currentLang]===I18N.es?'en gastos':'in spending'}`;
  el.style.color = delta > 0 ? 'var(--danger)' : 'var(--mint)';
}

function render(){
  guardarDatos();
  const t = I18N[currentLang];

  poblarFiltroMes();
  poblarDatalists();

  const mesFiltro = document.getElementById('filtroMes').value;
  const busqueda = document.getElementById('buscador').value.trim().toLowerCase();

  let todos = [...gastos, ...ingresos];

  if(mesFiltro && mesFiltro !== 'todos'){
    todos = todos.filter(m=>m.fecha.slice(0,7) === mesFiltro);
  }
  if(busqueda){
    todos = todos.filter(m=>{
      const catLabel = (CATEGORY_LABELS[m.categoria] ? CATEGORY_LABELS[m.categoria][currentLang] : m.categoria).toLowerCase();
      return catLabel.includes(busqueda) || (m.desc||'').toLowerCase().includes(busqueda);
    });
  }
  if(sortField === 'fecha'){
    todos.sort((a,b)=> a.fecha < b.fecha ? -sortDir : a.fecha > b.fecha ? sortDir : 0);
  }else if(sortField === 'monto'){
    todos.sort((a,b)=> (a.monto - b.monto) * sortDir);
  }else{
    todos.sort((a,b)=> a.fecha < b.fecha ? 1 : -1);
  }

  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  const emptyEl = document.getElementById('emptyState');
  if(todos.length === 0){
    emptyEl.style.display = 'block';
    emptyEl.textContent = (busqueda || (mesFiltro && mesFiltro !== 'todos')) ? t.emptyFiltro : t.emptyState;
  }else{
    emptyEl.style.display = 'none';
  }

  todos.forEach(m=>{
    const tr = document.createElement('tr');
    const isGasto = m.tipo === 'gasto';
    const catLabel = CATEGORY_LABELS[m.categoria] ? CATEGORY_LABELS[m.categoria][currentLang] : m.categoria;
    const recurTag = m.recurrente ? ' 🔁' : '';
    tr.innerHTML = `<td data-label="${t.thFecha}">${m.fecha}</td>
      <td data-label="${t.thTipo}"><span class="chip">${ICONS[m.categoria]||'🔹'} ${catLabel}</span></td>
      <td data-label="${t.thDesc}">${(m.desc||'—')}${recurTag}</td>
      <td data-label="${t.thMonto}" class="${isGasto?'amt-out':'amt-in'}">${isGasto?'-':'+'}$${m.monto.toFixed(2)}</td>
      <td><button class="edit" onclick="editar('${m.id}')">✎</button><button class="del" onclick="borrar('${m.tipo}', '${m.id}')">✕</button></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById('count').textContent = todos.length + ' ' + t.registros;

  const totalIn = ingresos.reduce((s,g)=>s+g.monto,0);
  const totalOut = gastos.reduce((s,g)=>s+g.monto,0);
  const balance = totalIn - totalOut;
  const rate = totalIn > 0 ? Math.max(0, Math.round((balance/totalIn)*100)) : 0;

  const elBalance = document.getElementById('statBalance');
  const elIn = document.getElementById('statIn');
  const elOut = document.getElementById('statOut');
  const elRate = document.getElementById('statRate');
  elBalance.textContent = (balance<0?'-':'') + '$' + Math.abs(balance).toFixed(2);
  elIn.textContent = '$' + totalIn.toFixed(2);
  elOut.textContent = '$' + totalOut.toFixed(2);
  elRate.textContent = rate + '%';
  [elBalance, elIn, elOut, elRate].forEach(pop);

  const totalMeter = totalIn + totalOut;
  const pctIn = totalMeter ? (totalIn/totalMeter*100) : 50;
  document.getElementById('meter').innerHTML =
    `<div class="seg" style="width:${pctIn}%;background:var(--mint)"></div><div class="seg" style="width:${100-pctIn}%;background:var(--coral)"></div>`;
  document.getElementById('meterInTxt').textContent = t.meterIn + ' $' + totalIn.toFixed(0);
  document.getElementById('meterOutTxt').textContent = t.meterOut + ' $' + totalOut.toFixed(0);
  calcularComparativa();

  const porCat = {};
  gastos.forEach(g=>porCat[g.categoria]=(porCat[g.categoria]||0)+g.monto);
  const labelsG = Object.keys(porCat).map(k => (ICONS[k]||'') + ' ' + (CATEGORY_LABELS[k] ? CATEGORY_LABELS[k][currentLang] : k));
  const dataG = Object.values(porCat);

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById('chart'), {
    type:'doughnut',
    data:{labels:labelsG, datasets:[{data:dataG, backgroundColor:['#5ee6b8','#ff8b6b','#7aa2ff','#ffd66b','#ff5f6d','#b98bff','#6bd6ff','#c4c4c4','#5ee6b8']}]},
    options:{plugins:{legend:{position:'bottom',labels:{color:'#e8eaed',boxWidth:12,font:{size:10}}}}}
  });

  const porFuente = {};
  ingresos.forEach(g=>porFuente[g.categoria]=(porFuente[g.categoria]||0)+g.monto);
  const labelsI = Object.keys(porFuente).map(k => (ICONS[k]||'') + ' ' + (CATEGORY_LABELS[k] ? CATEGORY_LABELS[k][currentLang] : k));
  const dataI = Object.values(porFuente);

  if(chartIngresos) chartIngresos.destroy();
  chartIngresos = new Chart(document.getElementById('chartIngresos'), {
    type:'doughnut',
    data:{labels:labelsI, datasets:[{data:dataI, backgroundColor:['#5ee6b8','#7aa2ff','#ffd66b','#ff8b6b','#b98bff']}]},
    options:{plugins:{legend:{position:'bottom',labels:{color:'#e8eaed',boxWidth:12,font:{size:10}}}}}
  });

  renderMeta();
  renderPresupuestos();
}

function renderMeta(){
  const t = I18N[currentLang];
  const cont = document.getElementById('metaProgreso');
  if(!meta){ cont.style.display = 'none'; return; }
  cont.style.display = 'block';

  const totalIn = ingresos.reduce((s,g)=>s+g.monto,0);
  const totalOut = gastos.reduce((s,g)=>s+g.monto,0);
  const balance = totalIn - totalOut;
  const pct = meta.monto > 0 ? Math.min(100, Math.max(0, (balance/meta.monto)*100)) : 0;
  document.getElementById('metaSeg').style.width = pct + '%';

  const hoy = new Date();
  const objetivo = new Date(meta.fecha + 'T00:00:00');
  const mesesRestantes = Math.max(1, Math.round((objetivo - hoy)/(1000*60*60*24*30)));
  const faltante = Math.max(0, meta.monto - balance);
  const mensualNecesario = faltante / mesesRestantes;

  document.getElementById('metaTexto').textContent = `${meta.nombre}: $${balance.toFixed(0)} / $${meta.monto.toFixed(0)} (${pct.toFixed(0)}%)`;
  document.getElementById('metaMensual').textContent = balance >= meta.monto
    ? t.metaLograda
    : `${t.metaNecesitas} $${mensualNecesario.toFixed(0)}/mes`;
}

function renderPresupuestos(){
  const t = I18N[currentLang];
  const cont = document.getElementById('presupuestoLista');
  const cats = Object.keys(presupuestos);
  if(cats.length === 0){
    cont.innerHTML = `<p class="badge">${t.presupuestoVacio}</p>`;
    return;
  }
  const mesActual = new Date().toISOString().slice(0,7);
  cont.innerHTML = cats.map(cat=>{
    const limite = presupuestos[cat];
    const gastado = gastos.filter(g=>g.categoria===cat && g.fecha.slice(0,7)===mesActual).reduce((s,g)=>s+g.monto,0);
    const pct = limite > 0 ? Math.min(100, (gastado/limite)*100) : 0;
    const color = pct < 70 ? 'green' : pct < 100 ? 'yellow' : 'red';
    const barColor = pct < 70 ? 'var(--mint)' : pct < 100 ? 'var(--gold)' : 'var(--danger)';
    const catLabel = CATEGORY_LABELS[cat] ? CATEGORY_LABELS[cat][currentLang] : cat;
    return `<div class="pres-row">
      <div class="pres-dot ${color}"></div>
      <div class="pres-info">
        <div class="cat">${ICONS[cat]||''} ${catLabel}</div>
        <div class="bar"><div class="fill" style="width:${pct}%;background:${barColor}"></div></div>
      </div>
      <div class="pres-nums">$${gastado.toFixed(0)} ${t.presupuestoDe} $${limite.toFixed(0)}</div>
      <button class="pres-del" onclick="borrarPresupuesto('${cat}')">✕</button>
    </div>`;
  }).join('');
}

function borrarPresupuesto(cat){
  delete presupuestos[cat];
  guardarPresupuestos();
  renderPresupuestos();
}

function borrar(tipo, id){
  if(!window.confirm(I18N[currentLang].confirmBorrar)) return;
  const arr = tipo==='gasto' ? gastos : ingresos;
  const idx = arr.findIndex(m=>m.id===id);
  if(idx>-1) arr.splice(idx,1);
  if(editando && editando.id===id) cancelarEdicion();
  render();
}

function editar(id){
  let item = gastos.find(m=>m.id===id);
  let tipo = 'gasto';
  if(!item){ item = ingresos.find(m=>m.id===id); tipo = 'ingreso'; }
  if(!item) return;

  editando = {tipo, id};
  switchTab(tipo);

  if(tipo === 'gasto'){
    document.getElementById('montoG').value = item.monto;
    document.getElementById('categoria').value = item.categoria;
    document.getElementById('descG').value = item.desc || '';
    document.getElementById('recurG').checked = !!item.recurrente;
  }else{
    document.getElementById('montoI').value = item.monto;
    document.getElementById('fuente').value = item.categoria;
    document.getElementById('descI').value = item.desc || '';
    document.getElementById('recurI').checked = !!item.recurrente;
  }
  document.getElementById('cancelEdit').style.display = 'inline-block';
  aplicarIdioma();
  window.scrollTo({top:0, behavior:'smooth'});
}

function cancelarEdicion(){
  editando = null;
  document.getElementById('formGasto').reset();
  document.getElementById('formIngreso').reset();
  document.getElementById('cancelEdit').style.display = 'none';
  aplicarIdioma();
}

document.getElementById('formGasto').addEventListener('submit', e=>{
  e.preventDefault();
  const monto = parseFloat(document.getElementById('montoG').value);
  const categoria = document.getElementById('categoria').value;
  const desc = document.getElementById('descG').value;
  const recurrente = document.getElementById('recurG').checked;
  if(!monto || monto<=0 || !isFinite(monto)) return;

  if(editando && editando.tipo==='gasto'){
    const item = gastos.find(m=>m.id===editando.id);
    if(item){ item.monto = monto; item.categoria = categoria; item.desc = desc; item.recurrente = recurrente; }
    editando = null;
    document.getElementById('cancelEdit').style.display = 'none';
  }else{
    gastos.push({id:genId(), tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria, desc, monto, recurrente});
  }
  e.target.reset();
  aplicarIdioma();
});

document.getElementById('formIngreso').addEventListener('submit', e=>{
  e.preventDefault();
  const monto = parseFloat(document.getElementById('montoI').value);
  const categoria = document.getElementById('fuente').value;
  const desc = document.getElementById('descI').value;
  const recurrente = document.getElementById('recurI').checked;
  if(!monto || monto<=0 || !isFinite(monto)) return;

  if(editando && editando.tipo==='ingreso'){
    const item = ingresos.find(m=>m.id===editando.id);
    if(item){ item.monto = monto; item.categoria = categoria; item.desc = desc; item.recurrente = recurrente; }
    editando = null;
    document.getElementById('cancelEdit').style.display = 'none';
  }else{
    ingresos.push({id:genId(), tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria, desc, monto, recurrente});
  }
  e.target.reset();
  aplicarIdioma();
});

document.getElementById('buscador').addEventListener('input', render);
document.getElementById('filtroMes').addEventListener('change', render);

document.getElementById('formMeta').addEventListener('submit', e=>{
  e.preventDefault();
  const t = I18N[currentLang];
  const nombre = document.getElementById('metaNombre').value || 'Meta';
  const monto = parseFloat(document.getElementById('metaMonto').value);
  const fecha = document.getElementById('metaFecha').value;
  if(!monto || monto<=0 || !fecha) return;
  if(fecha < new Date().toISOString().slice(0,10)){ alert(t.metaFechaPasada); return; }
  meta = {nombre, monto, fecha};
  guardarMeta();
  e.target.reset();
  renderMeta();
});

document.getElementById('btnEliminarMeta').addEventListener('click', ()=>{
  meta = null;
  guardarMeta();
  renderMeta();
});

document.getElementById('formPresupuesto').addEventListener('submit', e=>{
  e.preventDefault();
  const cat = document.getElementById('presCategoria').value;
  const monto = parseFloat(document.getElementById('presMonto').value);
  if(!monto || monto<=0) return;
  presupuestos[cat] = monto;
  guardarPresupuestos();
  e.target.reset();
  renderPresupuestos();
});

function exportarJSON(){
  const blob = new Blob([JSON.stringify({gastos, ingresos, meta, presupuestos}, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mis_finanzas.json';
  a.click();
}

function exportarCSV(){
  const todos = [...gastos, ...ingresos].sort((a,b)=> a.fecha < b.fecha ? -1 : 1);
  let csv = 'Fecha,Tipo,Categoria,Descripcion,Monto\n';
  todos.forEach(m=>{
    const desc = (m.desc||'').replace(/"/g,'""');
    csv += `${m.fecha},${m.tipo},${m.categoria},"${desc}",${m.monto}\n`;
  });
  const blob = new Blob([csv], {type:'text/csv'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'finzn_movimientos.csv';
  a.click();
}

function importarJSON(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    try{
      const data = JSON.parse(ev.target.result);
      if(data.gastos && data.ingresos){
        gastos = migrar(data.gastos);
        ingresos = migrar(data.ingresos);
        meta = data.meta || null;
        presupuestos = data.presupuestos || {};
        guardarMeta();
        guardarPresupuestos();
        render();
      }else if(Array.isArray(data)){
        gastos = migrar(data);
        render();
      }
    }catch(err){ alert(I18N[currentLang].archivoInvalido); }
  };
  reader.readAsText(file);
}

function construirPrompt(){
  const lang = currentLang;
  const catLabel = c => CATEGORY_LABELS[c] ? CATEGORY_LABELS[c][lang] : c;
  const tipoGasto = lang === 'es' ? 'GASTO' : 'EXPENSE';
  const tipoIngreso = lang === 'es' ? 'INGRESO' : 'INCOME';
  const resumenGastos = gastos.map(g=>`${g.fecha} | ${tipoGasto} | ${catLabel(g.categoria)} | ${g.desc||'-'} | $${g.monto}`).join('\n');
  const resumenIngresos = ingresos.map(g=>`${g.fecha} | ${tipoIngreso} | ${catLabel(g.categoria)} | ${g.desc||'-'} | $${g.monto}`).join('\n');

  const metaTxt = meta
    ? (lang === 'es'
        ? `\nMETA DE AHORRO: quiere juntar $${meta.monto} para "${meta.nombre}" antes de ${meta.fecha}.`
        : `\nSAVINGS GOAL: wants to save $${meta.monto} for "${meta.nombre}" by ${meta.fecha}.`)
    : '';

  if(lang === 'en'){
    return `You are a practical financial advisor talking to a teen/young adult about to turn 18, about their personal finances (allowance + income from small coding gigs, no debts or complex assets). Their transactions:

INCOME:
${resumenIngresos || 'No income recorded'}

EXPENSES:
${resumenGastos || 'No expenses recorded'}
${metaTxt}

Answer in English. Close, direct tone, NO filler:
1. A short summary: does their income cover their expenses? where does most of it go?
2. 3 patterns or red flags you notice (small recurring spending, subscriptions, relying on a single income source, etc).
3. 3 concrete, actionable tips, considering they're about to turn 18 and could start handling more financial responsibility (bank account, savings, etc). If there's a savings goal, tell them how to cover daily needs WITHOUT giving up on saving to hit it on time, and whether their current pace is enough or needs adjusting.
Use lists, no long paragraphs.`;
  }

  return `Eres un asesor financiero práctico hablando con un adolescente/joven a punto de cumplir 18 años sobre sus finanzas personales (mesada + ingresos por chambitas de programación, sin deudas ni activos complejos). Sus movimientos:

INGRESOS:
${resumenIngresos || 'Sin ingresos registrados'}

GASTOS:
${resumenGastos || 'Sin gastos registrados'}
${metaTxt}

Responde en español. Tono cercano y directo, SIN relleno:
1. Un resumen corto: ¿sus ingresos cubren sus gastos? ¿en qué se le va más?
2. 3 patrones o focos rojos que notes (gasto hormiga, suscripciones, dependencia de un solo ingreso, etc).
3. 3 consejos concretos y accionables, pensando en que está por cumplir 18 y podría empezar a manejar más responsabilidad financiera (cuenta bancaria, ahorro, etc). Si hay una meta de ahorro, dile cómo cubrir sus necesidades diarias SIN dejar de ahorrar para llegar a tiempo, y si el ritmo actual alcanza o necesita ajustar algo.
Usa listas, nada de párrafos largos.`;
}

async function analizar(){
  const t = I18N[currentLang];
  const btn = document.getElementById('btnAnalizar');
  const box = document.getElementById('iaResult');
  if(gastos.length === 0 && ingresos.length === 0){ alert(t.alertMovimiento); return; }

  btn.disabled = true;
  btn.textContent = t.btnAnalizando;
  box.style.display = 'block';
  box.textContent = t.pensando;

  const prompt = construirPrompt();

  try{
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    if(!response.ok){
      const errBody = await response.text();
      box.textContent = `Error ${response.status}: ${errBody}`;
      btn.disabled = false;
      btn.textContent = t.btnAnalizar;
      return;
    }

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content;
    box.textContent = texto || t.noAnalisis;
  }catch(err){
    box.textContent = t.errorConexion + err.message;
  }
  btn.disabled = false;
  btn.textContent = t.btnAnalizar;
}

document.getElementById('metaFecha').min = new Date().toISOString().slice(0,10);

function getToken(){ return localStorage.getItem(TOKEN_STORAGE); }

let syncTimeout = null;
function programarSyncNube(){
  if(!getToken()) return;
  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async ()=>{
    try{
      await fetch(WORKER_URL + '/sync/save', {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Authorization': 'Bearer ' + getToken()},
        body: JSON.stringify({ data: {gastos, ingresos, meta, presupuestos} })
      });
    }catch(e){}
  }, 800);
}

async function cargarNubeInicial(){
  try{
    const res = await fetch(WORKER_URL + '/sync/load', { headers: {'Authorization': 'Bearer ' + getToken()} });
    if(!res.ok) return;
    const json = await res.json();
    if(json.found){
      gastos = migrar(json.data.gastos || []);
      ingresos = migrar(json.data.ingresos || []);
      meta = json.data.meta || null;
      presupuestos = json.data.presupuestos || {};
      render();
    }
  }catch(e){}
}

function togglePwVisibility(){
  const inp = document.getElementById('authPassword');
  const btn = document.getElementById('pwToggle');
  const show = inp.type === 'password';
  inp.type = show ? 'text' : 'password';
  btn.textContent = show ? '🙈' : '👁';
}

function toggleAuthMode(){
  authMode = authMode === 'login' ? 'register' : 'login';
  document.getElementById('authTitle').textContent = authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta';
  document.getElementById('authToggle').textContent = authMode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión';
  document.getElementById('authError').textContent = '';
}

function mostrarApp(){
  document.getElementById('authScreen').style.display = 'none';
  document.getElementById('appRoot').style.display = 'block';
  cargarNubeInicial();
}

function cerrarSesion(){
  fetch(WORKER_URL + '/auth/logout', { method:'POST', headers:{'Authorization':'Bearer ' + getToken()} }).catch(()=>{});
  localStorage.removeItem(TOKEN_STORAGE);
  location.reload();
}

document.getElementById('formAuth').addEventListener('submit', async e=>{
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value;
  const errEl = document.getElementById('authError');
  const btn = document.getElementById('authSubmit');
  errEl.textContent = '';
  btn.disabled = true;
  try{
    const path = authMode === 'login' ? '/auth/login' : '/auth/register';
    const res = await fetch(WORKER_URL + path, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if(!res.ok){ errEl.textContent = json.error || 'Error'; btn.disabled = false; return; }
    localStorage.setItem(TOKEN_STORAGE, json.token);
    mostrarApp();
  }catch(err){
    errEl.textContent = 'Error de conexión: ' + err.message;
  }
  btn.disabled = false;
});

if(getToken()){ mostrarApp(); }

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=> navigator.serviceWorker.register('/sw.js').catch(()=>{}));
}

function appYaInstalada(){
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function dismissInstallBanner(){
  localStorage.setItem('finzn_install_dismissed', '1');
  document.getElementById('installBanner').style.display = 'none';
}

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', e=>{
  e.preventDefault();
  deferredInstallPrompt = e;
});

async function instalarApp(){
  if(deferredInstallPrompt){
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    document.getElementById('installBanner').style.display = 'none';
    return;
  }
  const esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const msg = esIOS
    ? 'En iPhone/iPad: toca el ícono de Compartir (el cuadro con la flecha hacia arriba) y elige "Agregar a inicio".'
    : 'Busca el ícono de instalar (⊕ o pantalla con flecha) en la barra de direcciones de tu navegador, o abre el menú (⋮) y elige "Instalar app" / "Agregar a pantalla de inicio".';
  alert(msg);
}

if(!appYaInstalada() && !localStorage.getItem('finzn_install_dismissed')){
  document.getElementById('installBanner').style.display = 'flex';
}

window.addEventListener('appinstalled', ()=>{
  document.getElementById('installBanner').style.display = 'none';
});

aplicarTema();
aplicarIdioma();
