const fs = require('fs');

function humanize(ds) {
  const d = (ds || '').toUpperCase();

  // Gaze naturale
  if (/INLOCUIRE CONDUCTA SI BRANSAMENTE PRM/.test(d)) return 'Înlocuire conducte și branșamente gaze naturale între stații de reglare';
  if (/SISTEM DE PROTECTIE CATODICA.*GAZ/.test(d)) return 'Instalare sistem de protecție catodică pentru rețeaua de gaze naturale';
  if (/INLOCUIRE CONDUCTE DISTRIBUTIE GAZE NATURALE PRESIUNE MEDIE/.test(d)) return 'Înlocuire conducte gaze naturale la presiune medie';
  if (/INLOCUIRE.*CONDUCTA.*GAZ/.test(d)) return 'Înlocuire conducte gaze naturale';
  if (/EXTINDERE CONDUCTA.*GAZ|EXTINDERE.*BRANSAMENT.*GAZ|EXTINDERE.*GAZ.*BRANSAMENT/.test(d)) return 'Extindere rețea gaze naturale și branșament la imobil';
  if (/EXTINDERE RETEA DE GAZE NATURALE/.test(d)) return 'Extindere rețea de distribuție gaze naturale';
  if (/MODERNIZARE SRM/.test(d)) return 'Modernizare stație de reglare-măsurare gaze naturale';
  if (/SUBTRAVERSARE LINIE CF/.test(d)) return 'Traversare subterană a căii ferate pentru rețele utilitare';

  // Energie electrică
  if (/SPATII DE REINCARCARE PENTRU VEHICULE ELECTRICE/.test(d)) return 'Instalare stație de încărcare vehicule electrice';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*HALA|ALIMENTARE.*ELECTRICA.*HALA/.test(d)) return 'Racordare electrică hală industrială';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*FARMACEUTICE/.test(d)) return 'Racordare electrică hală de producție farmaceutică';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*STATIA DE BETOANE/.test(d)) return 'Racordare electrică stație de betoane';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*LOCUINTE COLECTIVE/.test(d)) return 'Racordare electrică bloc de locuințe';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*CENTRU DE ZI/.test(d)) return 'Racordare electrică centru de zi';
  if (/ALIMENTARE CU ENERGIE ELECTRICA/.test(d)) return 'Racordare la rețeaua de energie electrică';
  if (/RACORDARE.*RETEAUA ELECTRICA.*BAZIN IRIGATII/.test(d)) return 'Racordare electrică bazin de irigații';
  if (/RACORDARE.*RETEAUA ELECTRICA.*CJ\.EE RUGINOASA/.test(d) || /RACORDARE.*RETEAUA ELECTRICA.*RUGINOASA/.test(d)) return 'Racordare la rețeaua electrică a centralei eoliene Ruginoasa';
  if (/RACORDARE.*RETEAUA ELECTRICA/.test(d)) return 'Racordare la rețeaua de energie electrică';
  if (/INLOCUIRE.*LES.*20KV/.test(d)) return 'Înlocuire cablu electric subteran 20kV';
  if (/LUCRARI ELECTRICE.*COEXISTENTA|LUCRARI DE COEXISTENTA RETELE/.test(d)) return 'Lucrări electrice de coexistență cu alte rețele';
  if (/EXTINDERE RETEA ENERGIE ELECTRICA|EXTINDERE.*RETEA.*ELECTRICA/.test(d)) return 'Extindere rețea de energie electrică';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*ILUMINAT PUBLIC|CRESTEREA EFICIENTEI ENERGETICE.*SISTEM DE ILUMINAT/.test(d)) return 'Modernizare sistem de iluminat public stradal';
  if (/LUCRARI DE MODERNIZARE SI EXTINDERE A SISTEMULUI DE ILUMINAT STRADAL/.test(d)) return 'Modernizare și extindere iluminat stradal';

  // Apă
  if (/EXTINDERE RETEA DISTRIBUTIE APA/.test(d)) return 'Extindere rețea de distribuție apă';
  if (/BRANSAMENT SI ALIMENTARE CU APA PRIN SUBTRAVERSARE/.test(d)) return 'Branșament apă prin traversare subterană';
  if (/CONSTRUIRE BAZIN IRIGATII.*RETEA ALIMENTARE/.test(d)) return 'Construire bazin de irigații și rețea de alimentare cu apă';
  if (/AMENAJARE PRIZA DE APA.*IRIGATII/.test(d)) return 'Amenajare priză de apă pentru sistem de irigații';

  // Telecomunicații / fibră optică
  if (/CONSTRUIRE RETEA FIXA TELECOMUNICATII FTTH.*ORANGE/.test(d)) return 'Instalare rețea fixă de telecomunicații fibră optică (Orange)';
  if (/INSTALARE RETEA AERIANA FIBRA OPTICA/.test(d)) return 'Instalare rețea aeriană de fibră optică';
  if (/FIBRA OPTIC/.test(d)) return 'Instalare rețea de telecomunicații fibră optică';
  if (/STATIE DE BAZA PENTRU SERVICII DE COMUNICATII/.test(d)) return 'Amplasare antenă și stație de bază telecomunicații mobile';
  if (/AMPLASARE PLATFORMA BETONATA ANTENA/.test(d)) return 'Amplasare platformă betonată pentru antenă telecomunicații';

  // Eficiență energetică clădiri
  if (/CRESTEREA EFICIENTEI ENERGETICE.*SCOALA.*IORDACHE CANTACUZINO/.test(d)) return 'Creșterea eficienței energetice a Școlii „Iordache Cantacuzino"';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*GRADINITA NR\.? ?2|CRESTEREA EFICIENTEI ENERGETICE.*GRADINITA.*CRESA/.test(d)) return 'Creșterea eficienței energetice a Grădiniței nr. 2 și Creșei nr. 1';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*GRADINITA/.test(d)) return 'Creșterea eficienței energetice a grădiniței';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*LICEU/.test(d)) return 'Creșterea eficienței energetice a liceului';
  if (/CRESTEREA EFICIENTEI ENERGETICE.*CLADIRI REZIDENTIALE/.test(d)) return 'Eficientizare energetică blocuri de locuințe (finanțare PNRR)';
  if (/CRESTEREA EFICIENTEI ENERGETICE/.test(d)) return 'Creșterea eficienței energetice a clădirii';
  if (/RENOVARE ENERGETICA.*COLEGIUL TEHNIC UNIREA/.test(d)) return 'Renovare energetică Colegiul Tehnic „Unirea"';
  if (/RENOVARE ENERGETICA.*LICEUL.*MIRON COSTIN/.test(d)) return 'Renovare energetică Liceul Teoretic „Miron Costin"';
  if (/RENOVARE ENERGETICA.*SCOALA.*GASTESTI/.test(d)) return 'Renovare energetică Școala Gâștești';
  if (/RENOVARE ENERGETICA/.test(d)) return 'Renovare energetică clădire';
  if (/REVITALIZAREA MUNICIPIULUI PASCANI.*EDUCATIONALA/.test(d)) return 'Revitalizare infrastructură educațională și de transport Pașcani';

  // Stradă / mobilitate
  if (/MODERNIZARE STR(ADA)?[\. ]+(VASILE ALECSANDRI)/.test(d)) return 'Modernizare Strada Vasile Alecsandri';
  if (/MODERNIZARE STR(ADA)?[\. ]+/.test(d)) {
    const m = d.match(/MODERNIZARE STR(?:ADA)?[\. ]+([A-ZĂÎÂȘȚ0-9 ]+?)(?:,|\s+MUN|\s+JUD|\s+PASCANI|$)/);
    if (m) return `Modernizare strada ${m[1].trim().charAt(0) + m[1].trim().slice(1).toLowerCase()}`;
    return 'Modernizare stradă';
  }
  if (/AMENAJARE.*SENS(URI)? GIRA/.test(d)) return 'Amenajare sensuri giratorii provizorii pentru reglementarea traficului';
  if (/AMENAJARE SENS GIRATORIU.*ACCESE RUTIERE/.test(d)) return 'Amenajare sens giratoriu, accese rutiere și trotuare pietonale';
  if (/STR\. OITUZ|TRONSON.*MARASESTI.*RIPA GALBENA/.test(d)) return 'Reabilitare Strada Oituz (tronson Mărășești – Ripa Galbenă)';
  if (/REGULARIZARE.*ALBIE.*MINORA/.test(d)) return 'Decolmatare, regularizare și reprofilare albie râu — exploatare agregate';

  // Patrimoniu / cultură
  if (/REABILITARE.*PALATUL CANTACUZINO/.test(d)) return 'Reabilitare, conservare și revitalizare Palatul Cantacuzino-Pașcanu';
  if (/CONSTR.*CATEDRALA ORTODOXA|CATEDRALA ORTODOXA/.test(d)) return 'Construire Catedrala Ortodoxă „Pogorârea Duhului Sfânt" Pașcani';

  // Sănătate
  if (/EXTINDERE.*DOTARE.*AMBULATORIU.*SPITAL/.test(d)) return 'Extindere și dotare ambulatoriu integrat Spitalul Municipal Pașcani';
  if (/CONSTR.*CENTRU DIALIZA/.test(d)) return 'Construire centru de dializă și locuință';
  if (/SCHIMBARE DESTINATIE.*SPATIU MEDICAL|SCHIMBARE DESTINATIE.*SPATIU.*UNITATI SANITARE/.test(d)) return 'Transformare spațiu comercial în cabinet medical';
  if (/MODIFICARE.*EXTINDERE.*MANSARDA.*SPATIU.*UNITATI SANITARE/.test(d)) return 'Extindere mansardă și transformare în unitate sanitară cu paturi';

  // Educație / social
  if (/CONSTRUIRE BAZIN DE INOT DIDACTIC/.test(d)) return 'Construire bazin de înot didactic';
  if (/REABILITARE.*CENTRU REZIDENTIAL.*SF\. STELIAN|SCHIMBARE DESTINATIE.*SF\. STELIAN/.test(d)) return 'Transformare Centru Rezidențial Sf. Stelian în centru de zi';
  if (/CONSTRUIRE.*DOTARE.*CASA TIP FAMILIAL CTF1/.test(d)) return 'Construire casă de tip familial CTF1 (dezinstituționalizare Sf. Nicolae)';
  if (/CONSTRUIRE.*DOTARE.*CASA TIP FAMILIAL CTF2/.test(d)) return 'Construire casă de tip familial CTF2 (dezinstituționalizare Sf. Nicolae)';
  if (/REABILITARE.*GRADINITA.*SPERANTA|GRADINITA.*CENTRU DE ZI.*SPERANTA/.test(d)) return 'Reabilitare Grădinița „Speranța" și transformare în centru de zi pentru copii cu dizabilități';
  if (/CONSTR.*CASA.*TIP FAMILIAL/.test(d)) return 'Construire casă de tip familial pentru persoane vulnerabile';
  if (/AMENAJARE CIMITIR/.test(d)) return 'Amenajare cimitir municipal';
  if (/TOALETE PUBLICE ECOLOGICE/.test(d)) return 'Amplasare toalete publice ecologice';
  if (/AMENAJARE PARC DE JOACA/.test(d)) return 'Amenajare parc de joacă pentru copii';
  if (/AMENAJARE TERENURI SPORTIVE/.test(d)) return 'Amenajare terenuri sportive';
  if (/AMENAJARE TEREN SPORT|REABILITARE TEREN BASCHET/.test(d)) return 'Amenajare/reabilitare teren de sport';
  if (/LUCRARI.*INTERVENTIE.*ISU/.test(d)) return 'Lucrări de conformare la normele ISU (securitate la incendiu)';
  if (/ALIMENTARE CU ENERGIE ELECTRICA.*CENTRU DE ZI|ALIMENTARE.*ELECTRICA.*CENTRU DE ZI/.test(d)) return 'Racordare electrică centru de zi';

  // Industrial
  if (/EXTINDERE(A)? CAPACITATII.*ROMPAK/.test(d)) return 'Extindere capacitate de producție ROMPAK — hale de producție alimentară';
  if (/EXTINDEREA ZONEI DE LIVRARE.*FABRICA DE DROJDIE/.test(d)) return 'Extindere zonă de livrare la fabrica de drojdie';
  if (/CONSTRUIRE HALA.*FARMACEUTICE/.test(d)) return 'Construire hală de producție farmaceutică';
  if (/ALIMENTARE.*ELECTRICA.*FARMACEUTICE/.test(d)) return 'Racordare electrică hală producție farmaceutică';
  if (/CONSTRUIRE HALA/.test(d)) return 'Construire hală industrială';
  if (/CONSTRUIRE SPALATORIE AUTO.*VULCANIZARE/.test(d)) return 'Construire spălătorie auto, vulcanizare și stație ITP';
  if (/CONSTRUIRE MAGAZIN MATERIALE DE CONSTRUCTII/.test(d)) return 'Construire magazin materiale de construcții cu parcaj';
  if (/CONSTRUIRE BAZIN IRIGATII/.test(d)) return 'Construire bazin de irigații';
  if (/REAMENAJARE ANEXA EXPLOATATIE AGRICOLA/.test(d)) return 'Reamenajare anexă exploatație agricolă';

  // Publicitate / semnalistică
  if (/AMPLASARE SEMNALISTICA EXTERIOARA/.test(d)) return 'Amplasare semnalistică exterioară (indicatoare, firme)';
  if (/AMPLASARE RECLAMA PE FATADA/.test(d)) return 'Amplasare reclamă pe fațada clădirii';
  if (/MODIFICARE FIRME LUMINOASE/.test(d)) return 'Modificare firme luminoase și reclame exterioare';
  if (/SCHIMBARE.*MIJLOACE DE PUBLICITATE/.test(d)) return 'Schimbare elemente de publicitate și semnalistică';
  if (/CONSTRUIRE PILON PUBLICITAR|AMPLASARE SIGLA.*LUMINOASA/.test(d)) return 'Amplasare panou/siglă publicitară';
  if (/AMPLASARE.*APARAT.*RECICLAT.*KAUFLAND|RELOCARE.*APARATE DE RECICLARE.*KAUFLAND/.test(d)) return 'Amplasare/relocare aparate automate de reciclare Kaufland';

  // Comercial / spații
  if (/EXTINDERE SI MODERNIZARE CENTRU COMERCIAL/.test(d)) return 'Extindere și modernizare centru comercial';
  if (/RECOMPARTIMENTARE SPATIU COMERCIAL.*CREARE ACCESE/.test(d)) return 'Recompartimentare spațiu comercial și creare accese';
  if (/AMENAJARE.*SCHIMB DESTINATIE.*SPATIU COM/.test(d)) return 'Amenajare și schimbare destinație spațiu comercial';
  if (/RENOVARE.*REAMENAJARE.*SPATIU COMERCIAL/.test(d)) return 'Renovare și reamenajare spațiu comercial';
  if (/MODIFICARE SPATII COMERCIALE/.test(d)) return 'Modificare configurație spații comerciale';
  if (/CONSTRUIRE SPATIU COMERCIAL/.test(d)) return 'Construire spațiu comercial nou';
  if (/SCHIMBARE DESTINATIE.*LOCUINTA.*SPATIU COMERCIAL/.test(d)) return 'Schimbare destinație din locuință în spațiu comercial';
  if (/SCHIMBARE DESTINATIE.*ANEXE.*ATELIERE|SCHIMBARE DESTINATIE.*SERVICE AUTO/.test(d)) return 'Schimbare destinație anexe în atelier mecanic (service auto)';
  if (/SCHIMBARE DESTINATIE.*LOCUINTA.*SPATIU MEDICAL/.test(d)) return 'Schimbare destinație din locuință în cabinet medical';
  if (/SCHIMBARE DESTINATIE/.test(d)) return 'Schimbare destinație a unui spațiu';
  if (/DESFIINTARE.*DROGHERIE/.test(d)) return 'Desființare drogherie';
  if (/INLOCUIRE.*CONTAINER.*BUFET/.test(d)) return 'Înlocuire container bufet';
  if (/CONTINUARE LUCRARI.*BIROURI.*LIFT/.test(d)) return 'Finalizare lucrări clădire birouri cu instalare lift';
  if (/AMENAJARE PARCARE.*LABORATOR/.test(d)) return 'Amenajare parcare pentru laboratorul de analize medicale';
  if (/EXTINDERE PARCARE/.test(d)) return 'Extindere parcare, alei auto și pietonale';
  if (/LUCRARI DE COEXISTENTA RETELE.*GALERIE COMERCIALA/.test(d)) return 'Lucrări de coexistență rețele subterane cu galeria comercială și parcarea';

  // Rezidențial
  if (/CONSTRUIRE LOCUINTE COLECTIVE.*SPATII COMERCIALE.*SPATII TEHNICE/.test(d) || /CONSTRUIRE LOCUINTE COLECTIVE.*SPATII COMERCIALE/.test(d)) return 'Construire bloc de locuințe cu spații comerciale la parter';
  if (/CONSTR.*LOCUINTE COLECTIVE.*BIROURI.*SPATII COMERCIALE/.test(d)) return 'Construire ansamblu rezidențial cu birouri și spații comerciale';
  if (/CONSTRUIRE LOCUINTE COLECTIVE, BIROURI/.test(d)) return 'Construire ansamblu rezidențial cu birouri și spații comerciale';
  if (/CONSTRUIRE LOCUINTE COLECTIVE MEDII/.test(d)) return 'Construire bloc de locuințe colective';
  if (/CONSTRUIRE LOCUINTE COLECTIVE/.test(d)) return 'Construire bloc de locuințe colective';
  if (/DEMOLARE TOTALA.*AMPLASARE STATIE/.test(d)) return 'Demolare construcții existente și amenajare stație';
  if (/DEMOLARE TOTALA/.test(d)) return 'Demolare totală construcție existentă';
  if (/DEMOLARE.*CONSTRUIRE LOCUINTA|DEMOLARE C[0-9].*CONSTRUCTIE LOCUINTA/.test(d)) return 'Demolare construcție veche și edificare locuință nouă';
  if (/DESFIINTARE CONSTR.*CONSTRUIRE LOCUINTE MEDII/.test(d)) return 'Demolare construcții existente și construire bloc de locuințe';
  if (/SUPRAETAJAREA CLADIRII.*UN NIVEL/.test(d)) return 'Supraetajare clădire existentă cu un nivel suplimentar';
  if (/SUPRAETAJAREA CLADIRII/.test(d)) return 'Supraetajare clădire existentă';
  if (/CONSTR.*CASA.*TIP FAMILIAL/.test(d)) return 'Construire casă de tip familial';
  if (/CONSTR\.? (CASA|LOCUINTA) DE TIP FAMILIAL/.test(d)) return 'Construire locuință tip familial';
  if (/CONSTR.*LOC.*INDIVIDU/.test(d)) return 'Construire locuință individuală';
  if (/CONSTRUIRE ACOPERIS TIP SARPANTA/.test(d)) return 'Construire acoperiș tip șarpantă deasupra unui apartament';
  if (/INCHIDERE BALCON/.test(d)) return 'Închidere balcon cu geam termopan';
  if (/RECOMPARTIMENTARE AP(ARTAMENT)?\.? NR/.test(d)) return 'Recompartimentare interioară apartament';
  if (/RECOMPARTIMENTARI SI SCHIMBARE DE DESTINATIE.*MODIFICARE SARPANTA/.test(d)) return 'Recompartimentare, schimbare destinație și modificare șarpantă clădiri';
  if (/RECOMPARTIMENTARI INTERIOARE FARA AFECTAREA STRUCTURII/.test(d)) return 'Recompartimentare interioară fără afectarea structurii de rezistență';
  if (/RECOMPARTIMENTARE/.test(d)) return 'Recompartimentare spații interioare';
  if (/CONSTRUCTIE ANEXA GOSPODAREASCA.*GARAJ/.test(d)) return 'Construire garaj și spațiu de depozitare';
  if (/MODIFICARE ACOPERIS.*MODERNIZARE MAGAZIE/.test(d)) return 'Modificare acoperiș și modernizare magazie';
  if (/CONSTRUIRE MAGAZIE DEPOZITARE/.test(d)) return 'Construire magazie pentru depozitare piese';
  if (/DESFIINTARE MAGAZIE.*CONSTRUIRE MAGAZIE/.test(d)) return 'Demolare și reconstruire magazie';

  // Reabilitare generală
  if (/REABILITARE.*MODERNIZARE.*AMPLASARE CABINA PAZA/.test(d)) return 'Reabilitare, modernizare și cabină de pază';
  if (/REABILITARE.*MODERNIZARE.*EXTINDERE.*DOTARE/.test(d)) return 'Reabilitare, modernizare, extindere și dotare';
  if (/REABILITARE TEREN BASCHET/.test(d)) return 'Reabilitare teren de baschet';
  if (/REAMENAJARE/.test(d)) return 'Reamenajare';
  if (/MODIFICARE LUCRARI IN CURS/.test(d)) return 'Modificare lucrări autorizate anterior în curs de execuție';

  // Extindere pe verticală / orizontală
  if (/EXTINDERE PE VERTICALA/.test(d)) return 'Extindere pe verticală a construcției existente';
  if (/MODIFICARE.*EXTINDERE.*MANSARDA/.test(d)) return 'Extindere și modificare mansardă';

  // Fallback curat
  const clean = ds.trim()
    .replace(/\s+/g, ' ')
    .replace(/\b(PRM|PRS|BRS|B SI R|I, B\+R|I,B\+R|B\+R|TRONS|TRONSON|MUN\.|JUD\.)\b/gi, '')
    .replace(/\s+/g, ' ').trim();
  return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
}

const html = fs.readFileSync('www/index.html', 'utf8');

// Find the AC array and replace ds values
let count = 0;
const updated = html.replace(/"ds":"([^"]*)"/g, (match, ds) => {
  const newDs = humanize(ds);
  if (newDs !== ds) count++;
  return `"ds":"${newDs}"`;
});

fs.writeFileSync('www/index.html', updated, 'utf8');
console.log(`Done — updated ${count} descriptions out of 290`);
