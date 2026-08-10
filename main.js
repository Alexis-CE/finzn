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
    btnExport: '⬇ Exportar',
    btnImport: '⬆ Importar',
    lblBalance: 'Balance', lblIn: 'Ingresos', lblOut: 'Gastos', lblRate: 'Tasa de ahorro',
    tabGasto: '📉 Gasto', tabIngreso: '📈 Ingreso',
    phMonto: 'Monto', phDescG: 'Descripción (opcional)', phDescI: 'Descripción (ej. tarea de Python)',
    btnAgregar: 'Agregar',
    movTitle: '📋 Movimientos',
    thFecha: 'Fecha', thTipo: 'Categoría', thDesc: 'Descripción', thMonto: 'Monto',
    emptyState: 'Todavía no hay movimientos. Agrega tu primer gasto o ingreso arriba ↑',
    chartTitle: '🍩 Gastos por categoría',
    iaTitle: '🤖 Análisis con IA',
    iaBadge: 'La IA revisa tus movimientos y te dice en qué se te va el dinero, si tus ingresos cubren tus gastos y qué podrías ajustar. No sustituye consejo financiero profesional.',
    btnAnalizar: 'Analizar mis finanzas',
    btnAnalizando: 'Analizando...',
    meterIn: 'Ingresos', meterOut: 'Gastos',
    registros: 'registros',
    alertMovimiento: 'Agrega al menos un movimiento primero',
    apiKeyPrompt: 'Pega tu API Key de Groq (gratis en console.groq.com/keys).\nSe guarda solo en tu navegador, nunca sale de tu compu:',
    apiKeyInvalida: 'API Key inválida. La borré de tu navegador — dale click de nuevo a Analizar y pega una válida.',
    pensando: 'Pensando...',
    noAnalisis: 'No se pudo generar el análisis.',
    errorConexion: 'Error al conectar con la IA: ',
    archivoInvalido: 'Archivo inválido',
    idiomaPrompt: 'Responde en español.'
  },
  en: {
    title: '💸 Where does my money go?',
    subtitle: 'Income, expenses and AI advice',
    btnExport: '⬇ Export',
    btnImport: '⬆ Import',
    lblBalance: 'Balance', lblIn: 'Income', lblOut: 'Expenses', lblRate: 'Savings rate',
    tabGasto: '📉 Expense', tabIngreso: '📈 Income',
    phMonto: 'Amount', phDescG: 'Description (optional)', phDescI: 'Description (e.g. Python homework)',
    btnAgregar: 'Add',
    movTitle: '📋 Transactions',
    thFecha: 'Date', thTipo: 'Category', thDesc: 'Description', thMonto: 'Amount',
    emptyState: 'No transactions yet. Add your first expense or income above ↑',
    chartTitle: '🍩 Expenses by category',
    iaTitle: '🤖 AI analysis',
    iaBadge: 'The AI reviews your transactions and tells you where your money is going, whether your income covers your expenses, and what you could adjust. Not a substitute for professional financial advice.',
    btnAnalizar: 'Analyze my finances',
    btnAnalizando: 'Analyzing...',
    meterIn: 'Income', meterOut: 'Expenses',
    registros: 'records',
    alertMovimiento: 'Add at least one transaction first',
    apiKeyPrompt: 'Paste your Groq API Key (free at console.groq.com/keys).\nIt\'s saved only in your browser, it never leaves your computer:',
    apiKeyInvalida: 'Invalid API Key. I removed it from your browser — click Analyze again and paste a valid one.',
    pensando: 'Thinking...',
    noAnalisis: 'Could not generate the analysis.',
    errorConexion: 'Error connecting to the AI: ',
    archivoInvalido: 'Invalid file',
    idiomaPrompt: 'Answer in English.'
  }
};

const STORAGE_KEY = 'finanzas_datos_v1';
const API_KEY_STORAGE = 'finanzas_groq_key';
const LANG_STORAGE = 'finanzas_lang';

