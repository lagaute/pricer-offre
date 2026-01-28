// Configuration du pricing - Méthode Freelance Academy
// Règles fondamentales et références marché pour Community Managers

export const pricingRules = {
  // Seuil minimum absolu pour une offre complète
  MINIMUM_OFFRE_COMPLETE: 750,

  // Taux URSSAF pour auto-entrepreneur (environ 27%)
  TAUX_URSSAF: 0.27,

  // Prix maximum absolu
  MAXIMUM_PRIX: 1500,

  // Fourchettes de prix marché France (prestations CM mensuelles)
  fourchettesMarche: {
    entreeDeGamme: { min: 750, max: 950, label: 'Entrée de gamme' },
    moyenne: { min: 950, max: 1200, label: 'Moyenne marché' },
    premium: { min: 1300, max: 1500, label: 'Haut de marché' }
  },

  // Exceptions autorisant un prix < 750€
  exceptionsAutorisees: [
    'Montages vidéos + posts uniquement',
    'Création de contenu + calendrier éditorial (1 mois)',
    'Support ponctuel',
    'Mission ultra spécifique sans accompagnement'
  ]
};

// Multiplicateurs basés sur l'expérience (FACTEUR PRINCIPAL)
export const multiplicateursExperience = {
  debutante: 1.0,
  intermediaire: 1.12,
  experte: 1.3          // Seule une experte peut viser le haut du marché
};

// Multiplicateurs basés sur le nombre de clients passés (impact modéré)
export const multiplicateursClientsPassés = {
  'aucun': 1.0,
  '1-3': 1.0,
  '4-10': 1.03,
  '10+': 1.07
};

// Multiplicateurs basés sur la preuve sociale (impact modéré)
export const multiplicateursPreuveSociale = {
  'aucun': 1.0,
  'faible': 1.0,
  'moyenne': 1.03,
  'forte': 1.07
};

// Multiplicateurs basés sur le type d'offre
export const multiplicateursTypeOffre = {
  specifique: 0.6,    // Peut être < 750€
  partielle: 0.8,     // Peut être < 750€
  complete: 1.0       // Minimum 750€
};

// Multiplicateurs basés sur la transformation (FACTEUR CLÉ)
// Plus la transformation est profonde, plus l'offre a de la valeur
export const multiplicateursTransformation = {
  faible: 0.85,
  moyenne: 1.0,
  forte: 1.15         // Seule une forte transformation justifie un prix élevé
};

// Multiplicateurs basés sur la zone géographique (impact mineur)
export const multiplicateursZone = {
  province: 0.95,
  grande_ville: 1.0,
  paris_idf: 1.05,
  remote: 1.0
};

// Multiplicateurs basés sur la cible clients (IMPORTANT)
// Ordre logique: entrepreneurs < petits business < PME < startups < e-commerce < grandes entreprises
export const multiplicateursCible = {
  independants: 0.92,        // Budget serré, négocient plus
  petits_business: 0.95,     // Budget limité
  influenceurs: 0.98,        // Variable selon leur taille
  pme: 1.0,                  // Budget standard
  startups: 1.03,            // Peuvent investir pour croître
  ecommerce: 1.06,           // Comprennent la valeur du marketing
  grandes_entreprises: 1.12  // Budget confortable, exigences élevées
};

// Services qui augmentent la valeur de l'offre (bonus réduit)
export const servicesValeur = {
  audit: 15,
  strategie: 25,
  creation_contenu: 30,
  montage_video: 20,
  publication: 10,
  management: 20,
  reporting: 10,
  coaching: 30,
  suivi: 20,
  direction_artistique: 30,
  pub: 40,
  copywriting: 25,
  tunnel: 40
};

// Stratégies de pricing
export const strategiesPricing = {
  tresBas: {
    label: 'Très bas',
    avantages: ['Facile à vendre', 'Volume élevé'],
    inconvenients: [
      'Pas rentable',
      'Charge de travail très élevée pour peu de résultats',
      'Peu motivant',
      'Te décrédibilise',
      'Surcharge mentale'
    ]
  },
  moyen: {
    label: 'Moyen (Idéal)',
    avantages: ['Juste pour toi et ton client', 'Rentabilité', 'Durabilité'],
    inconvenients: ['Moins compétitive']
  },
  premium: {
    label: 'Premium',
    avantages: [
      'Moins de clients à gérer',
      'Rentabilité',
      'Attractif pour une clientèle haut de gamme'
    ],
    inconvenients: [
      'Pression sur la qualité',
      'Moins de clients',
      'Barrière psychologique',
      'Difficile à vendre au début'
    ]
  }
};

// Messages d'alerte pédagogiques
export const alertes = {
  sousEvaluation: {
    type: 'warning',
    titre: 'Sous-évaluation détectée',
    message: 'Ton prix est en dessous de ce que le marché pratique pour ton niveau d\'expertise et ton offre. Tu mérites mieux !'
  },
  confusionObjectif: {
    type: 'info',
    titre: 'Confusion objectif / prix',
    message: 'Attention à ne pas confondre ton objectif de revenus mensuel avec le prix de ton offre. Ce sont deux choses différentes.'
  },
  decalagePosture: {
    type: 'warning',
    titre: 'Décalage posture / ambition',
    message: 'Il y a un écart entre ton niveau d\'expertise et le prix que tu souhaites pratiquer. Assure-toi d\'être alignée.'
  },
  surcharge: {
    type: 'danger',
    titre: 'Risque de surcharge mentale',
    message: 'Avec ce prix et ce nombre de clients, tu risques de te surcharger. Pense à ta santé et à la qualité de ton travail.'
  },
  offreCompleteSous750: {
    type: 'error',
    titre: 'Prix trop bas pour une offre complète',
    message: 'Une offre mensuelle transformationnelle complète ne peut JAMAIS être pricée en dessous de 750€. C\'est une règle non négociable.'
  }
};

// Philosophie FA à rappeler
export const philosophieFA = [
  'Un prix trop bas ralentit ta progression',
  'Le bon prix est celui que tu peux annoncer sans t\'excuser et avec lequel tu es ALIGNÉE',
  'Tu peux faire évoluer ton prix avec l\'expérience',
  'Tu construis un business durable, pas juste un revenu court terme',
  'Tu vends une TRANSFORMATION, pas des heures ni des tâches',
  'L\'argent est neutre et doit transmettre la valeur de ton travail'
];
