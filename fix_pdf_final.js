const fs = require('fs');
const https = require('https');
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

function nominatim(q){
  return new Promise(resolve=>{
    const url=`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q+', Pascani, Iasi, Romania')}&format=json&limit=1&countrycodes=ro`;
    https.get(url,{headers:{'User-Agent':'CivicDataLive/1.0'}},res=>{
      let d=''; res.on('data',c=>d+=c);
      res.on('end',()=>{
        try{const j=JSON.parse(d);if(j.length)resolve({la:+j[0].lat,ln:+j[0].lon});else resolve(null);}
        catch{resolve(null);}
      });
    }).on('error',()=>resolve(null));
  });
}

function findACEnd(html){
  const acStart=html.indexOf('const AC=[');
  const raw=html.slice(acStart+'const AC='.length);
  let d=0,i=0;
  for(;i<raw.length;i++){
    const c=raw.charCodeAt(i);
    if(c===91)d++;
    if(c===93){d--;if(d===0)break;}
  }
  return acStart+'const AC='.length+i+1;
}

async function main(){
  let html=fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html','utf8');
  const acStart=html.indexOf('const AC=[');
  const acEnd=findACEnd(html);
  const AC=JSON.parse(html.slice(acStart+'const AC='.length, acEnd));
  console.log('Loaded AC:', AC.length);

  // 1. Geocode specific entries with known addresses from PDF
  const toGeocode=[
    {nr:'74', a:2023, addr:'Izvoarelor', ad:'IZVOARELOR', st:'Izvoarelor'},
    {nr:'91', a:2023, addr:null, ad:'Municipiul Pascani - mai multe strazi', st:'', la:47.2507, ln:26.7229},
    {nr:'89', a:2021, addr:'Gradinitei 5', ad:'GRADINITEI NR. 5', st:'Gradinitei'},
    {nr:'74', a:2022, addr:'Gradinitei 5', ad:'GRADINITEI NR. 5', st:'Gradinitei'},
    {nr:'11', a:2021, addr:'Sportului 11', ad:'SPORTULUI NR. 11', st:'Sportului'},
    {nr:'86', a:2023, addr:'Ceferistilor 3', ad:'CEFERISTILOR NR. 3', st:'Ceferistilor'},
    {nr:'124',a:2022, addr:'Stefan cel Mare 17', ad:'STEFAN CEL MARE NR. 17-19 SI ALEEA PARCULUI', st:'Stefan Cel Mare'},
  ];

  for(const u of toGeocode){
    const entries=AC.filter(a=>a.nr===u.nr&&a.a===u.a);
    for(const e of entries){
      e.ad=u.ad; e.st=u.st;
      if(u.la){e.la=u.la;e.ln=u.ln;console.log(`Set manual ${u.nr}/${u.a}`);}
      else{
        await sleep(1100);
        const g=await nominatim(u.addr);
        if(g&&g.la>47.22&&g.la<47.30){
          e.la=+g.la.toFixed(7);e.ln=+g.ln.toFixed(7);
          console.log(`Geocoded ${u.nr}/${u.a}: ${e.la},${e.ln}`);
        } else console.log(`Geocode FAIL ${u.nr}/${u.a}`);
      }
    }
  }

  // 2. Fix CLP ECOSERV
  const clp=AC.find(a=>a.nr==='new-clp');
  if(clp){
    Object.assign(clp,{v:19227447,fe:17081965,bl:2845511,c:'Infrastructura rutiera',
      inv:'CLP ECOSERV',la:47.2465099,ln:26.7105720,ad:'Pascani',st:'',
      ds:'Achizitie autobuze electrice pentru transportul public local Pascani'});
    console.log('Fixed CLP ECOSERV');
  }

  // 3. Fix Liceul Nicolae Iorga
  const iorga=AC.find(a=>a.nr==='new-iorga');
  if(iorga){
    Object.assign(iorga,{v:8659549,fe:8659549,bl:0,c:'Educatie',inv:'MUNICIPIUL PASCANI',
      la:47.2453201,ln:26.7206524,ad:'str. Ceferistilor nr. 3',st:'Ceferistilor',
      ds:'Reabilitare energetica Liceul Tehnologic Economic Nicolae Iorga Pascani'});
    console.log('Fixed Liceul Iorga');
  }

  // 4. Write back
  const newAcStr='const AC='+JSON.stringify(AC);
  html=html.slice(0,acStart)+newAcStr+html.slice(acEnd);
  fs.writeFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html',html,'utf8');

  // Verify
  const h2=fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html','utf8');
  const acEnd2=findACEnd(h2);
  const A2=JSON.parse(h2.slice(h2.indexOf('const AC=[')+9,acEnd2));
  console.log('Final AC OK:',A2.length,'entries');
}
main().catch(console.error);
