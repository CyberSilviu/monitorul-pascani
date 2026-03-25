const fs = require('fs');
let html = fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', 'utf8');

const acStart = html.indexOf('const AC=[');
const acEnd = html.indexOf('];', acStart) + 2;
eval('var AC=' + html.slice(acStart + 'const AC='.length, acEnd));

// 1. Fix AC135/2024 - company was after "repr al"
const a135 = AC.find(a => a.nr==='135' && a.a===2024);
if (a135) { a135.inv = 'SC SORRISO DENT SRL'; console.log('Fixed AC135 investor'); }

// 2. Update values + add fe/bl from PDF
const updates = [
  {nr:'74',  a:2023, v:4466420},
  {nr:'91',  a:2023, v:6699660},
  {nr:'24',  a:2020, v:5989764, fe:3107271, bl:2874493},
  {nr:'13',  a:2020, v:21920568, fe:20768382, bl:1152186},
  {nr:'89',  a:2021, v:12611498, fe:11041517, bl:1569981},
  {nr:'11',  a:2021, v:9218489,  fe:5689074,  bl:3529415},
  {nr:'124', a:2022, v:17820080, fe:13802948, bl:4017132},
  {nr:'86',  a:2023, v:13989631, fe:12482404, bl:1507227},
  {nr:'90',  a:2023, v:22648470},
  {nr:'122', a:2023, v:24443549},
  {nr:'14',  a:2025, v:19227447, fe:17081965, bl:2845511}, // modernizare transport public
  {nr:'94',  a:2023, v:8659549},  // renovare Liceul Miron Costin
];

updates.forEach(u => {
  const entries = AC.filter(a => a.nr===u.nr && a.a===u.a);
  entries.forEach(e => {
    e.v = u.v;
    if (u.fe) e.fe = u.fe;
    if (u.bl) e.bl = u.bl;
    console.log(`Updated AC${u.nr}/${u.a}: v=${u.v}${u.fe?' fe='+u.fe:''}`);
  });
  if (!entries.length) console.log(`NOT FOUND: AC${u.nr}/${u.a}`);
});

// 3. Add new AC entries (CLP ECOSERV autobuze + Liceul Iorga reabilitare)
const newEntries = [
  {
    a:2025, m:1, nr:'new-clp', dt:'2025',
    v:0, fe:0, bl:0,
    c:'Infrastructura', inv:'CLP ECOSERV',
    ds:'Achizitie autobuze electrice pentru transportul public local Pascani',
    ad:'Pascani',st:'',
    la:47.2465099, ln:26.7105720
  },
  {
    a:2025, m:1, nr:'new-iorga', dt:'2025',
    v:8659549, fe:8659549, bl:0,
    c:'Educatie', inv:'MUNICIPIUL PASCANI',
    ds:'Reabilitare energetica Liceul Tehnologic Economic Nicolae Iorga Pascani',
    ad:'Str. Ceferistilor nr. 3',st:'Ceferistilor',
    la:47.2563500, ln:26.7210600
  },
];
newEntries.forEach(e => { AC.push(e); console.log('Added:', e.ds.substring(0,50)); });

// 4. Serialize back
const newAcStr = 'const AC=' + JSON.stringify(AC);
html = html.slice(0, acStart) + newAcStr + html.slice(acEnd);
fs.writeFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', html, 'utf8');

// Verify
const html2 = fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', 'utf8');
const s2 = html2.indexOf('const AC=[');
const e2 = html2.indexOf('];', s2) + 2;
try { eval('var AC2=' + html2.slice(s2 + 'const AC='.length, e2)); console.log('AC OK:', AC2.length, 'entries'); }
catch(e) { console.log('AC ERROR:', e.message); }
