# Page portfolio GitHub — scriptor-pro

**Date** : 2026-08-28
**Statut** : validé pour implémentation

## Contexte

Baudouin Van Humbeeck (compte GitHub `scriptor-pro`) est rédacteur senior /
analyste média / spécialiste accessibilité numérique avec ~30 ans
d'expérience éditoriale (Le Vif, Trinity Mirror, CAP48, GSK, Accessia...),
et développeur autodidacte (formation freeCodeCamp 2022) qui code par
side-skill pour servir son expertise en accessibilité WCAG et construire
des outils.

Le compte GitHub compte 91 repos publics (non-forks), avec un fil
conducteur net : accessibilité numérique (WCAG/RGAA), outils pour
neurodivergents (TDAH/spectre autistique), outils d'écriture et thèmes
pour blogueurs/écrivains (Ghost, 11ty, Jekyll), et quelques
expérimentations techniques diverses (Rust, Python, TypeScript).

Deux artefacts existants à ne pas dupliquer :
- `scriptor-pro/scriptor-pro` : README de profil GitHub, très sommaire
  ("Top Skills: HTML, CSS"), affiché en haut du profil github.com. Sera
  mis à jour séparément (hors scope de cette spec) en teaser pointant
  vers la nouvelle page.
- `cv-baudouin-van-humbeeck` : CV complet HTML/Markdown déployé sur
  `cv.bvh.fyi` via GitHub Pages (repo séparé, source `main`, path `/`).
  Reste la référence pour le détail du parcours professionnel complet ;
  la nouvelle page y renvoie plutôt que de le dupliquer.

## Objectif

Créer une page GitHub Pages dédiée qui sert de vitrine pour des
recruteurs, en exploitant le narratif hybride rédacteur/développeur
plutôt qu'en le masquant sous un template "portfolio dev" générique.
Cible : recruteurs de profils hybrides contenu/accessibilité/tech, sans
trancher vers un seul poste.

## Non-objectifs

- Pas de reprise détaillée du parcours professionnel (renvoi vers
  cv.bvh.fyi pour le détail).
- Pas de CMS, pas de backend, pas de build step complexe (framework
  JS, générateur de site) — HTML/CSS/JS vanilla statique.
- Pas de blog ni de section actualités.

## Architecture technique

- Nouveau repo **`scriptor-pro/scriptor-pro.github.io`**, publié via
  GitHub Pages (branche `main`, racine `/`), accessible à
  `https://scriptor-pro.github.io/`.
- Site **une page**, HTML sémantique + CSS (Grid/Flexbox) + JS vanilla
  minimal.
