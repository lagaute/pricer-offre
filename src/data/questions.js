// Structure des questions pour le pricing CM - Méthode Freelance Academy
// Basé sur les 4 piliers du pricing + spécificités Community Manager

export const questions = [
  // ============================================
  // SECTION A: EXPÉRIENCE & CRÉDIBILITÉ
  // ============================================
  {
    id: 'niveau_experience',
    section: 'experience',
    sectionTitle: 'Expérience & Crédibilité',
    type: 'dropdown',
    question: 'Quel est ton niveau d\'expérience en Community Management ?',
    options: [
      { value: 'debutante', label: 'Débutante (moins d\'1 an)' },
      { value: 'intermediaire', label: 'Intermédiaire (2-3 ans)' },
      { value: 'experte', label: 'Experte (3 ans et +)' }
    ],
    required: true,
    helpText: 'Ton niveau d\'expérience influence directement ton positionnement tarifaire.'
  },
  {
    id: 'nombre_clients',
    section: 'experience',
    type: 'dropdown',
    question: 'Combien de clients as-tu déjà accompagné en Community Management ?',
    options: [
      { value: 'aucun', label: 'Aucun (je débute)' },
      { value: '1-3', label: '1 à 3 clients' },
      { value: '4-10', label: '4 à 10 clients' },
      { value: '10+', label: 'Plus de 10 clients' }
    ],
    required: true
  },
  {
    id: 'background',
    section: 'experience',
    type: 'multiple',
    question: 'Quel est ton background / formation ?',
    options: [
      { value: 'autodidacte', label: 'Autodidacte' },
      { value: 'formation_cm', label: 'Formation spécialisée CM/Social Media' },
      { value: 'ecole_commerce', label: 'École de commerce' },
      { value: 'ecole_communication', label: 'École de communication/marketing' },
      { value: 'universite', label: 'Université (licence/master)' },
      { value: 'grande_ecole', label: 'Grande école' },
      { value: 'certification', label: 'Certifications professionnelles (Meta, Google...)' }
    ],
    multiple: true,
    required: true,
    helpText: 'Sélectionne toutes les formations qui s\'appliquent.'
  },
  {
    id: 'type_experience',
    section: 'experience',
    type: 'multiple',
    question: 'Dans quel(s) contexte(s) as-tu déjà travaillé ?',
    options: [
      { value: 'freelance', label: 'En freelance' },
      { value: 'alternance', label: 'En alternance' },
      { value: 'agence', label: 'En agence' },
      { value: 'interne', label: 'En interne entreprise' },
      { value: 'aucun', label: 'Aucune expérience professionnelle encore' }
    ],
    multiple: true,
    required: true
  },

  // ============================================
  // SECTION B: RÉSULTATS & PREUVE SOCIALE
  // ============================================
  {
    id: 'resultats_mesurables',
    section: 'resultats',
    sectionTitle: 'Résultats & Preuve Sociale',
    type: 'multiple',
    question: 'As-tu déjà obtenu des résultats mesurables pour tes clients ?',
    options: [
      { value: 'croissance_abonnes', label: 'Croissance d\'abonnés significative' },
      { value: 'avant_apres', label: 'Transformations avant/après documentées' },
      { value: 'temoignages', label: 'Témoignages clients positifs' },
      { value: 'etude_cas', label: 'Études de cas détaillées' },
      { value: 'resultats_ventes', label: 'Résultats chiffrés en ventes/CA' },
      { value: 'resultats_leads', label: 'Résultats chiffrés en leads générés' },
      { value: 'aucun', label: 'Pas encore de résultats mesurables' }
    ],
    multiple: true,
    required: true,
    helpText: 'La preuve sociale est un facteur clé pour justifier tes tarifs.'
  },

  // ============================================
  // SECTION C: COMPRÉHENSION DE L'OFFRE
  // ============================================
  {
    id: 'services_inclus',
    section: 'offre',
    sectionTitle: 'Ton Offre',
    type: 'multiple',
    question: 'Quels services sont inclus dans ton offre mensuelle ?',
    options: [
      { value: 'audit', label: 'Audit des réseaux sociaux' },
      { value: 'strategie', label: 'Stratégie de contenu' },
      { value: 'creation_contenu', label: 'Création de contenu (visuels, textes)' },
      { value: 'montage_video', label: 'Montage vidéo / Reels' },
      { value: 'publication', label: 'Publication / Planification' },
      { value: 'management', label: 'Management du compte (modération, DM, engagement)' },
      { value: 'reporting', label: 'Reporting mensuel' },
      { value: 'coaching', label: 'Coaching / Formation du client' },
      { value: 'suivi', label: 'Suivi personnalisé (appels, messages)' },
      { value: 'direction_artistique', label: 'Direction artistique' },
      { value: 'pub', label: 'Gestion de publicité (Meta Ads...)' },
      { value: 'copywriting', label: 'Copywriting avancé' },
      { value: 'tunnel', label: 'Création de tunnel de vente' }
    ],
    multiple: true,
    required: true
  },
  {
    id: 'cible_clients',
    section: 'offre',
    type: 'multiple',
    question: 'Quelle est ta cible de clients ?',
    options: [
      { value: 'independants', label: 'Indépendants / Solopreneurs' },
      { value: 'petits_business', label: 'Petits business locaux' },
      { value: 'pme', label: 'PME' },
      { value: 'ecommerce', label: 'E-commerce' },
      { value: 'startups', label: 'Startups' },
      { value: 'grandes_entreprises', label: 'Grandes entreprises' },
      { value: 'influenceurs', label: 'Influenceurs / Créateurs de contenu' }
    ],
    multiple: true,
    required: true
  },

  // ============================================
  // SECTION D: TRANSFORMATION APPORTÉE (CRUCIAL)
  // ============================================
  {
    id: 'niveau_transformation',
    section: 'transformation',
    sectionTitle: 'Transformation Apportée',
    type: 'radio',
    question: 'Quel niveau de transformation apportes-tu à tes clients ?',
    options: [
      {
        value: 'faible',
        label: 'Faible',
        description: 'Présence basique sur les réseaux, vitrine sans stratégie ni résultats concrets'
      },
      {
        value: 'moyenne',
        label: 'Moyenne',
        description: 'Amélioration visible de la présence, gain de temps pour le client, début de résultats'
      },
      {
        value: 'forte',
        label: 'Forte',
        description: 'Vraie transformation business : visibilité, clients générés, CA en hausse, gain de temps majeur'
      }
    ],
    required: true
  },
  {
    id: 'description_transformation',
    section: 'transformation',
    type: 'textarea',
    question: 'Décris la transformation que tu apportes à tes clients (avant/après)',
    placeholder: 'Ex: Avant → le client galère sur les réseaux, pas de visibilité, perd du temps à poster dans le vide.\nAprès → + de temps pour sa zone de génie, + de visibilité qui génère des clients et donc du CA.',
    required: false,
    helpText: 'Cette description t\'aidera à formuler ton argumentaire de prix.'
  },

  // ============================================
  // SECTION E: LES 4 PILIERS DU PRICING (Méthode FA)
  // ============================================
  {
    id: 'temps_par_client',
    section: 'piliers',
    sectionTitle: 'Les 4 Piliers du Pricing',
    type: 'dropdown',
    question: 'Combien de temps un client te prend par mois environ ?',
    options: [
      { value: '5-10', label: '5 à 10 heures' },
      { value: '10-15', label: '10 à 15 heures' },
      { value: '15-20', label: '15 à 20 heures' },
      { value: '20-30', label: '20 à 30 heures' },
      { value: '30-40', label: '30 à 40 heures' },
      { value: '40+', label: 'Plus de 40 heures' }
    ],
    required: true,
    helpText: 'Inclus : création, publication, suivi, calls, reporting...'
  },
  {
    id: 'objectif_mensuel_net',
    section: 'piliers',
    type: 'number',
    question: 'Combien veux-tu gagner NET par mois ?',
    min: 500,
    max: 15000,
    unit: '€',
    required: true,
    helpText: 'Ton objectif de revenu après charges (URSSAF ~27%).'
  },
  {
    id: 'nombre_clients_max',
    section: 'piliers',
    type: 'dropdown',
    question: 'Combien de clients peux-tu gérer maximum par mois ?',
    options: [
      { value: '1', label: '1 client' },
      { value: '2', label: '2 clients' },
      { value: '3', label: '3 clients' },
      { value: '4', label: '4 clients' },
      { value: '5', label: '5 clients' },
      { value: '6+', label: '6 clients ou plus' }
    ],
    required: true,
    helpText: 'Sois réaliste pour éviter la surcharge mentale.'
  },
  {
    id: 'zone_geographique',
    section: 'piliers',
    type: 'dropdown',
    question: 'Quelle est ta zone géographique de travail ?',
    options: [
      { value: 'province', label: 'Province / Petite ville' },
      { value: 'grande_ville', label: 'Grande ville (hors Paris)' },
      { value: 'paris_idf', label: 'Paris / Île-de-France' },
      { value: 'remote', label: '100% Remote (clients partout en France)' }
    ],
    required: true,
    helpText: 'La zone géographique peut influencer les tarifs pratiqués.'
  }
];

// Configuration des sections pour l'affichage
export const sections = [
  {
    id: 'experience',
    title: 'Expérience & Crédibilité',
    description: 'Ces informations nous permettent de comprendre ton parcours et ton niveau d\'expertise.'
  },
  {
    id: 'resultats',
    title: 'Résultats & Preuve Sociale',
    description: 'La preuve sociale est un facteur clé pour justifier tes tarifs.'
  },
  {
    id: 'offre',
    title: 'Ton Offre',
    description: 'Détaille les services que tu proposes à tes clients.'
  },
  {
    id: 'transformation',
    title: 'Transformation Apportée',
    description: 'Décris l\'impact que tu as sur le business de tes clients.'
  },
  {
    id: 'piliers',
    title: 'Les 4 Piliers du Pricing',
    description: 'Ces éléments permettent de calculer ton prix plancher et ton objectif.'
  }
];
