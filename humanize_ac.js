const fs = require('fs');

// IMPORTANT: Return values must NEVER contain regular ASCII double-quotes (")
// because ds values are stored inside "ds":"..." in the JS source.
// Use typographic quotes like «» or simply omit them.
function humanize(ds) {
  const d = (ds || '').toUpperCase();

  // Gaze naturale
  if (/INLOCUIRE CONDUCTA SI BRANSAMENTE PRM/.test(d)) return 'Inlocuire conducte si bransamente gaze naturale intre statii de reglare';
  if (/SISTEM DE PROTECTIE CATODICA.*GAZ/.test(d)) return 'Instalare sistem de protectie catodica pentru reteaua de gaze naturale';
  if (/INLOCUIRE CONDUCTE DISTRIBUTIE GAZE NATURALE PRESIUNE MEDIE/.test(d)) return 'Inlocuire conducte gaze naturale la presiune medie';
  if (/INLOCUIRE.*CONDUCTA.*GAZ/.test(d)) return 'Inlocuire conducte gaze naturale';
  if (/EXTINDERE CONDUCTA.*GAZ|EXTINDERE.*BRANSAMENT.*GAZ|EXTINDERE.*GAZ.*BRANSAMENT/.test(d)) return 'Extindere retea gaze naturale si bransament la imobil';
  if (/EXTINDERE RETEA DE GAZE NATURALE/.test(d)) return 'Extindere retea de distributie gaze naturale';
  if (/MODERNIZARE SRM/.test(d)) return 'Modernizare statie de reglare-masurare gaze naturale';
  if (/SUBTRAVERSARE LINIE CF/.test(d)) return 'Traversare subterana a caii ferate pentru retele utilitare';

  // Energie electrica
  if (/SPATII DE REINCARCARE PENTRU VEHICULE ELECTRICE/.test(d)) return 'Instalare statie de incarcare vehicule electrice';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*HALA|ALIMENTARE.*ELECTRICA.*HALA/.test(d)) return 'Racordare electrica hala industriala';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*FARMACEUTICE/.test(d)) return 'Racordare electrica hala de productie farmaceutica';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*STATIA DE BETOANE/.test(d)) return 'Racordare electrica statie de betoane';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*LOCUINTE COLECTIVE/.test(d)) return 'Racordare electrica bloc de locuinte';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*CENTRU DE ZI/.test(d)) return 'Racordare electrica centru de zi';
  if (/ALIMENTARE CU ENERGIE ELECTRICA/.test(d)) return 'Racordare la reteaua de energie electrica';
  if (/RACORDARE.*RETEAUA ELECTRICA.*BAZIN IRIGATII/.test(d)) return 'Racordare electrica bazin de irigatii';
  if (/RACORDARE.*RETEAUA ELECTRICA.*RUGINOASA/.test(d)) return 'Racordare la reteaua electrica a obiectivului Ruginoasa';
  if (/RACORDARE.*RETEAUA ELECTRICA/.test(d)) return 'Racordare la reteaua de energie electrica';
  if (/INLOCUIRE.*LES.*20KV/.test(d)) return 'Inlocuire cablu electric subteran 20kV';
  if (/LUCRARI ELECTRICE.*COEXISTENTA|LUCRARI DE COEXISTENTA RETELE/.test(d)) return 'Lucrari electrice de coexistenta cu alte retele';
  if (/EXTINDERE RETEA ENERGIE ELECTRICA|EXTINDERE.*RETEA.*ELECTRICA/.test(d)) return 'Extindere retea de energie electrica';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*ILUMINAT PUBLIC|CRESTEREA EFICIENTEI ENERGETICE.*SISTEM DE ILUMINAT/.test(d)) return 'Modernizare sistem de iluminat public stradal';
  if (/LUCRARI DE MODERNIZARE SI EXTINDERE A SISTEMULUI DE ILUMINAT STRADAL/.test(d)) return 'Modernizare si extindere iluminat stradal';

  // Apa
  if (/EXTINDERE RETEA DISTRIBUTIE APA/.test(d)) return 'Extindere retea de distributie apa';
  if (/BRANSAMENT SI ALIMENTARE CU APA PRIN SUBTRAVERSARE/.test(d)) return 'Bransament apa prin traversare subterana';
  if (/CONSTRUIRE BAZIN IRIGATII.*RETEA ALIMENTARE/.test(d)) return 'Construire bazin de irigatii si retea de alimentare cu apa';
  if (/AMENAJARE PRIZA DE APA.*IRIGATII/.test(d)) return 'Amenajare priza de apa pentru sistem de irigatii';

  // Telecomunicatii / fibra optica
  if (/CONSTRUIRE RETEA FIXA TELECOMUNICATII FTTH.*ORANGE/.test(d)) return 'Instalare retea fixa de telecomunicatii fibra optica (Orange)';
  if (/INSTALARE RETEA AERIANA FIBRA OPTICA/.test(d)) return 'Instalare retea aeriana de fibra optica';
  if (/FIBRA OPTIC/.test(d)) return 'Instalare retea de telecomunicatii fibra optica';
  if (/STATIE DE BAZA PENTRU SERVICII DE COMUNICATII/.test(d)) return 'Amplasare antena si statie de baza telecomunicatii mobile';
  if (/AMPLASARE PLATFORMA BETONATA ANTENA/.test(d)) return 'Amplasare platforma betonata pentru antena telecomunicatii';

  // Eficienta energetica cladiri
  if (/CRESTEREA EFICIENTEI ENERGETICE.*SCOALA.*IORDACHE CANTACUZINO/.test(d)) return 'Cresterea eficientei energetice a Scolii Iordache Cantacuzino';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*GRADINITA NR\.? ?2|CRESTEREA EFICIENTEI ENERGETICE.*GRADINITA.*CRESA/.test(d)) return 'Cresterea eficientei energetice a Gradinitei nr. 2 si Cresei nr. 1';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*GRADINITA/.test(d)) return 'Cresterea eficientei energetice a gradinitei';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*LICEU/.test(d)) return 'Cresterea eficientei energetice a liceului';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*CLADIRI REZIDENTIALE/.test(d)) return 'Eficientizare energetica blocuri de locuinte (finantare PNRR)';
  if (/CRESTEREA EFICIENTEI ENERGETICE/.test(d)) return 'Cresterea eficientei energetice a cladirii';
  if (/RENOVARE ENERGETICA.*COLEGIUL TEHNIC UNIREA/.test(d)) return 'Renovare energetica Colegiul Tehnic Unirea';
  if (/RENOVARE ENERGETICA.*LICEUL.*MIRON COSTIN/.test(d)) return 'Renovare energetica Liceul Teoretic Miron Costin';
  if (/RENOVARE ENERGETICA.*SCOALA.*GASTESTI/.test(d)) return 'Renovare energetica Scoala Gastesti';
  if (/RENOVARE ENERGETICA/.test(d)) return 'Renovare energetica cladire';
  if (/REVITALIZAREA MUNICIPIULUI PASCANI.*EDUCATIONALA/.test(d)) return 'Revitalizare infrastructura educationala si de transport Pascani';

  // Strada / mobilitate
  if (/MODERNIZARE STR(ADA)?[\. ]+(VASILE ALECSANDRI)/.test(d)) return 'Modernizare Strada Vasile Alecsandri';
  if (/MODERNIZARE STR(ADA)?[\. ]+/.test(d)) {
    const m = d.match(/MODERNIZARE STR(?:ADA)?[\. ]+([A-Z0-9 ]+?)(?:,|\s+MUN|\s+JUD|\s+PASCANI|$)/);
    if (m) {
      const name = m[1].trim().charAt(0) + m[1].trim().slice(1).toLowerCase();
      return 'Modernizare strada ' + name;
    }
    return 'Modernizare strada';
  }
  if (/AMENAJARE.*SENS(URI)? GIRA/.test(d)) return 'Amenajare sensuri giratorii provizorii pentru reglementarea traficului';
  if (/AMENAJARE SENS GIRATORIU.*ACCESE RUTIERE/.test(d)) return 'Amenajare sens giratoriu, accese rutiere si trotuare pietonale';
  if (/STR\. OITUZ|TRONSON.*MARASESTI.*RIPA GALBENA/.test(d)) return 'Reabilitare Strada Oituz (tronson Marasesti - Ripa Galbena)';
  if (/REGULARIZARE.*ALBIE.*MINORA/.test(d)) return 'Decolmatare, regularizare si reprofilare albie rau';

  // Patrimoniu / cultura
  if (/REABILITARE.*PALATUL CANTACUZINO|REABILITARE.*CONSERVARE.*PALAT/.test(d)) return 'Reabilitare, conservare si revitalizare Palatul Cantacuzino-Pascanu';
  if (/CONSTR.*CATEDRALA ORTODOXA|CATEDRALA ORTODOXA/.test(d)) return 'Construire Catedrala Ortodoxa Pogorarea Duhului Sfant Pascani';

  // Sanatate
  if (/EXTINDERE.*DOTARE.*AMBULATORIU.*SPITAL/.test(d)) return 'Extindere si dotare ambulatoriu integrat Spitalul Municipal Pascani';
  if (/CONSTR.*CENTRU DIALIZA/.test(d)) return 'Construire centru de dializa si locuinta';
  if (/SCHIMBARE DESTINATIE.*SPATIU MEDICAL|SCHIMBARE DESTINATIE.*SPATIU.*UNITATI SANITARE/.test(d)) return 'Transformare spatiu comercial in cabinet medical';
  if (/MODIFICARE.*EXTINDERE.*MANSARDA.*SPATIU.*UNITATI SANITARE/.test(d)) return 'Extindere mansarda si transformare in unitate sanitara cu paturi';

  // Educatie / social
  if (/CONSTRUIRE BAZIN DE INOT DIDACTIC/.test(d)) return 'Construire bazin de inot didactic';
  if (/REABILITARE.*CENTRU REZIDENTIAL.*SF\. STELIAN|SCHIMBARE DESTINATIE.*SF\. STELIAN/.test(d)) return 'Transformare Centru Rezidential Sf. Stelian in centru de zi';
  if (/CONSTRUIRE.*DOTARE.*CASA TIP FAMILIAL CTF1/.test(d)) return 'Construire casa de tip familial CTF1 (dezinstitutionalizare Sf. Nicolae)';
  if (/CONSTRUIRE.*DOTARE.*CASA TIP FAMILIAL CTF2/.test(d)) return 'Construire casa de tip familial CTF2 (dezinstitutionalizare Sf. Nicolae)';
  if (/REABILITARE.*GRADINITA.*SPERANTA|GRADINITA.*CENTRU DE ZI.*SPERANTA/.test(d)) return 'Reabilitare Gradinita Speranta si transformare in centru de zi pentru copii cu dizabilitati';
  if (/CONSTR.*CASA.*TIP FAMILIAL/.test(d)) return 'Construire casa de tip familial pentru persoane vulnerabile';
  if (/AMENAJARE CIMITIR/.test(d)) return 'Amenajare cimitir municipal';
  if (/TOALETE PUBLICE ECOLOGICE/.test(d)) return 'Amplasare toalete publice ecologice';
  if (/AMENAJARE PARC DE JOACA/.test(d)) return 'Amenajare parc de joaca pentru copii';
  if (/AMENAJARE TERENURI SPORTIVE/.test(d)) return 'Amenajare terenuri sportive';
  if (/AMENAJARE TEREN SPORT|REABILITARE TEREN BASCHET/.test(d)) return 'Amenajare si reabilitare teren de sport';
  if (/LUCRARI.*INTERVENTIE.*ISU/.test(d)) return 'Lucrari de conformare la normele ISU (securitate la incendiu)';

  // Industrial
  if (/EXTINDERE(A)? CAPACITATII.*ROMPAK/.test(d)) return 'Extindere capacitate de productie ROMPAK - hale de productie alimentara';
  if (/EXTINDEREA ZONEI DE LIVRARE.*FABRICA DE DROJDIE/.test(d)) return 'Extindere zona de livrare la fabrica de drojdie';
  if (/CONSTRUIRE HALA.*FARMACEUTICE/.test(d)) return 'Construire hala de productie farmaceutica';
  if (/ALIMENTARE.*ELECTRICA.*FARMACEUTICE/.test(d)) return 'Racordare electrica hala productie farmaceutica';
  if (/CONSTRUIRE HALA/.test(d)) return 'Construire hala industriala';
  if (/CONSTRUI(E|RE) SPALATORIE AUTO.*VULCANIZARE|SPALATORIE AUTO.*VULCANIZARE/.test(d)) return 'Construire spalatorie auto, vulcanizare si statie ITP';
  if (/CONSTRUIRE MAGAZIN MATERIALE DE CONSTRUCTII/.test(d)) return 'Construire magazin materiale de constructii cu parcaj';
  if (/CONSTRUIRE BAZIN IRIGATII/.test(d)) return 'Construire bazin de irigatii';
  if (/REAMENAJARE ANEXA EXPLOATATIE AGRICOLA/.test(d)) return 'Reamenajare anexa exploatatie agricola';

  // Publicitate / semnalistica
  if (/AMPLASARE SEMNALISTICA EXTERIOARA/.test(d)) return 'Amplasare semnalistica exterioara (indicatoare, firme)';
  if (/AMPLASARE RECLAMA PE FATADA/.test(d)) return 'Amplasare reclama pe fatada cladirii';
  if (/MODIFICARE FIRME LUMINOASE/.test(d)) return 'Modificare firme luminoase si reclame exterioare';
  if (/SCHIMBARE.*MIJLOACE DE PUBLICITATE/.test(d)) return 'Schimbare elemente de publicitate si semnalistica';
  if (/CONSTRUIRE PILON PUBLICITAR|AMPLASARE SIGLA.*LUMINOASA/.test(d)) return 'Amplasare panou sau sigla publicitara';
  if (/AMPLASARE.*APARAT.*RECICLAT.*KAUFLAND|RELOCARE.*APARATE DE RECICLARE.*KAUFLAND/.test(d)) return 'Amplasare sau relocare aparate automate de reciclare Kaufland';

  // Comercial / spatii
  if (/EXTINDERE SI MODERNIZARE CENTRU COMERCIAL/.test(d)) return 'Extindere si modernizare centru comercial';
  if (/RECOMPARTIMENTARE SPATIU COMERCIAL.*CREARE ACCESE/.test(d)) return 'Recompartimentare spatiu comercial si creare accese';
  if (/AMENAJARE.*SCHIMB DESTINATIE.*SPATIU COM/.test(d)) return 'Amenajare si schimbare destinatie spatiu comercial';
  if (/RENOVARE.*REAMENAJARE.*SPATIU COMERCIAL/.test(d)) return 'Renovare si reamenajare spatiu comercial';
  if (/MODIFICARE SPATII COMERCIALE/.test(d)) return 'Modificare configuratie spatii comerciale';
  if (/CONSTRUIRE SPATIU COMERCIAL/.test(d)) return 'Construire spatiu comercial nou';
  if (/SCHIMBARE DESTINATIE.*LOCUINTA.*SPATIU COMERCIAL/.test(d)) return 'Schimbare destinatie din locuinta in spatiu comercial';
  if (/SCHIMBARE DESTINATIE.*ANEXE.*ATELIERE|SCHIMBARE DESTINATIE.*SERVICE AUTO/.test(d)) return 'Schimbare destinatie anexe in atelier mecanic (service auto)';
  if (/SCHIMBARE DESTINATIE.*LOCUINTA.*SPATIU MEDICAL/.test(d)) return 'Schimbare destinatie din locuinta in cabinet medical';
  if (/SCHIMBARE DESTINATIE/.test(d)) return 'Schimbare destinatie a unui spatiu';
  if (/DESFIINTARE.*DROGHERIE/.test(d)) return 'Desfiintare drogherie';
  if (/INLOCUIRE.*CONTAI?NAR.*BUFET/.test(d)) return 'Inlocuire container bufet';
  if (/CONTINUARE LUCRARI.*BIROURI.*LIFT/.test(d)) return 'Finalizare lucrari cladire birouri cu instalare lift';
  if (/AMENAJARE PARCARE.*LABORATOR/.test(d)) return 'Amenajare parcare pentru laboratorul de analize medicale';
  if (/EXTINDERE PARCARE/.test(d)) return 'Extindere parcare, alei auto si pietonale';
  if (/LUCRARI DE COEXISTENTA RETELE.*GALERIE COMERCIALA/.test(d)) return 'Lucrari de coexistenta retele subterane cu galeria comerciala si parcarea';

  // Rezidential
  if (/CONSTRUIRE LOCUINTE COLECTIVE.*SPATII COMERCIALE.*SPATII TEHNICE/.test(d)) return 'Construire bloc de locuinte cu spatii comerciale la parter';
  if (/CONSTR.*LOCUINTE COLECTIVE.*BIROURI.*SPATII COMERCIALE/.test(d)) return 'Construire ansamblu rezidential cu birouri si spatii comerciale';
  if (/CONSTRUIRE LOCUINTE COLECTIVE, BIROURI/.test(d)) return 'Construire ansamblu rezidential cu birouri si spatii comerciale';
  if (/CONSTRUIRE LOCUINTE COLECTIVE MEDII/.test(d)) return 'Construire bloc de locuinte colective';
  if (/CONSTRUIRE LOCUINTE COLECTIVE/.test(d)) return 'Construire bloc de locuinte colective';
  if (/DEMOLARE TOTALA.*AMPLASARE STATIE/.test(d)) return 'Demolare constructii existente si amenajare statie';
  if (/DEMOLARE TOTALA/.test(d)) return 'Demolare totala constructie existenta';
  if (/DEMOLARE.*CONSTRUIRE LOCUINTA|DEMOLARE C[0-9].*CONSTRUCTIE LOCUINTA/.test(d)) return 'Demolare constructie veche si edificare locuinta noua';
  if (/DESFIINTARE CONSTR.*CONSTRUIRE LOCUINTE MEDII/.test(d)) return 'Demolare constructii existente si construire bloc de locuinte';
  if (/SUPRAETAJAREA CLADIRII.*UN NIVEL/.test(d)) return 'Supraetajare cladire existenta cu un nivel suplimentar';
  if (/SUPRAETAJAREA CLADIRII/.test(d)) return 'Supraetajare cladire existenta';
  if (/CONSTR.*CASA.*TIP FAMILIAL/.test(d)) return 'Construire casa de tip familial';
  if (/CONSTR.*LOC.*INDIVIDU/.test(d)) return 'Construire locuinta individuala';
  if (/CONSTRUIRE ACOPERIS TIP SARPANTA/.test(d)) return 'Construire acoperis tip sarpanta deasupra unui apartament';
  if (/INCHIDERE BALCON/.test(d)) return 'Inchidere balcon cu geam termopan';
  if (/RECOMPARTIMENTARE AP(ARTAMENT)?\.? NR/.test(d)) return 'Recompartimentare interioara apartament';
  if (/RECOMPARTIMENTARI SI SCHIMBARE DE DESTINATIE.*MODIFICARE SARPANTA/.test(d)) return 'Recompartimentare, schimbare destinatie si modificare sarpanta cladiri';
  if (/RECOMPARTIMENTARI INTERIOARE FARA AFECTAREA STRUCTURII/.test(d)) return 'Recompartimentare interioara fara afectarea structurii de rezistenta';
  if (/RECOMPARTIMENTARE/.test(d)) return 'Recompartimentare spatii interioare';
  if (/CONSTRUCTIE ANEXA GOSPODAREASCA.*GARAJ/.test(d)) return 'Construire garaj si spatiu de depozitare';
  if (/MODIFICARE ACOPERIS.*MODERNIZARE MAGAZIE/.test(d)) return 'Modificare acoperis si modernizare magazie';
  if (/CONSTRUIRE MAGAZIE DEPOZITARE/.test(d)) return 'Construire magazie pentru depozitare piese';
  if (/DESFIINTARE MAGAZIE.*CONSTRUIRE MAGAZIE/.test(d)) return 'Demolare si reconstruire magazie';
  if (/EXTINDERE PE VERTICALA/.test(d)) return 'Extindere pe verticala a constructiei existente';
  if (/MODIFICARE.*EXTINDERE.*MANSARDA/.test(d)) return 'Extindere si modificare mansarda';
  if (/CONSTRUCTIE ANEXA/.test(d)) return 'Construire anexa gospodareasca';

  // Reabilitare generala
  if (/REABILITARE.*MODERNIZARE.*AMPLASARE CABINA PAZA/.test(d)) return 'Reabilitare, modernizare si amplasare cabina de paza';
  if (/REABILITARE.*MODERNIZARE.*EXTINDERE.*DOTARE/.test(d)) return 'Reabilitare, modernizare, extindere si dotare';
  if (/REABILITARE TEREN BASCHET/.test(d)) return 'Reabilitare teren de baschet';
  if (/REAMENAJARE/.test(d)) return 'Reamenajare spatiu sau incinta';
  if (/MODIFICARE LUCRARI IN CURS/.test(d)) return 'Modificare lucrari autorizate anterior in curs de executie';

  // Fallback curat - pastreaza textul original dar curata
  const clean = ds.trim().replace(/\s+/g, ' ');
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase()
    .replace(/["]/g, '');  // remove any double quotes as safety net
}

const html = fs.readFileSync('www/index.html', 'utf8');
let count = 0;

// ds is always followed by ,"ad": - use that as safe boundary
const updated = html.replace(/"ds":"(.*?)","ad":/g, (match, ds) => {
  const newDs = humanize(ds);
  // Safety: remove any ASCII double quotes that would break the JS string
  const safeDs = newDs.replace(/"/g, '');
  if (safeDs !== ds) count++;
  return `"ds":"${safeDs}","ad":`;
});

fs.writeFileSync('www/index.html', updated, 'utf8');
console.log(`Done - updated ${count}/290 descriptions`);

// Verify
const html2 = fs.readFileSync('www/index.html', 'utf8');
const acStart = html2.indexOf('const AC=[');
const acEnd = html2.indexOf('];', acStart) + 2;
try {
  eval('var AC=' + html2.slice(acStart + 'const AC='.length, acEnd));
  console.log('AC parses OK, entries:', AC.length);
} catch(e) {
  console.log('AC PARSE ERROR:', e.message);
}