const DEMO_GASTOS = [
  {tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Suscripciones", desc:"Spotify", monto:115},
];
const DEMO_INGRESOS = [
  {tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria:"Mesada", desc:"Semanal", monto:300},
];

function cargarDatos(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){
      const data = JSON.parse(raw);
      return {gastos: data.gastos || [], ingresos: data.ingresos || []};
    }
  }catch(e){}
  return {gastos: DEMO_GASTOS, ingresos: DEMO_INGRESOS};
}

function guardarDatos(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({gastos, ingresos}));
}

const datosIniciales = cargarDatos();
let gastos = datosIniciales.gastos;
let ingresos = datosIniciales.ingresos;
let currentLang = localStorage.getItem(LANG_STORAGE) || 'es';

let chart;

function switchTab(t){
  document.getElementById('tabGasto').classList.toggle('active', t==='gasto');
  document.getElementById('tabIngreso').classList.toggle('active', t==='ingreso');
  document.getElementById('formGasto').style.display = t==='gasto' ? 'grid' : 'none';
  document.getElementById('formIngreso').style.display = t==='ingreso' ? 'grid' : 'none';
}

function pop(el){
  el.classList.remove('pop');
  void el.offsetWidth; // reinicia la animación
  el.classList.add('pop');
}

function traducirSelect(id){
  const select = document.getElementById(id);
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

function aplicarIdioma(){
  const t = I18N[currentLang];
  document.documentElement.lang = currentLang;
  document.getElementById('appTitle').textContent = t.title;
  document.getElementById('appSub').textContent = t.subtitle;
  document.getElementById('btnExport').textContent = t.btnExport;
  document.getElementById('btnImport').textContent = t.btnImport;
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
  document.getElementById('btnAgregarG').textContent = t.btnAgregar;
  document.getElementById('btnAgregarI').textContent = t.btnAgregar;
  document.getElementById('movTitle').textContent = t.movTitle;
  document.getElementById('thFecha').textContent = t.thFecha;
  document.getElementById('thTipo').textContent = t.thTipo;
  document.getElementById('thDesc').textContent = t.thDesc;
  document.getElementById('thMonto').textContent = t.thMonto;
  document.getElementById('emptyState').textContent = t.emptyState;
  document.getElementById('chartTitle').textContent = t.chartTitle;
  document.getElementById('iaTitle').textContent = t.iaTitle;
  document.getElementById('iaBadge').textContent = t.iaBadge;
  document.getElementById('btnAnalizar').textContent = t.btnAnalizar;

  document.querySelectorAll('.lang-opt').forEach(b=>b.classList.toggle('active', b.dataset.lang===currentLang));
  document.getElementById('langIndicator').style.transform = currentLang==='en' ? 'translateX(100%)' : 'translateX(0)';

  traducirSelect('categoria');
  traducirSelect('fuente');

  render();
}

function render(){
  guardarDatos();
  const t = I18N[currentLang];
  const todos = [...gastos, ...ingresos].sort((a,b)=> a.fecha < b.fecha ? 1 : -1);
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  document.getElementById('emptyState').style.display = todos.length ? 'none' : 'block';

  todos.forEach(m=>{
    const tr = document.createElement('tr');
    const isGasto = m.tipo === 'gasto';
    const catLabel = CATEGORY_LABELS[m.categoria] ? CATEGORY_LABELS[m.categoria][currentLang] : m.categoria;
    tr.innerHTML = `<td>${m.fecha}</td>
      <td><span class="chip">${ICONS[m.categoria]||'🔹'} ${catLabel}</span></td>
      <td>${m.desc||'—'}</td>
      <td class="${isGasto?'amt-out':'amt-in'}">${isGasto?'-':'+'}$${m.monto.toFixed(2)}</td>
      <td><button class="del" onclick="borrar('${m.tipo}', ${(isGasto?gastos:ingresos).indexOf(m)})">✕</button></td>`;
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

  const porCat = {};
  gastos.forEach(g=>porCat[g.categoria]=(porCat[g.categoria]||0)+g.monto);
  const labels = Object.keys(porCat).map(k => (ICONS[k]||'') + ' ' + (CATEGORY_LABELS[k] ? CATEGORY_LABELS[k][currentLang] : k));
  const data = Object.values(porCat);

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById('chart'), {
    type:'doughnut',
    data:{labels, datasets:[{data, backgroundColor:['#5ee6b8','#ff8b6b','#7aa2ff','#ffd66b','#ff5f6d','#b98bff','#6bd6ff','#c4c4c4','#5ee6b8']}]},
    options:{plugins:{legend:{position:'bottom',labels:{color:'#e8eaed',boxWidth:12,font:{size:10}}}}}
  });
}

function borrar(tipo, i){ (tipo==='gasto'?gastos:ingresos).splice(i,1); render(); }

document.getElementById('formGasto').addEventListener('submit', e=>{
  e.preventDefault();
  const monto = parseFloat(document.getElementById('montoG').value);
  const categoria = document.getElementById('categoria').value;
  const desc = document.getElementById('descG').value;
  if(!monto || monto<=0) return;
  gastos.push({tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria, desc, monto});
  e.target.reset();
  render();
});

document.getElementById('formIngreso').addEventListener('submit', e=>{
  e.preventDefault();
  const monto = parseFloat(document.getElementById('montoI').value);
  const categoria = document.getElementById('fuente').value;
  const desc = document.getElementById('descI').value;
  if(!monto || monto<=0) return;
  ingresos.push({tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria, desc, monto});
  e.target.reset();
  render();
});

function exportarJSON(){
  const blob = new Blob([JSON.stringify({gastos, ingresos},null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mis_finanzas.json';
  a.click();
}

function importarJSON(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    try{
      const data = JSON.parse(ev.target.result);
      if(data.gastos && data.ingresos){ gastos = data.gastos; ingresos = data.ingresos; render(); }
      else if(Array.isArray(data)){ gastos = data; render(); } // compat con export viejo
    }catch(err){ alert(I18N[currentLang].archivoInvalido); }
  };
  reader.readAsText(file);
}

function obtenerApiKey(){
  let key = localStorage.getItem(API_KEY_STORAGE);
  if(!key){
    key = window.prompt(I18N[currentLang].apiKeyPrompt);
    if(key) localStorage.setItem(API_KEY_STORAGE, key.trim());
  }
  return key ? key.trim() : null;
}

async function analizar(){
  const t = I18N[currentLang];
  const btn = document.getElementById('btnAnalizar');
  const box = document.getElementById('iaResult');
  if(gastos.length === 0 && ingresos.length === 0){ alert(t.alertMovimiento); return; }

  const apiKey = obtenerApiKey();
  if(!apiKey) return;

  btn.disabled = true;
  btn.textContent = t.btnAnalizando;
  box.style.display = 'block';
  box.textContent = t.pensando;

  const resumenGastos = gastos.map(g=>`${g.fecha} | GASTO | ${g.categoria} | ${g.desc||'-'} | $${g.monto}`).join('\n');
  const resumenIngresos = ingresos.map(g=>`${g.fecha} | INGRESO | ${g.categoria} | ${g.desc||'-'} | $${g.monto}`).join('\n');

  const prompt = `Eres un asesor financiero práctico hablando con un adolescente/joven a punto de cumplir 18 años sobre sus finanzas personales (mesada + ingresos por chambitas de programación, sin deudas ni activos complejos). Sus movimientos:\n\nINGRESOS:\n${resumenIngresos || 'Sin ingresos registrados'}\n\nGASTOS:\n${resumenGastos || 'Sin gastos registrados'}\n\n${t.idiomaPrompt} Tono cercano y directo, SIN relleno:\n1. Un resumen corto: ¿sus ingresos cubren sus gastos? ¿en qué se le va más?\n2. 3 patrones o focos rojos que notes (gasto hormiga, suscripciones, dependencia de un solo ingreso, etc).\n3. 3 consejos concretos y accionables, pensando en que está por cumplir 18 y podría empezar a manejar más responsabilidad financiera (cuenta bancaria, ahorro, etc).\nUsa listas, nada de párrafos largos.`;

  try{
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    if(!response.ok){
      const errBody = await response.text();
      if(response.status === 401){
        localStorage.removeItem(API_KEY_STORAGE);
        box.textContent = t.apiKeyInvalida;
      }else{
        box.textContent = `Error ${response.status}: ${errBody}`;
      }
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

aplicarIdioma();
