# Page portfolio GitHub scriptor-pro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire la page statique une-page (`index.html` + `styles.css` + `script.js`) qui sert de vitrine GitHub pour scriptor-pro, prête à être publiée sur `scriptor-pro/scriptor-pro.github.io`.

**Architecture:** Site HTML/CSS/JS vanilla, une seule page, sans build step. HTML sémantique structuré en 5 sections (manchette, chapô, grille de projets, compétences, pied de page "ours"). CSS avec variables pour la palette clair/sombre (`prefers-color-scheme`), grille éditoriale en CSS Grid, responsive mobile-first. JS minimal et non bloquant : horodatage dynamique de la manchette + filtre de projets par rubrique en amélioration progressive (la page reste 100% fonctionnelle sans JS).

**Tech Stack:** HTML5, CSS3 (Grid, Flexbox, variables CSS, `prefers-color-scheme`, `prefers-reduced-motion`), JavaScript vanilla ES6, polices via fonts.bunny.net (Fraunces + Inter).

**Spec:** `docs/superpowers/specs/2026-08-28-page-portfolio-github-design.md`

## Global Constraints

- Pas de framework JS, pas de build step, pas de dépendance npm — HTML/CSS/JS vanilla statique servi tel quel.
- Polices chargées depuis **fonts.bunny.net** exclusivement (jamais Google Fonts).
- Palette papier/encre (fond crème/blanc cassé en clair, charbon en sombre) — pas de bleu corporate générique.
- Accessibilité WCAG 2.1 AA : contraste vérifié, structure de titres logique (`h1` → `h2` → `h3` sans saut de niveau), `alt` sur toute image, navigation clavier complète, `prefers-reduced-motion` respecté.
- Le JS est une amélioration progressive : toute la page (contenu, navigation, liens) doit rester utilisable si JS est désactivé.
- Contenu en français, ton éditorial soigné, cohérent avec le CV existant (`cv.bvh.fyi`) sans le dupliquer.
- Sélection de projets et copie figées par la spec (section "Structure de la page") — ne pas ajouter/retirer de projet sans repasser par la spec.

---

## File Structure

- Create: `index.html` — structure sémantique complète de la page (5 sections)
- Create: `styles.css` — variables de thème, typographie, layout, composants, responsive, dark mode
- Create: `script.js` — date dynamique du bandeau + filtre de projets par rubrique
- Create: `README.md` — description minimale du repo (convention GitHub, à la racine)

---

### Task 1: Squelette HTML sémantique et chargement des polices

**Files:**
- Create: `index.html`

**Interfaces:**
- Produces: structure DOM avec les classes/ids que `styles.css` (Task 2) et `script.js` (Task 4) cibleront :
  - `<header class="masthead">` contenant `<p class="kicker" id="kicker">`, `<h1>`, `<p class="tagline">`, `<hr class="rule">`
  - `<section class="chapo">` avec un seul `<p>`
  - `<section class="projects" id="projects">` contenant des `<article class="project-card" data-category="...">`
  - `<section class="skills">` contenant trois `<div class="skill-block">`
  - `<footer class="masthead-foot">` avec les colonnes de liens
  - `<nav class="category-filter" id="category-filter">` (les boutons de filtre seront injectés par JS en Task 4 ; ici prévoir juste le conteneur vide avec un commentaire HTML indiquant que JS le peuple)

**Steps:**

- [ ] **Step 1: Créer `index.html` avec le head et le chargement des polices Bunny Fonts**

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baudouin Van Humbeeck — Rédacteur & développeur</title>
  <meta name="description" content="Rédacteur senior et développeur autodidacte : accessibilité numérique, écriture et code.">
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=fraunces:600,700,900|inter:400,500,600,700" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
</body>
</html>
```

- [ ] **Step 2: Ajouter la section manchette (`<header class="masthead">`)**

Insérer dans `<body>`, avant tout le reste :

```html
  <header class="masthead">
    <p class="kicker" id="kicker">ÉCRITURE · CODE · ACCESSIBILITÉ</p>
    <h1>Baudouin Van Humbeeck</h1>
    <p class="tagline">Trente ans à écrire pour être lu. Depuis quelques années, à coder pour que tout le monde puisse l'être.</p>
    <hr class="rule">
  </header>
