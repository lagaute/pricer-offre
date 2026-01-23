// Calculateur de pricing - Méthode Freelance Academy
import {
  pricingRules,
  multiplicateursExperience,
  multiplicateursClientsPassés,
  multiplicateursTransformation,
  multiplicateursZone,
  multiplicateursCible,
  servicesValeur,
  alertes
} from '../data/pricingConfig';

/**
 * Convertit l'intervalle de temps en valeur moyenne
 */
export function getTempsParClientMoyen(intervalle) {
  const mapping = {
    '5-10': 7.5,
    '10-15': 12.5,
    '15-20': 17.5,
    '20-30': 25,
    '30-40': 35,
    '40+': 45
  };
  return mapping[intervalle] || 20;
}

/**
 * Qualifie automatiquement le type d'offre basé sur les services
 */
export function qualifierOffre(services) {
  if (!services || services.length === 0) return 'specifique';

  // Services clés pour une offre complète
  const servicesComplets = ['strategie', 'creation_contenu', 'publication', 'management', 'reporting'];
  const servicesPresents = servicesComplets.filter(s => services.includes(s));

  if (servicesPresents.length >= 4) return 'complete';
  if (servicesPresents.length >= 2) return 'partielle';
  return 'specifique';
}

/**
 * Calcule le prix minimum pour atteindre l'objectif financier
 * Prend en compte les charges URSSAF (~27%)
 */
export function calculerPrixObjectif(objectifNet, nombreClientsMax) {
  const nbClients = nombreClientsMax === '6+' ? 6 : parseInt(nombreClientsMax);
  // Objectif brut = Objectif net / (1 - taux URSSAF)
  const objectifBrut = objectifNet / (1 - pricingRules.TAUX_URSSAF);
  return Math.round(objectifBrut / nbClients);
}

/**
 * Évalue le niveau de preuve sociale basé sur les résultats
 */
export function evaluerPreuveSociale(resultats) {
  if (!resultats || resultats.includes('aucun')) return 'aucun';
  const nbResultats = resultats.filter(r => r !== 'aucun').length;
  if (nbResultats >= 5) return 'forte';
  if (nbResultats >= 3) return 'moyenne';
  return 'faible';
}

/**
 * Calcule la valeur ajoutée des services inclus
 */
export function calculerValeurServices(services) {
  if (!services || services.length === 0) return 0;
  return services.reduce((total, service) => {
    return total + (servicesValeur[service] || 0);
  }, 0);
}

/**
 * Détermine le meilleur multiplicateur de cible
 */
export function getMultiplicateurCible(cibles) {
  if (!cibles || cibles.length === 0) return 1.0;
  const multiplicateurs = cibles.map(c => multiplicateursCible[c] || 1.0);
  return Math.max(...multiplicateurs);
}

/**
 * Identifie la zone de marché appropriée
 */
export function identifierZoneMarche(typeOffre, niveauExperience, transformation) {
  const { fourchettesMarche } = pricingRules;

  // Offre partielle ou spécifique = peut être sous le minimum
  if (typeOffre === 'specifique') {
    return { min: 300, max: 600, label: 'Mission spécifique' };
  }
  if (typeOffre === 'partielle') {
    return { min: 450, max: 800, label: 'Offre partielle' };
  }

  // Offre complète - maximum 1500€
  if (niveauExperience === 'experte' || transformation === 'forte') {
    return fourchettesMarche.premium;
  }
  if (niveauExperience === 'intermediaire' || transformation === 'moyenne') {
    return fourchettesMarche.moyenne;
  }
  return fourchettesMarche.entreeDeGamme;
}

/**
 * Calcul principal du pricing - Algorithme complet
 */
