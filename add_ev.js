const fs = require('fs');

let html = fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', 'utf8');
const data = JSON.parse(fs.readFileSync('c:/Users/Silviu/Desktop/Android App/statii_reincarcare_ev.json', 'utf8'));

const totalV = Math.round(data.financiar.valoare_totala);
const totalAFM = Math.round(data.financiar.finantare_afm);
const totalBL = Math.round(data.financiar.buget_local_diferenta);
const totalStatii = data.numar_statii; // 9

// Count stations per location from nr field
function countStatii(nr) {
  if (nr.includes('si')) return 2;
  return 1;
}

const entries = data.statii.map((s, i) => {
  const cnt = countStatii(s.nr);
  const v   = Math.round(cnt * totalV   / totalStatii);
  const afm = Math.round(cnt * totalAFM / totalStatii);
  const bl  = Math.round(cnt * totalBL  / totalStatii);
  const id  = 'EV-' + String(i + 1).padStart(2, '0');
  const plural = cnt > 1 ? cnt + ' statii' : '1 statie';
  const desc = plural + ' de reincarcare vehicule electrice. Locatie: ' + s.locatie + '. Acces din ' + s.acces_din + '. Finantare AFM (nerambursabila) + buget local.';

  return '{id:"' + id + '",n:"Statie reincarcare EV - ' + s.locatie.replace(/"/g,"'") + '",' +
    'cat:"Mobilitate electrica",ic:"⚡",' +
    'la:' + s.lat + ',ln:' + s.lng + ',' +
    'buget:' + v + ',platit:' + v + ',' +
    'fe:' + afm + ',bl:' + bl + ',' +
    'sursa:"AFM + Buget Local (contract 368/GES din 20.12.2023)",' +
    'stadiu:"finalizat",progres:100,' +
    'start:"2023",termen:"2025",cartier:"Municipiul Pascani",' +
    'desc:"' + desc + '",' +
    'a:"' + s.acces_din.replace(/"/g,"'") + '"}';
});

const invEnd = html.indexOf('];', html.indexOf('const INV=['));
html = html.slice(0, invEnd) + ',\n' + entries.join(',\n') + '\n' + html.slice(invEnd);

fs.writeFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', html, 'utf8');

// Verify
const invStart = html.indexOf('const INV=[');
const invEndNew = html.indexOf('];', invStart) + 2;
eval('var INV=' + html.slice(invStart + 'const INV='.length, invEndNew));
const ev = INV.filter(x => x.id && x.id.startsWith('EV-'));
console.log('INV total:', INV.length, '| EV entries:', ev.length);
ev.forEach(e => console.log(' -', e.n, '| buget:', e.buget, 'AFM:', e.fe, 'BL:', e.bl));