```

- [ ] **Step 3: Ajouter la section chapô**

```html
  <section class="chapo">
    <p>
      Rédacteur et journaliste de formation, j'ai passé l'essentiel de ma carrière
      à produire et cadrer du contenu — presse, communication, web. Le virage vers
      l'accessibilité numérique (WCAG, RGAA) m'a mené à apprendre à lire et écrire
      du code, en autodidacte, pour auditer et corriger ce qui empêche un contenu
      d'être vraiment accessible. Le code, chez moi, reste un outil au service de
      l'écrit — pas une deuxième carrière qui aurait pris le pas sur la première.
    </p>
  </section>
```

- [ ] **Step 4: Ajouter la section grille de projets avec le conteneur de filtre**

```html
  <section class="projects" id="projects" aria-labelledby="projects-heading">
    <h2 id="projects-heading">Projets</h2>
    <!-- Peuplé par script.js : boutons de filtre par rubrique (amélioration progressive) -->
    <nav class="category-filter" id="category-filter" aria-label="Filtrer les projets par rubrique"></nav>

    <div class="project-grid">

      <article class="project-card" data-category="accessibilite">
        <p class="project-kicker">Accessibilité</p>
        <h3><a href="https://github.com/scriptor-pro/accessiform">accessiform</a></h3>
        <p class="project-desc">Tous les types de champs de formulaire HTML compilés en un seul gabarit conforme WCAG.</p>
        <p class="project-stack">HTML</p>
      </article>

      <article class="project-card" data-category="accessibilite">
        <p class="project-kicker">Accessibilité</p>
        <h3><a href="https://github.com/scriptor-pro/time2crack">time2crack</a></h3>
        <p class="project-desc">Estimation avancée de la robustesse d'un mot de passe : interface multilingue, modélisation du temps d'attaque.</p>
        <p class="project-stack">HTML / JavaScript</p>
      </article>

      <article class="project-card" data-category="productivite">
        <p class="project-kicker">Neurodivergence &amp; productivité</p>
        <h3><a href="https://github.com/scriptor-pro/qfqa">qfqa</a></h3>
        <p class="project-desc">Emploi du temps pensé pour TDAH, spectre autistique ou les deux : n'affiche que les tâches du jour, selon l'énergie disponible.</p>
        <p class="project-stack">Svelte</p>
        <p class="project-links"><a href="https://qfqa.vercel.app">Démo</a></p>
      </article>

      <article class="project-card" data-category="productivite">
        <p class="project-kicker">Neurodivergence &amp; productivité</p>
        <h3><a href="https://github.com/scriptor-pro/quatorzaine">quatorzaine</a></h3>
        <p class="project-desc">Planning quotidien sur quatorze jours glissants, pour profils neurodivergents.</p>
        <p class="project-stack">JavaScript</p>
        <p class="project-links"><a href="http://14.bvh.fyi/">Démo</a></p>
      </article>

      <article class="project-card" data-category="productivite">
        <p class="project-kicker">Neurodivergence &amp; productivité</p>
        <h3><a href="https://github.com/scriptor-pro/memo-tori">memo-tori</a></h3>
        <p class="project-desc">Application de capture d'idées à la volée, avant qu'elles ne s'échappent.</p>
        <p class="project-stack">Python</p>
        <p class="project-links"><a href="https://scriptor-pro.github.io/memo-tori/">Démo</a></p>
      </article>

      <article class="project-card" data-category="ecriture">
        <p class="project-kicker">Outils d'écriture</p>
        <h3><a href="https://codeberg.org/baudouin/Jules">Jules</a></h3>
        <p class="project-desc">Éditeur Markdown desktop pour rédiger et publier des articles vers un générateur de site statique via Git (Hugo, Jekyll, Astro, Eleventy, Pelican). Jeton d'accès stocké dans le trousseau natif de l'OS. En développement actif.</p>
        <p class="project-stack">Rust / TypeScript · Tauri</p>
      </article>

      <article class="project-card" data-category="ecriture">
        <p class="project-kicker">Outils d'écriture</p>
        <h3><a href="https://github.com/scriptor-pro/velocitetxt">velocitetxt</a></h3>
        <p class="project-desc">Application de prise de notes façon nvPY, écrite en Rust.</p>
        <p class="project-stack">Rust</p>
      </article>

      <article class="project-card" data-category="ecriture">
        <p class="project-kicker">Outils d'écriture</p>
        <h3><a href="https://github.com/scriptor-pro/11ty-front-matter-generator">11ty-front-matter-generator</a></h3>
        <p class="project-desc">Petit outil web pour générer le front-matter parfait avant de publier avec Eleventy.</p>
        <p class="project-stack">HTML / JavaScript</p>
      </article>

      <article class="project-card" data-category="experimentation">
        <p class="project-kicker">Expérimentation</p>
        <h3><a href="https://github.com/scriptor-pro/terminal-theme-studio">terminal-theme-studio</a></h3>
        <p class="project-desc">Atelier de création de thèmes pour terminal.</p>
        <p class="project-stack">TypeScript</p>
      </article>

    </div>
  </section>