export function calculerPricing(answers) {
  const resultat = {
    prixPlancher: 0,
    prixObjectif: 0,
    prixMinimum: 0,
    prixIdeal: 0,
    prixReve: 0,
    prixRecommande: 0,
    zoneMarche: null,
    typeOffreCalcule: '',
    alertes: [],
    justifications: [],
    phraseAnnonce: ''
  };

  // 1. Qualifier automatiquement le type d'offre
  const typeOffre = qualifierOffre(answers.services_inclus);
  resultat.typeOffreCalcule = typeOffre;

  // 2. Prix objectif (basé sur objectif financier)
  const objectifNet = parseInt(answers.objectif_mensuel_net) || 2000;
  const nombreClientsMax = answers.nombre_clients_max || '3';
  resultat.prixObjectif = calculerPrixObjectif(objectifNet, nombreClientsMax);

  // 3. Calculer le prix plancher basé sur le temps (avec taux horaire moyen de 45€)
  const tempsParClient = getTempsParClientMoyen(answers.temps_par_client);
  const tauxHoraireMoyen = 45; // Taux horaire moyen CM France
  resultat.prixPlancher = Math.round(tempsParClient * tauxHoraireMoyen);

  // 4. Identifier la zone de marché
  const niveauExperience = answers.niveau_experience || 'debutante';
  const transformation = answers.niveau_transformation || 'moyenne';
  resultat.zoneMarche = identifierZoneMarche(typeOffre, niveauExperience, transformation);

  // 5. Calculer le prix de base avec multiplicateurs
  let prixBase = resultat.zoneMarche.min;

  // Multiplicateur expérience
  prixBase *= multiplicateursExperience[niveauExperience] || 1.0;

  // Multiplicateur clients passés
  const nombreClients = answers.nombre_clients || 'aucun';
  prixBase *= multiplicateursClientsPassés[nombreClients] || 1.0;

  // Multiplicateur preuve sociale
  const preuveSociale = evaluerPreuveSociale(answers.resultats_mesurables);
  const multiplicateurPS = preuveSociale === 'forte' ? 1.2 :
                           preuveSociale === 'moyenne' ? 1.1 : 1.0;
  prixBase *= multiplicateurPS;

  // Multiplicateur transformation
  prixBase *= multiplicateursTransformation[transformation] || 1.0;

  // Multiplicateur zone géographique
  const zone = answers.zone_geographique || 'remote';
  prixBase *= multiplicateursZone[zone] || 1.0;

  // Multiplicateur cible
  prixBase *= getMultiplicateurCible(answers.cible_clients);

  // Valeur des services (bonus)
  const bonusServices = calculerValeurServices(answers.services_inclus) * 0.1;
  prixBase += bonusServices;

  // 6. Calculer les 3 prix
  resultat.prixMinimum = Math.round(Math.max(
    resultat.prixPlancher,
    resultat.prixObjectif * 0.8,
    typeOffre === 'complete' ? pricingRules.MINIMUM_OFFRE_COMPLETE : 300
  ));

  resultat.prixIdeal = Math.round(prixBase);
  resultat.prixReve = Math.round(prixBase * 1.25);

  // 7. Plafonner tous les prix à 1500€ maximum
  const PRIX_MAX = pricingRules.MAXIMUM_PRIX;
  resultat.prixMinimum = Math.min(resultat.prixMinimum, PRIX_MAX);
  resultat.prixIdeal = Math.min(resultat.prixIdeal, PRIX_MAX);
  resultat.prixReve = Math.min(resultat.prixReve, PRIX_MAX);

  // Assurer que prix minimum < prix idéal < prix rêvé
  resultat.prixIdeal = Math.max(resultat.prixIdeal, resultat.prixMinimum);
  resultat.prixReve = Math.max(resultat.prixReve, resultat.prixIdeal);

  // 8. Prix recommandé (juste milieu entre idéal et rêvé)
  resultat.prixRecommande = Math.round((resultat.prixIdeal + resultat.prixReve) / 2);
  resultat.prixRecommande = Math.min(resultat.prixRecommande, PRIX_MAX);

  // 9. Vérifications et alertes
  // Offre complète sous 750€
  if (typeOffre === 'complete' && resultat.prixRecommande < pricingRules.MINIMUM_OFFRE_COMPLETE) {
    resultat.prixMinimum = pricingRules.MINIMUM_OFFRE_COMPLETE;
    resultat.prixIdeal = Math.max(resultat.prixIdeal, pricingRules.MINIMUM_OFFRE_COMPLETE);
    resultat.prixRecommande = Math.max(resultat.prixRecommande, pricingRules.MINIMUM_OFFRE_COMPLETE);
    resultat.alertes.push(alertes.offreCompleteSous750);
  }

  // Sous-évaluation
  if (resultat.prixRecommande < resultat.prixPlancher) {
    resultat.alertes.push(alertes.sousEvaluation);
  }

  // Risque de surcharge
  const nbClients = nombreClientsMax === '6+' ? 6 : parseInt(nombreClientsMax);
  if (nbClients >= 5 && tempsParClient >= 25) {
    resultat.alertes.push(alertes.surcharge);
  }

  // Décalage posture
  if (niveauExperience === 'debutante' && resultat.prixRecommande > 1200) {
    resultat.alertes.push(alertes.decalagePosture);
  }

  // 10. Justifications
  resultat.justifications = genererJustifications(answers, resultat, typeOffre);

  // 11. Phrase d'annonce
  resultat.phraseAnnonce = genererPhraseAnnonce(transformation, answers.description_transformation);

  return resultat;
}

