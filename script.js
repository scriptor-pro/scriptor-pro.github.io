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

const RUBRIQUES = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'accessibilite', label: 'Accessibilité' },
  { id: 'productivite', label: 'Neurodivergence & productivité' },
  { id: 'ecriture', label: "Outils d'écriture" },
  { id: 'experimentation', label: 'Expérimentation' },
  { id: 'sante', label: 'Santé & accessibilité alimentaire' },
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

document.addEventListener('DOMContentLoaded', () => {
  initDateBandeau();
  initFiltreProjets();
});