```

- [ ] **Step 5: Ajouter la section compétences en bandeau**

```html
  <section class="skills" aria-labelledby="skills-heading">
    <h2 id="skills-heading">Compétences</h2>
    <div class="skill-block">
      <h3>Rédaction &amp; contenu</h3>
      <p>Storytelling, SEO, journalisme, web copywriting</p>
    </div>
    <div class="skill-block">
      <h3>Accessibilité &amp; audit</h3>
      <p>WCAG 2.1, RGAA, HTML/CSS sémantique</p>
    </div>
    <div class="skill-block">
      <h3>Développement</h3>
      <p>HTML/CSS, JavaScript/TypeScript, Python, Svelte, notions de Rust</p>
    </div>
  </section>
```

- [ ] **Step 6: Ajouter le pied de page "ours"**

```html
  <footer class="masthead-foot">
    <div class="foot-col">
      <h4>CV complet</h4>
      <p><a href="https://cv.bvh.fyi">cv.bvh.fyi</a></p>
    </div>
    <div class="foot-col">
      <h4>Profils</h4>
      <p><a href="https://www.linkedin.com/in/baudouinvanhumbeeck">LinkedIn</a></p>
      <p><a href="https://bsky.app/profile/bvh.fyi">Bluesky</a></p>
      <p><a href="https://github.com/scriptor-pro">GitHub</a></p>
    </div>
    <div class="foot-col">
      <h4>Contact</h4>
      <p><a href="mailto:bvh@scriptor.pro">bvh@scriptor.pro</a></p>
    </div>
    <p class="foot-note">Dernière mise à jour : <span id="update-year">2026</span></p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 7: Vérifier la validité du HTML**

Run: `npx html-validate index.html 2>&1 || echo "html-validate indisponible, vérification manuelle"`
Expected: aucune erreur de structure (balises non fermées, attributs requis manquants). Si `html-validate` n'est pas disponible en local, relire le fichier visuellement pour vérifier que chaque section ouverte en Step 2-6 est bien fermée et proprement imbriquée dans `<body>`.

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "Ajoute le squelette HTML de la page portfolio"
```

---

### Task 2: Feuille de style — variables de thème, typographie, dark mode

**Files:**
- Create: `styles.css`

**Interfaces:**
- Consumes: les classes/ids produits par Task 1 (`masthead`, `kicker`, `tagline`, `rule`, `chapo`, `projects`, `project-grid`, `project-card`, `project-kicker`, `project-desc`, `project-stack`, `project-links`, `category-filter`, `skills`, `skill-block`, `masthead-foot`, `foot-col`, `foot-note`).
- Produces: variables CSS `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-rule`, `--font-serif`, `--font-sans` réutilisées telles quelles par toute règle CSS ultérieure et par les ajustements de Task 3.

**Steps:**

- [ ] **Step 1: Poser le reset minimal, les variables de thème clair, et les polices**

```css
/* --- Reset minimal --- */
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }
img { max-width: 100%; display: block; }
a { color: inherit; }

/* --- Thème clair (défaut) --- */
:root {
  --color-bg: #faf6ee;
  --color-bg-alt: #f0e9d8;
  --color-text: #1c1a17;
  --color-text-muted: #55504a;
  --color-accent: #8a2b1d;
  --color-rule: #1c1a17;

  --font-serif: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* --- Thème sombre --- */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #1b1917;
    --color-bg-alt: #26221e;
    --color-text: #f0ebe0;
    --color-text-muted: #b8b0a2;
    --color-accent: #e2795f;
    --color-rule: #f0ebe0;
  }
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  line-height: 1.5;
}

h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 0.5em;
}

a {
  text-decoration-thickness: 1px;
  text-underline-offset: 0.15em;
}

