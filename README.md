# CivicData Live – Monitorul Investițiilor Pășcani

> **O hartă interactivă a investițiilor publice și private din Municipiul Pășcani, accesibilă oricui – de pe telefon, tabletă sau calculator.**

---

## Ce este acest proiect?

**CivicData Live** este o aplicație web și Android care pune la dispoziția cetățenilor din Pășcani o hartă interactivă cu toate investițiile și autorizațiile de construcție din oraș, vizualizate pe stradă, cu detalii despre valori, finanțatori și stadiu.

Scopul proiectului este **transparența** – oricine poate vedea ce se construiește, cât costă, cine finanțează și unde anume pe hartă.

---

## Unde se poate accesa?

| Platformă | Link / Metodă |
|-----------|---------------|
| 🌐 **Web** (browser) | Găzduit pe **Netlify** – funcționează pe orice browser (Chrome, Firefox, Safari, Edge) |
| 📱 **Android** | Fișier `.apk` disponibil în repository – se instalează direct pe telefon |
| 💻 **Desktop** | Același link web, optimizat și pentru ecrane mari |

---

## Ce conține harta?

### 1. 📋 Autorizații de Construire (292 înregistrări)
Toate autorizațiile de construcție eliberate de Primăria Pășcani între **2020 și 2026**, cu:
- Valoarea totală autorizată: **~476 milioane RON**
- Categoria lucrării (rețele gaze, reabilitări, construcții rezidențiale, comerciale etc.)
- Investitorul (companie sau instituție)
- Adresa exactă și poziția pe hartă
- Sursa de finanțare (buget local, fonduri europene, fonduri private)

### 2. 💰 Investiții Publice
Proiecte mari de investiții ale Primăriei Pășcani și altor instituții:
- **~197 milioane RON** valoare totală
- Stadiu: planificat / în execuție / finalizat
- Progres procentual
- Detalii finanțare (PNRR, fonduri europene AFM, buget local)

**Exemple de investiții incluse:**
- Reabilitare Palatul Cantacuzino-Pășcanu (21,9 mil. RON – fonduri europene)
- Extindere Ambulatoriu Spital Municipal (12,6 mil. RON – fonduri europene)
- Revitalizare infrastructură educațională (17,8 mil. RON – fonduri europene)
- Renovare Colegiul Tehnic Unirea (13,9 mil. RON – PNRR, **finalizat**)
- Hidrocentrală Pășcani pe râul Siret (în analiză)

### 3. ♻️ Eco-Insule (31 locații – PNRR)
Sistem de colectare selectivă a deșeurilor finanțat prin PNRR:
- **3.443.650 RON** – 100% fonduri europene
- **50 de eco-insule** distribuite în 31 de locații din oraș
- **8.576 apartamente** deservite (213 blocuri)
- Zonele: Deal și Vale

### 4. ⚡ Stații de Reîncărcare Vehicule Electrice (7 locații)
Proiect finanțat prin **Administrația Fondului pentru Mediu (AFM)**:
- **2.020.381 RON** total (1.612.284 RON AFM + 408.097 RON buget local)
- **9 stații** în 7 locații strategice din oraș
- Contract nr. 368/GES din 20.12.2023

### 5. 📍 Locații de Interes (63 de puncte)
Harta include și puncte de interes din categorii precum:
- 🏥 Sănătate (spitale, clinici, farmacii)
- 🎓 Educație (școli, licee, universități)
- 🎭 Cultură (teatre, muzee, biblioteci)
- ⚽ Sport (săli, terenuri, bazine)
- 🏭 Industrie (18 companii industriale)
- 🛒 Comerț (supermarketuri, centre comerciale)
- ⛪ Religie (biserici, parohii)

### 6. 🛣️ Straturi Hărți
- **Străzi** – Rețeaua de drumuri din Pășcani, cu totalul investițiilor per stradă
- **Reabilitare termică clădiri** – Blocuri cu lucrări de eficiență energetică

---

## Cum funcționează tehnic?

> Această secțiune este pentru cei curiosi sau interesați de aspectul tehnic. Nu este necesară pentru utilizarea aplicației.

### Tehnologii folosite

