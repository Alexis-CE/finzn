const ICONS = {Comida:'🍔',Transporte:'🚌',Ropa:'👕','Salidas/Ocio':'🎮',Suscripciones:'🔁',Escuela:'📚','Videojuegos/Apps':'🕹',Mascota:'🐾',Otro:'🔹',
  Mesada:'🏠','Chambita/Freelance':'💻',Trabajo:'💼'};

const STORAGE_KEY = 'finanzas_datos_v1';
const API_KEY_STORAGE = 'finanzas_groq_key';

const DEMO_GASTOS = [
  {tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Comida", desc:"Tacos con amigos", monto:120},
  {tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Suscripciones", desc:"Spotify", monto:115},
  {tipo:'gasto', fecha:new Date().toISOString().slice(0,10), categoria:"Videojuegos/Apps", desc:"Skin de juego", monto:200},
];
const DEMO_INGRESOS = [
  {tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria:"Mesada", desc:"Semanal", monto:300},
  {tipo:'ingreso', fecha:new Date().toISOString().slice(0,10), categoria:"Chambita/Freelance", desc:"Tarea de programación para compañero", monto:250},
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

let chart;

function switchTab(t){
  document.getElementById('tabGasto').classList.toggle('active', t==='gasto');
  document.getElementById('tabIngreso').classList.toggle('active', t==='ingreso');
  document.getElementById('formGasto').style.display = t==='gasto' ? 'grid' : 'none';
  document.getElementById('formIngreso').style.display = t==='ingreso' ? 'grid' : 'none';
}

function render(){
  guardarDatos();
  const todos = [...gastos, ...ingresos].sort((a,b)=> a.fecha < b.fecha ? 1 : -1);
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  document.getElementById('emptyState').style.display = todos.length ? 'none' : 'block';

  todos.forEach(m=>{
    const tr = document.createElement('tr');
    const isGasto = m.tipo === 'gasto';
    tr.innerHTML = `<td>${m.fecha}</td>
      <td><span class="chip">${ICONS[m.categoria]||'🔹'} ${m.categoria}</span></td>
      <td>${m.desc||'—'}</td>
      <td class="${isGasto?'amt-out':'amt-in'}">${isGasto?'-':'+'}$${m.monto.toFixed(2)}</td>
      <td><button class="del" onclick="borrar('${m.tipo}', ${(isGasto?gastos:ingresos).indexOf(m)})">✕</button></td>`;
    tbody.appendChild(tr);
  });
  document.getElementById('count').textContent = todos.length + ' registros';

  const totalIn = ingresos.reduce((s,g)=>s+g.monto,0);
  const totalOut = gastos.reduce((s,g)=>s+g.monto,0);
  const balance = totalIn - totalOut;
  const rate = totalIn > 0 ? Math.max(0, Math.round((balance/totalIn)*100)) : 0;

  document.getElementById('statBalance').textContent = (balance<0?'-':'') + '$' + Math.abs(balance).toFixed(2);
  document.getElementById('statIn').textContent = '$' + totalIn.toFixed(2);
  document.getElementById('statOut').textContent = '$' + totalOut.toFixed(2);
  document.getElementById('statRate').textContent = rate + '%';

  const totalMeter = totalIn + totalOut;
  const pctIn = totalMeter ? (totalIn/totalMeter*100) : 50;
  document.getElementById('meter').innerHTML =
    `<div class="seg" style="width:${pctIn}%;background:var(--mint)"></div><div class="seg" style="width:${100-pctIn}%;background:var(--coral)"></div>`;
  document.getElementById('meterInTxt').textContent = 'Ingresos $' + totalIn.toFixed(0);
  document.getElementById('meterOutTxt').textContent = 'Gastos $' + totalOut.toFixed(0);

  const porCat = {};
  gastos.forEach(g=>porCat[g.categoria]=(porCat[g.categoria]||0)+g.monto);
  const labels = Object.keys(porCat).map(k => (ICONS[k]||'') + ' ' + k);
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
    }catch(err){ alert('Archivo inválido'); }
  };
  reader.readAsText(file);
}

function obtenerApiKey(){
  let key = localStorage.getItem(API_KEY_STORAGE);
  if(!key){
    key = window.prompt('Pega tu API Key de Groq (gratis en console.groq.com/keys).\nSe guarda solo en tu navegador, nunca sale de tu compu:');
    if(key) localStorage.setItem(API_KEY_STORAGE, key.trim());
  }
  return key ? key.trim() : null;
}

async function analizar(){
  const btn = document.querySelector('.ia');
  const box = document.getElementById('iaResult');
  if(gastos.length === 0 && ingresos.length === 0){ alert('Agrega al menos un movimiento primero'); return; }

  const apiKey = obtenerApiKey();
  if(!apiKey) return;

  btn.disabled = true;
  btn.textContent = 'Analizando...';
  box.style.display = 'block';
  box.textContent = 'Pensando...';

  const resumenGastos = gastos.map(g=>`${g.fecha} | GASTO | ${g.categoria} | ${g.desc||'-'} | $${g.monto}`).join('\n');
  const resumenIngresos = ingresos.map(g=>`${g.fecha} | INGRESO | ${g.categoria} | ${g.desc||'-'} | $${g.monto}`).join('\n');

  const prompt = `Eres un asesor financiero práctico hablando con un adolescente/joven a punto de cumplir 18 años sobre sus finanzas personales (mesada + ingresos por chambitas de programación, sin deudas ni activos complejos). Sus movimientos:\n\nINGRESOS:\n${resumenIngresos || 'Sin ingresos registrados'}\n\nGASTOS:\n${resumenGastos || 'Sin gastos registrados'}\n\nDame en español, tono cercano y directo, SIN relleno:\n1. Un resumen corto: ¿sus ingresos cubren sus gastos? ¿en qué se le va más?\n2. 3 patrones o focos rojos que notes (gasto hormiga, suscripciones, dependencia de un solo ingreso, etc).\n3. 3 consejos concretos y accionables, pensando en que está por cumplir 18 y podría empezar a manejar más responsabilidad financiera (cuenta bancaria, ahorro, etc).\nUsa listas, nada de párrafos largos.`;

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
        box.textContent = 'API Key inválida. La borré de tu navegador — dale click de nuevo a Analizar y pega una válida.';
      }else{
        box.textContent = `Error ${response.status}: ${errBody}`;
      }
      btn.disabled = false;
      btn.textContent = 'Analizar mis finanzas';
      return;
    }

    const data = await response.json();
    const texto = data.choices?.[0]?.message?.content;
    box.textContent = texto || 'No se pudo generar el análisis.';
  }catch(err){
    box.textContent = 'Error al conectar con la IA: ' + err.message;
  }
  btn.disabled = false;
  btn.textContent = 'Analizar mis finanzas';
}

render();