a:hover, a:focus-visible {
  color: var(--color-accent);
}

a:focus-visible, button:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```

- [ ] **Step 2: Ouvrir `index.html` dans un navigateur et vérifier visuellement que le fond/texte changent bien avec le thème système**

Run : ouvrir `index.html` en local (double-clic ou `python3 -m http.server` puis navigateur), basculer le thème clair/sombre du système d'exploitation, recharger la page.
Expected : le fond et le texte changent de palette (crème/charbon) sans flash de contenu non stylé cassé — titres en Fraunces, texte courant en Inter (vérifiable dans les DevTools > Computed Style).

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Ajoute les variables de thème, le reset et le dark mode"
```

---

### Task 3: Feuille de style — layout éditorial, composants, responsive

**Files:**
- Modify: `styles.css` (ajout à la suite du fichier de Task 2)

**Interfaces:**
- Consumes: variables CSS de Task 2 (`--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-rule`, `--font-serif`, `--font-sans`) et les classes HTML de Task 1.
- Produces: classe `.kicker-date` (Step 1), consommée par Task 4 (JS) qui crée un `<span class="kicker-date">` dynamiquement. Tous les autres sélecteurs stylés ici (`.category-filter button`, `.project-card[hidden]`) ciblent des éléments créés par Task 1 (statique) ou par Task 4 (injectés en JS) — aucun autre sélecteur nouveau n'est consommé par une tâche ultérieure.

**Steps:**

- [ ] **Step 1: Styler la manchette (header)**

```css
.masthead {
  max-width: 60rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 1.5rem;
  text-align: center;
}

.kicker {
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0 0 1rem;
}

.kicker-date {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 400;
}

.masthead h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin: 0 0 0.75rem;
}

.tagline {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  color: var(--color-text-muted);
  max-width: 40rem;
  margin: 0 auto;
}

.rule {
  border: none;
  border-top: 3px double var(--color-rule);
  margin: 2rem auto 0;
  max-width: 60rem;
}
```

- [ ] **Step 2: Styler le chapô**

```css
.chapo {
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.chapo p {
  font-family: var(--font-serif);
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  line-height: 1.6;
}
```

- [ ] **Step 3: Styler la grille de projets et les cartes**

```css
.projects {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

.projects h2 {
  font-size: 1.75rem;
  border-bottom: 3px solid var(--color-rule);
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.category-filter button {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border: 2px solid var(--color-rule);
  border-radius: 999px;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.category-filter button[aria-pressed="true"] {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-rule);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.project-kicker {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0;
}

.project-card h3 {
  font-size: 1.25rem;
  margin: 0;
}

.project-desc {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  flex-grow: 1;
  margin: 0;
}

.project-stack {
  font-size: 0.8rem;
  font-family: monospace;
  margin: 0;
}

.project-links {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
}

.project-card[hidden] {
  display: none;
}
```

- [ ] **Step 4: Styler les compétences en bandeau**

```css
.skills {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
  border-top: 3px solid var(--color-rule);
}

.skills h2 {
  grid-column: 1 / -1;
  font-size: 1.75rem;
  margin-top: 1.5rem;
}

.skill-block h3 {
  font-size: 1.1rem;
  border-bottom: 1px solid var(--color-text-muted);
  padding-bottom: 0.3rem;
}

.skill-block p {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
```

- [ ] **Step 5: Styler le pied de page ("ours") et le responsive mobile**