- Polices via **fonts.bunny.net** (alternative à Google Fonts sans
  tracking ni appel à des serveurs Google, cohérent avec l'exigence de
  vie privée) : une serif pour les titres (**Fraunces**, variable
  font, pour l'esthétique "titraille de journal") + une sans-serif
  nette pour le texte courant (**Inter** ou **Source Sans 3**).
- Dark mode : pris en charge via `prefers-color-scheme`, palette
  papier/encre (fond crème/blanc cassé en clair, fond charbon en
  sombre — pas de bleu corporate générique).
- Responsive : la grille éditoriale (colonnes façon journal) se
  linéarise en une seule colonne sur mobile ; la grille de projets
  passe de 3-4 colonnes à 1.
- Pas de dépendance JS externe. Un seul script pour un éventuel filtre
  de projets par rubrique (amélioration progressive — la page reste
  fonctionnelle sans JS).
- Accessibilité WCAG 2.1 AA soignée (cohérence avec l'expertise
  affichée) : contraste vérifié, structure de titres logique,
  attributs alt, navigation clavier testée, `prefers-reduced-motion`
  respecté.

## Structure de la page

### 1. En-tête / manchette

- Bandeau kicker en haut : `ÉCRITURE · CODE · ACCESSIBILITÉ` + date du
  jour générée dynamiquement (style "édition du jour").
- Nom en gros titre serif façon manchette : "Baudouin Van Humbeeck".
- Sous-titre-accroche courte et incisive, ton assumé, à rédiger avec
  soin (pas la bio GitHub actuelle telle quelle) — esprit : rédacteur
  senior et développeur autodidacte, les deux à la fois, pas l'un
  malgré l'autre.
- Filet typographique séparateur façon journal sous l'en-tête.

### 2. Chapô

- Un paragraphe en gros corps (style chapô d'article de presse) qui
  pose le narratif hybride en 3-4 phrases : le virage vers
  l'accessibilité numérique après une carrière éditoriale, le code
  comme outil au service de cette expertise et non comme carrière
  parallèle. Pas de timeline détaillée.

### 3. Grille de projets (9 projets, 4 rubriques)

Chaque projet est présenté comme une "brève" : kicker de rubrique,
titre, description courte, stack technique, lien(s) (repo + démo si
disponible). Sélection retenue :

**ACCESSIBILITÉ**
- `accessiform` — formulaire HTML compilant tous les types de champs
  conformes WCAG. (HTML)
- `time2crack` — outil d'estimation de robustesse de mot de passe,
  interface multilingue, modélisation du temps d'attaque. (HTML/JS)

**NEURODIVERGENCE & PRODUCTIVITÉ**
- `qfqa` — emploi du temps pensé pour TDAH / spectre autistique / les
  deux ; n'affiche que les tâches du jour selon l'énergie disponible.
  (Svelte) — démo : qfqa.vercel.app
- `quatorzaine` — planning quotidien sur 14 jours pour profils
  neurodivergents. (JavaScript) — démo : 14.bvh.fyi
- `memo-tori` — application de capture d'idées à la volée. (Python) —
  démo : scriptor-pro.github.io/memo-tori/

**OUTILS D'ÉCRITURE**
- `Jules` — éditeur Markdown desktop (Tauri 2 + Rust + React) pour
  rédiger et publier des articles vers un générateur de site statique
  via Git (Hugo, Jekyll, Astro, Eleventy, Pelican) ; PAT stocké dans le
  keychain natif de l'OS. Projet en développement actif (v0.2.x).
  (Rust/TypeScript) — hébergé sur Codeberg :
  `codeberg.org/baudouin/Jules` (lien externe assumé, hors GitHub).
- `velocitetxt` — application de prise de notes façon nvPY, en Rust.
  (Rust)
- `11ty-front-matter-generator` — outil web pour générer le
  front-matter parfait pour Eleventy. (HTML/JS)

**EXPÉRIMENTATION**
- `terminal-theme-studio` — atelier de création de thèmes terminal.
  (TypeScript)

Chaque carte affiche honnêtement la stack ; pas de survente. Les
projets marqués comme expérimentaux/assistés par IA dans leurs topics
GitHub (ex. `vibe-coding` sur memo-tori) restent présentés sobrement,
sans mention explicite de la méthode de création (ce n'est pas
l'angle de la page).

Cas particulier `Jules` : seul projet de la sélection hébergé hors
GitHub (sur Codeberg). Le lien de sa carte pointe directement vers
`codeberg.org/baudouin/Jules` plutôt que vers un miroir GitHub
inexistant — assumé ouvertement comme un détail crédible d'un profil
tech qui pratique plusieurs forges.

### 4. Compétences en bandeau (3 rubriques)

Présentées comme des rubriques de journal, pas une liste à puces
générique :

- **RÉDACTION & CONTENU** — storytelling, SEO, journalisme, web
  copywriting
- **ACCESSIBILITÉ & AUDIT** — WCAG 2.1, RGAA, HTML/CSS sémantique
- **DÉVELOPPEMENT** — HTML/CSS, JavaScript/TypeScript, Python, Svelte,
  Rust (notions)

### 5. Pied de page ("ours")

Style ours de journal détourné, en colonnes sobres :
- Lien vers le CV complet (cv.bvh.fyi)
- LinkedIn
- Bluesky (@bvh.fyi)
- GitHub (lien vers le profil)
- Contact (bvh@scriptor.pro)
- Mention discrète type "dernière mise à jour" / année

## Contenu à rédiger avec soin

Le chapô et le sous-titre de manchette sont les éléments texte les
plus sensibles de la page (c'est le narratif hybride qui doit
convaincre en quelques secondes). Ils seront rédigés en français,
avec le même souci éditorial que le reste du parcours de l'auteur.

## Déploiement

1. Créer le repo `scriptor-pro/scriptor-pro.github.io` sur GitHub
   (nécessite une action de l'utilisateur ou confirmation avant
   création, car ceci publie sur son compte).
2. Développer et tester la page en local dans ce répertoire de travail
   d'abord.
3. Pousser vers `main`, activer GitHub Pages si pas automatique.
4. Vérifier le rendu en ligne (desktop + mobile), vérifier
   l'accessibilité (contraste, navigation clavier).
5. Mettre à jour le README de `scriptor-pro/scriptor-pro` avec un
   teaser + lien vers la nouvelle page (tâche de suivi, hors scope
   immédiat sauf accord explicite).

## Critères de succès

- La page se charge sans dépendance externe cassée, en HTTPS, sur
  desktop et mobile.
- Un recruteur qui scanne la page 10 secondes comprend : (1) que la
  personne écrit professionnellement depuis longtemps, (2) qu'elle a
  une expertise accessibilité numérique concrète, (3) qu'elle code
  des outils réels et fonctionnels.
- Contraste et navigation clavier conformes WCAG 2.1 AA — cohérence
  avec l'expertise revendiquée.
- Aucune duplication frontale avec le contenu du CV existant
  (cv.bvh.fyi) : la page renvoie vers lui plutôt que de le répéter.
