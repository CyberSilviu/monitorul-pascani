const fs = require('fs');
const https = require('https');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function nominatim(street, number) {
  return new Promise((resolve) => {
    const q = encodeURIComponent(`${number ? number + ' ' : ''}${street}, Pascani, Iasi, Romania`);
    const url = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=ro`;
    const options = { headers: { 'User-Agent': 'CivicDataLive/1.0 geocode_ac' } };
    https.get(url, options, res => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.length > 0) {
            resolve({ la: parseFloat(json[0].lat), ln: parseFloat(json[0].lon) });
          } else resolve(null);
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

function parseAddr(ad) {
  if (!ad) return { street: '', nr: '' };
  const clean = ad.trim()
    .replace(/^(STR\.|STRADA|STR )/i, '')
    .replace(/,.*$/, '') // take only first part before comma
    .trim();
  // Extract number
  const m = clean.match(/^(.+?)\s+NR\.?\s*([0-9A-Z\/]+)/i);
  if (m) return { street: m[1].trim(), nr: m[2].trim() };
  return { street: clean, nr: '' };
}

// Repeated coords that need fixing
const repeatedCoords = new Set([
  '47.2467058_26.7150545',
  '47.2474469_26.7240249',
  '47.2509079_26.7112203',
  '47.2520036_26.726699',
  '47.2453362_26.7002149',
  '47.2565385_26.7114439',
  '47.239768_26.720155',
  '47.2760726_26.7476637',
  '47.2508213_26.7261919',
]);

async function main() {
  const html = fs.readFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', 'utf8');
  const acStart = html.indexOf('const AC=[');
  const acEnd = html.indexOf('];', acStart) + 2;
  eval('var AC=' + html.slice(acStart + 'const AC='.length, acEnd));

  let updated = 0, failed = 0;
  const cache = {};

  for (let i = 0; i < AC.length; i++) {
    const a = AC[i];
    const k = a.la + '_' + a.ln;
    if (!repeatedCoords.has(k)) continue;

    const { street, nr } = parseAddr(a.ad);
    if (!street) { failed++; continue; }

    const cacheKey = street + '_' + nr;
    let result = cache[cacheKey];

    if (!result) {
      await sleep(1100); // Nominatim rate limit
      result = await nominatim(street, nr);
      if (!result && nr) {
        await sleep(1100);
        result = await nominatim(street, ''); // try without number
      }
      cache[cacheKey] = result;
    }

    if (result && result.la > 47.22 && result.la < 47.30 &&
        result.ln > 26.65 && result.ln < 26.80) {
      AC[i].la = parseFloat(result.la.toFixed(7));
      AC[i].ln = parseFloat(result.ln.toFixed(7));
      updated++;
      console.log(`[${i}] OK ${a.nr}/${a.a} ${a.ad} → ${result.la.toFixed(5)}, ${result.ln.toFixed(5)}`);
    } else {
      failed++;
      console.log(`[${i}] FAIL ${a.nr}/${a.a} ${a.ad}`);
    }
  }

  console.log(`\nDone: ${updated} updated, ${failed} failed`);

  // Write back
  const newAcStr = 'const AC=' + JSON.stringify(AC);
  const newHtml = html.slice(0, acStart) + newAcStr + html.slice(acEnd);
  fs.writeFileSync('c:/Users/Silviu/Desktop/Android App/www/index.html', newHtml, 'utf8');
  console.log('Saved.');
}

main().catch(console.error);