```css
.masthead-foot {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
  border-top: 3px double var(--color-rule);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.5rem;
  font-size: 0.9rem;
}

.foot-col h4 {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 0.5rem;
}

.foot-col p {
  margin: 0.25rem 0;
}

.foot-note {
  grid-column: 1 / -1;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  margin-top: 1rem;
}

/* --- Responsive : mobile --- */
@media (max-width: 30rem) {
  .masthead {
    padding: 1.5rem 1rem 1rem;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 6: Vérifier visuellement le rendu desktop et mobile**

Run : ouvrir `index.html` dans le navigateur (`python3 -m http.server` puis visite locale), redimensionner la fenêtre / activer le mode responsive des DevTools à 375px de large.
Expected : la grille de projets passe de plusieurs colonnes à une seule sous ~480px, aucun débordement horizontal, le pied de page reste lisible en colonne unique sur mobile.

- [ ] **Step 7: Vérifier le contraste des couleurs (WCAG AA)**

Run : DevTools navigateur > inspecter `.chapo p`, `.project-desc`, `.foot-note` en thème clair et sombre, relever le ratio de contraste affiché (ou utiliser un vérificateur de contraste en ligne avec les valeurs hex de Task 2 Step 1).
Expected : ratio ≥ 4.5:1 pour le texte courant, ≥ 3:1 pour le texte large (titres). Si `--color-text-muted` ou `--color-accent` échoue en sombre, ajuster leur valeur hex dans `:root` et `@media (prefers-color-scheme: dark)` (Task 2 Step 1) jusqu'à conformité, puis recommit.

- [ ] **Step 8: Commit**

```bash
git add styles.css
git commit -m "Ajoute le layout éditorial, les composants et le responsive"
```

---

### Task 4: Comportement JS — date dynamique et filtre de projets

**Files:**
- Create: `script.js`

**Interfaces:**
- Consumes: `#kicker` (Task 1), `#category-filter` (Task 1), `.project-card[data-category]` (Task 1), `#update-year` (Task 1), classe CSS `.kicker-date` (Task 3 Step 1) pour le `<span>` de date injecté, classes CSS `.category-filter button` et `[aria-pressed]` (Task 3 Step 3) pour le style des boutons injectés.
- Produces: rien consommé par une tâche ultérieure de ce plan.

**Steps:**

- [ ] **Step 1: Écrire la fonction d'affichage de la date du jour dans le bandeau**

```javascript
function formatDateDuJour() {
  const aujourdhui = new Date();
  const formateur = new Intl.DateTimeFormat('fr-BE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formateur.format(aujourdhui);
}

function initDateBandeau() {
  const kicker = document.getElementById('kicker');
  if (!kicker) return;
  const dateNode = document.createElement('span');
  dateNode.className = 'kicker-date';
  dateNode.textContent = ' — ' + formatDateDuJour();
  kicker.appendChild(dateNode);
}
```

- [ ] **Step 2: Écrire la fonction de mise à jour de l'année dans le pied de page**

```javascript
function initAnneeFooter() {
  const anneeNode = document.getElementById('update-year');
  if (!anneeNode) return;
  anneeNode.textContent = new Date().getFullYear();
}
```

- [ ] **Step 3: Écrire le filtre de projets par rubrique (amélioration progressive)**

```javascript
const RUBRIQUES = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'accessibilite', label: 'Accessibilité' },
  { id: 'productivite', label: 'Neurodivergence & productivité' },
  { id: 'ecriture', label: "Outils d'écriture" },
  { id: 'experimentation', label: 'Expérimentation' },
];

function appliquerFiltre(rubriqueId, cartes) {
  cartes.forEach((carte) => {
    const visible = rubriqueId === 'toutes' || carte.dataset.category === rubriqueId;
    carte.hidden = !visible;
  });
}

function initFiltreProjets() {
  const conteneur = document.getElementById('category-filter');
  const cartes = Array.from(document.querySelectorAll('.project-card'));
  if (!conteneur || cartes.length === 0) return;

  RUBRIQUES.forEach((rubrique) => {
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.textContent = rubrique.label;
    bouton.dataset.category = rubrique.id;
    bouton.setAttribute('aria-pressed', rubrique.id === 'toutes' ? 'true' : 'false');

    bouton.addEventListener('click', () => {
      conteneur.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      bouton.setAttribute('aria-pressed', 'true');
      appliquerFiltre(rubrique.id, cartes);
    });

    conteneur.appendChild(bouton);
  });
}
```