/**
 * Génère les justifications du prix
 */
function genererJustifications(answers, resultat, typeOffre) {
  const justifications = [];

  // Niveau d'expérience
  const niveauLabels = {
    debutante: 'débutante',
    intermediaire: 'intermédiaire',
    experte: 'experte'
  };
  justifications.push(
    `Ton niveau d'expérience (${niveauLabels[answers.niveau_experience] || 'non précisé'}) justifie ce positionnement.`
  );

  // Type d'offre qualifié automatiquement et transformation
  const typeLabels = {
    complete: 'complète (accompagnement 360°)',
    partielle: 'partielle (plusieurs services clés)',
    specifique: 'spécifique (mission ciblée)'
  };
  const transfoLabels = {
    faible: 'faible',
    moyenne: 'moyenne',
    forte: 'forte'
  };
  justifications.push(
    `Ton offre est qualifiée comme ${typeLabels[typeOffre] || 'non précisée'} avec une transformation ${transfoLabels[answers.niveau_transformation] || 'non précisée'}.`
  );

  // Marché
  justifications.push(
    `Le marché français pratique cette fourchette (${resultat.zoneMarche.label}: ${resultat.zoneMarche.min}€ - ${resultat.zoneMarche.max}€).`
  );

  // Prix plancher
  justifications.push(
    `Ce prix respecte ton prix plancher estimé (${resultat.prixPlancher}€) basé sur le temps investi.`
  );

  return justifications;
}

/**
 * Génère une phrase d'annonce orientée transformation
 */
function genererPhraseAnnonce(transformation, descriptionCustom) {
  if (descriptionCustom && descriptionCustom.trim().length > 20) {
    return `Tu ne paies pas mes heures de travail, tu paies la transformation de ton business : ${descriptionCustom.trim()}`;
  }

  const phrases = {
    faible: 'Tu ne paies pas mes heures, tu paies une présence professionnelle sur les réseaux qui te représente.',
    moyenne: 'Tu ne paies pas mes heures, tu paies le passage de l\'invisibilité à une vraie présence qui attire tes clients idéaux.',
    forte: 'Tu ne paies pas mes heures, tu paies la transformation complète de ta visibilité en ligne qui génère du CA et te libère du temps pour ta zone de génie.'
  };

  return phrases[transformation] || phrases.moyenne;
}

/**
 * Retourne une citation philosophie FA aléatoire
 */
export function getPhilosophieAleatoire() {
  return philosophieFA[Math.floor(Math.random() * philosophieFA.length)];
}

/**
 * Formate un prix pour l'affichage
 */
export function formatPrix(prix) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(prix);
}