| Tehnologie | Rol | Ce înseamnă simplu |
|------------|-----|--------------------|
| **HTML5 + CSS3** | Structura și aspectul vizual | „Scheletul" și „îmbrăcămintea" aplicației |
| **JavaScript (Vanilla)** | Logica aplicației | „Creierul" care face totul să funcționeze |
| **Leaflet.js** | Harta interactivă | Biblioteca care afișează harta și permite zoom, click pe puncte |
| **OpenStreetMap** | Hărțile de fundal | Harta deschisă a lumii (alternativa open-source la Google Maps) |
| **Overpass API** | Date despre străzi | Serviciu care furnizează în timp real conturul străzilor din Pășcani |
| **Capacitor v6** | Aplicație Android | Transformă site-ul web într-o aplicație Android `.apk` |
| **Netlify** | Găzduire web | Serverul gratuit care face site-ul accesibil online |
| **GitHub** | Versionare cod | Istoricul tuturor modificărilor, backup și publicare |

### Structura proiectului

```
Android App/
├── www/
│   └── index.html          ← Fișierul principal (tot codul + toate datele)
├── android/                ← Proiect Android generat de Capacitor
├── eco_insule.json         ← Date eco-insule importate
├── statii_reincarcare_ev.json ← Date stații EV importate
└── logo.svg                ← Logo-ul CivicData Live

Site Prezentare/
├── index.html              ← Pagina de prezentare (landing page)
├── app/
│   └── index.html          ← Copia aplicației (sincronizat cu www/)
└── CivicDataLive.apk       ← Fișierul de instalare Android
```

### Cum sunt stocate datele?

Toate datele (autorizații, investiții, locații) sunt stocate **direct în fișierul HTML**, ca arrays JavaScript. Nu există o bază de date separată sau un server backend. Aceasta face aplicația:
- **Rapidă** – nu are nevoie să descarce date de pe server la fiecare accesare
- **Simplă** – un singur fișier conține tot
- **Portabilă** – funcționează și offline (după prima încărcare)

### Cum se actualizează datele?

1. Se modifică fișierul `www/index.html`
2. Se rulează `npx cap sync android` (sincronizare cu proiectul Android)
3. Se compilează APK-ul: `gradlew assembleDebug`
4. Se copiază `index.html` în `Site Prezentare/app/`
5. Se face `git push` pe ambele repository-uri GitHub
6. Netlify detectează automat modificarea și actualizează site-ul în câteva minute

---

## Date și surse

| Sursă | Date preluate |
|-------|---------------|
| **Primăria Municipiului Pășcani** | Autorizații de construire 2020–2026 |
| **transparenta.eu** | Validare valori și investitori |
| **OpenStreetMap** | Hărți, rețea stradală, contururi clădiri |
| **PNRR Romania** | Proiecte eco-insule, eficiență energetică |
| **AFM (Administrația Fondului pentru Mediu)** | Stații reîncărcare EV |
| **CLP ECOSERV** | Autobuze electrice transport public |

---

## Identitate vizuală

Logoul **CivicData Live** este compus din forme orbitale abstracte în trei culori cu semnificație:

| Culoare | Hex | Semnificație |
|---------|-----|--------------|
| 🟣 Violet | `#7c3aed` | **Civic** – implicare civică, comunitate |
| 🔵 Cyan | `#0891b2` | **Data** – date deschise, transparență |
| 🔴 Roșu | `#e11d48` | **Live** – informație în timp real |

Font utilizat în întreaga aplicație: **Didot / Bodoni MT / Georgia** (serif elegant, lizibil)

---

## Repository-uri GitHub

| Repository | Conținut |
|------------|---------|
| `CyberSilviu/monitorul-pascani` | Codul sursă al aplicației Android + web |
| `CyberSilviu/Site-Prezentare` | Landing page + APK + copia aplicației (Netlify) |

---

## Statistici proiect

| Indicator | Valoare |
|-----------|---------|
| Autorizații de construire | **292** |
| Valoare totală autorizată | **~476 milioane RON** |
| Investiții publice majore | **~197 milioane RON** |
| Locații eco-insule | **31** (50 insule, 8.576 apartamente) |
| Stații reîncărcare EV | **7 locații** (9 stații) |
| Puncte de interes pe hartă | **63** |
| Ani acoperiți (AC) | **2020 – 2026** |

---

## Cine a construit acest proiect?

Proiect inițiat și coordonat de **Colegiul Tehnic de Căi Ferate "Unirea" Pașcani**, cu scopul de a pune informațiile publice despre Municipiul Pășcani la îndemâna tuturor cetățenilor, într-un format vizual, ușor de înțeles și accesibil pe orice dispozitiv.

Dezvoltat cu ajutorul **Claude (Anthropic)** – asistent AI utilizat pentru scrierea și gestionarea codului, procesarea datelor din PDF-uri și JSON-uri, și implementarea funcționalităților hărții.

---

*Ultima actualizare: Martie 2026*
