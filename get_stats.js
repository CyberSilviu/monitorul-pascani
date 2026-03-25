const fs=require('fs');
const html=fs.readFileSync('./www/index.html','utf8');

function extractArray(name){
  const s=html.indexOf('const '+name+'=[');
  const raw=html.slice(s+('const '+name+'=').length);
  let d=0,i=0;
  for(;i<raw.length;i++){if(raw[i]==='[')d++;if(raw[i]===']'){if(d===1)break;d--;}}
  return JSON.parse(raw.slice(0,i+1));
}

const AC=extractArray('AC');
const INV=extractArray('INV');
const L=extractArray('L_ALL');

const totalAC=AC.reduce((s,a)=>s+(a.v||0),0);
const totalINV=INV.reduce((s,i)=>s+(i.buget||0),0);
const eco=INV.filter(x=>x.id&&x.id.startsWith('ECO'));
const ev=INV.filter(x=>x.id&&x.id.startsWith('EV'));
const invCore=INV.filter(x=>x.id&&!x.id.startsWith('ECO')&&!x.id.startsWith('EV'));

console.log('=== STATISTICI PROIECT ===');
console.log('Autorizatii construire:', AC.length);
console.log('  Total valoare AC:', (totalAC/1e6).toFixed(2),'milioane RON');
console.log('Investitii publice core:', invCore.length);
console.log('Eco-insule:', eco.length,'locatii');
console.log('Statii EV:', ev.length,'locatii');
console.log('  Total investitii INV:', (totalINV/1e6).toFixed(2),'milioane RON');
console.log('Locatii POI:', L.length);
const cats={};L.forEach(l=>{cats[l.c]=(cats[l.c]||0)+1;});
Object.entries(cats).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  ',k,':',v));