- [ ] **Step 4: Initialiser les trois fonctions au chargement du DOM**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initDateBandeau();
  initAnneeFooter();
  initFiltreProjets();
});
```

- [ ] **Step 5: Vérifier manuellement dans le navigateur**

Run : ouvrir `index.html` en local, ouvrir la console DevTools.
Expected : aucune erreur JS dans la console ; la manchette affiche la date du jour après le bandeau kicker ; les boutons de filtre apparaissent au-dessus de la grille de projets ; cliquer sur "Accessibilité" ne laisse visibles que les cartes `accessiform` et `time2crack` ; cliquer sur "Toutes" réaffiche les 9 cartes ; le pied de page affiche l'année en cours.

- [ ] **Step 6: Vérifier la dégradation sans JS**

Run : DevTools > désactiver JavaScript (Chrome : Cmd/Ctrl+Shift+P > "Disable JavaScript"), recharger la page.
Expected : les 9 cartes de projets restent toutes visibles et lisibles, tous les liens restent cliquables, seuls la date dynamique et les boutons de filtre sont absents — aucune partie du contenu n'est cachée ou cassée.

- [ ] **Step 7: Vérifier la navigation clavier**

Run : recharger la page avec JS activé, naviguer uniquement au clavier (Tab / Shift+Tab / Entrée / Espace) depuis le haut de la page.
Expected : chaque lien et bouton de filtre reçoit un focus visible (contour `--color-accent` défini en Task 2 Step 1), l'ordre de tabulation suit l'ordre visuel (manchette → chapô → filtre → cartes → compétences → pied de page), activer un bouton de filtre au clavier (Entrée ou Espace) applique le filtre.

- [ ] **Step 8: Commit**

```bash
git add script.js
git commit -m "Ajoute la date dynamique et le filtre de projets par rubrique"
```

---

### Task 5: README du repo et vérification finale de cohérence

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: aucune (fichier terminal, ne produit d'interface pour aucune autre tâche)

**Steps:**

- [ ] **Step 1: Écrire le README du repo**

```markdown
# scriptor-pro.github.io

Page portfolio GitHub de Baudouin Van Humbeeck — rédacteur senior,
spécialiste accessibilité numérique et développeur autodidacte.

En ligne : https://scriptor-pro.github.io/

## Stack

HTML/CSS/JS vanilla, sans framework ni étape de build. Polices via
[fonts.bunny.net](https://fonts.bunny.net) (Fraunces + Inter).

## Développement local

Aucune installation nécessaire. Servir le dossier avec n'importe quel
serveur statique, par exemple :

\`\`\`bash
python3 -m http.server
\`\`\`

Puis ouvrir `http://localhost:8000`.

## Voir aussi

- CV complet : [cv.bvh.fyi](https://cv.bvh.fyi)
- Spec de design : `docs/superpowers/specs/2026-08-28-page-portfolio-github-design.md`
```

- [ ] **Step 2: Relire `index.html`, `styles.css`, `script.js` ensemble et vérifier la cohérence des sélecteurs**

Run : `grep -oE 'class="[^"]*"|id="[^"]*"' index.html | sort -u` puis comparer manuellement à `grep -oE '\.[a-zA-Z][a-zA-Z0-9_-]*|#[a-zA-Z][a-zA-Z0-9_-]*' styles.css script.js | sort -u`.
Expected : chaque classe/id référencé dans `styles.css` et `script.js` existe bien dans `index.html` (pas de sélecteur mort), et chaque classe/id notable de `index.html` (hors utilitaires ponctuels) est bien stylé.

- [ ] **Step 3: Vérifier tous les liens externes de la page**

Run : lister tous les `href` de `index.html` (`grep -oE 'href="[^"]*"' index.html`) et vérifier un par un qu'ils correspondent aux URLs de la spec : `github.com/scriptor-pro/accessiform`, `github.com/scriptor-pro/time2crack`, `github.com/scriptor-pro/qfqa` + `qfqa.vercel.app`, `github.com/scriptor-pro/quatorzaine` + `14.bvh.fyi`, `github.com/scriptor-pro/memo-tori` + `scriptor-pro.github.io/memo-tori/`, `codeberg.org/baudouin/Jules`, `github.com/scriptor-pro/velocitetxt`, `github.com/scriptor-pro/11ty-front-matter-generator`, `github.com/scriptor-pro/terminal-theme-studio`, `cv.bvh.fyi`, LinkedIn, Bluesky, `github.com/scriptor-pro`, `mailto:bvh@scriptor.pro`.
Expected : aucune URL manquante ou mal orthographiée par rapport à la liste ci-dessus.

- [ ] **Step 4: Commit final**

```bash
git add README.md
git commit -m "Ajoute le README du repo"
```

---

## Hors scope de ce plan

- Création effective du repo GitHub `scriptor-pro/scriptor-pro.github.io` et push (nécessite une action explicite de l'utilisateur — voir spec, section Déploiement, étapes 1 et 3).
- Mise à jour du README de `scriptor-pro/scriptor-pro` (profil GitHub) — tâche de suivi distincte selon la spec.
- Captures d'écran ou vérification du rendu en ligne une fois publié (spec, Déploiement étape 4) — à faire après le push, hors cycle d'implémentation locale.
