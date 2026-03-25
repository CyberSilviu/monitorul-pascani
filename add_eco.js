const fs = require('fs');

let html = fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html','utf8');

// Remove any previously inserted eco entries
const ecoStart = html.indexOf(',\n{id:"ECO-DEAL-01"');
if (ecoStart > 0) {
  const invClose = html.indexOf('\n];', ecoStart);
  html = html.slice(0, ecoStart) + '\n' + html.slice(invClose);
  console.log('Removed previous eco entries');
}

const data = JSON.parse(fs.readFileSync('c:/Users/Silviu/Desktop/Android App/eco_insule.json','utf8'));
const allLoc = [...data.deal, ...data.vale];
const totalV = 3443650;
const perInsula = Math.round(totalV / data.totals.insule); // 68873 per island

function clean(s) {
  return (s||'').replace(/"/g, "'").replace(/\\/g, '');
}

let entries = [];
allLoc.forEach(loc => {
  const v = Math.round(loc.nr_insule * perInsula);
  const zona = loc.zona;
  const id = 'ECO-' + zona.toUpperCase() + '-' + String(loc.nr).padStart(2,'0');
  const forma = clean(loc.forma);
  const adresa = clean(loc.adresa);
  const locatie = clean(loc.locatie);
  const plural = loc.nr_insule > 1 ? 'e' : '';
  const desc = loc.nr_insule + ' eco-insula' + plural + ' pentru colectare selectiva deseuri. Serveste ' + loc.apartamente + ' apartamente din ' + loc.blocuri.length + ' blocuri. Amplasament: ' + forma + '.';

  entries.push(
    '{id:"' + id + '",n:"Eco-insula ' + zona + ' ' + loc.nr + ' - ' + locatie + '",' +
    'cat:"Mediu / Colectare selectiva",ic:"♻️",' +
    'la:' + loc.lat_dec + ',ln:' + loc.lng_dec + ',' +
    'buget:' + v + ',platit:' + v + ',fe:' + v + ',bl:0,' +
    'sursa:"PNRR - Fonduri Europene",' +
    'stadiu:"implementare",progres:80,' +
    'start:"2024",termen:"2025",cartier:"' + zona + '",' +
    'desc:"' + desc + '",' +
    'a:"' + adresa + '"}'
  );
});

const invEnd = html.indexOf('];', html.indexOf('const INV=['));
html = html.slice(0, invEnd) + ',\n' + entries.join(',\n') + '\n' + html.slice(invEnd);

fs.writeFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', html, 'utf8');

// Verify INV
const invStart = html.indexOf('const INV=[');
const invEndNew = html.indexOf('];', invStart) + 2;
eval('var INV=' + html.slice(invStart + 'const INV='.length, invEndNew));
console.log('INV OK:', INV.length, 'entries (was 19 + 31 eco = 50)');
console.log('Sample:', INV[INV.length-1].n, '| v:', INV[INV.length-1].buget);

// Verify AC still OK
const acStart = html.indexOf('const AC=[');
const acEnd = html.indexOf('];', acStart) + 2;
eval('var AC=' + html.slice(acStart + 'const AC='.length, acEnd));
console.log('AC OK:', AC.length, 'entries');
