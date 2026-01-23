# Generateur de Prix CM - Methode Freelance Academy

## Description du projet

Application web React permettant aux Community Managers freelances en France de calculer leur prix mensuel de maniere professionnelle, alignee et assumee, selon la methode Freelance Academy.

## Philosophie du projet

- **On vend une TRANSFORMATION, pas des heures ni des taches**
- Une offre mensuelle transformationnelle complete ne peut JAMAIS etre pricee en dessous de 750EUR
- Le prix n'est PAS calcule en fonction du nombre de posts
- L'objectif est d'eviter la sous-evaluation chronique des CM

## Structure du projet

```
src/
├── components/
│   ├── Question.jsx          # Composant generique pour tous types de questions
│   ├── QuestionnaireForm.jsx # Formulaire principal avec navigation multi-etapes
│   └── PriceResult.jsx       # Affichage des resultats de pricing
├── data/
│   ├── questions.js          # Structure des 15 questions (5 sections)
│   └── pricingConfig.js      # Configuration: regles FA, multiplicateurs, alertes
├── utils/
│   └── pricingCalculator.js  # Algorithme de calcul du pricing
├── App.jsx                   # Composant racine
└── App.css                   # Styles globaux
```

## Les 5 sections du questionnaire

1. **Experience & Credibilite**
   - Niveau d'experience (debutante/intermediaire/experte)
   - Nombre de clients accompagnes
   - Background/formations
   - Type d'experience professionnelle

2. **Resultats & Preuve Sociale**
   - Resultats mesurables obtenus (croissance, temoignages, etudes de cas...)

3. **Ton Offre**
   - Services inclus (audit, strategie, creation, publication, management...)
   - Type d'offre (complete, partielle, specifique)
   - Cible clients

4. **Transformation Apportee** (CRUCIAL)
   - Niveau de transformation (faible/moyenne/forte)
   - Description avant/apres

5. **Les 4 Piliers du Pricing**
   - Temps passe par client
   - Taux horaire souhaite
   - Objectif mensuel net
   - Nombre de clients max
   - Zone geographique

## Algorithme de pricing

### Calculs de base
- **Prix plancher** = Temps par client x Taux horaire
- **Prix objectif** = (Objectif net / (1 - 0.27)) / Nombre de clients
  - 0.27 = taux URSSAF pour auto-entrepreneur

### Fourchettes marche France
- Entree de gamme: 750EUR - 950EUR
- Moyenne marche: 950EUR - 1200EUR
- Premium: 1300EUR - 1500EUR
- Expert/360: 1500EUR+ (cas exceptionnels)

### Multiplicateurs appliques
- Experience: debutante (1.0), intermediaire (1.15), experte (1.35)
- Preuve sociale: faible (1.0), moyenne (1.1), forte (1.2)
- Transformation: faible (0.9), moyenne (1.0), forte (1.25)
- Zone geo: province (0.9), grande ville (1.0), Paris/IDF (1.15)
- Cible clients: independants (0.9) -> grandes entreprises (1.3)

### Regles non negociables
- Offre complete = minimum 750EUR
- Offre partielle/specifique = peut etre < 750EUR
- Ne jamais depasser 1500EUR sauf cas expert avance avec offre 360

## Format de sortie

1. **Fourchette de prix**
   - Prix minimum (seuil de refus)
   - Prix ideal (aligne FA)
   - Prix ambitieux (realiste aujourd'hui)

2. **Prix recommande a communiquer**

3. **Justifications** (obligatoires)
   - Niveau d'experience
   - Type d'offre et transformation
   - References marche
   - Respect du prix plancher

4. **Alertes pedagogiques** (si necessaire)
   - Sous-evaluation detectee
   - Confusion objectif/prix
   - Decalage posture/ambition
   - Risque de surcharge mentale

5. **Phrase d'annonce** orientee transformation

## Commandes

```bash
# Installation
npm install

# Developpement
npm run dev

# Build production
npm run build
```

## Technologies

- React 18
- Vite
- CSS vanilla (variables CSS, flexbox, grid)

## Documents de reference

Les regles de pricing sont basees sur :
1. **Methode FA prix.pdf** - Les 4 piliers du pricing
2. **GENERATEUR PRIX POUR COMMUNITY MANAGER.pdf** - Regles specifiques CM

## Evolutions futures possibles

- [ ] Scraping des offres CM du marche pour affiner les fourchettes
- [ ] Base de donnees des formations/offres concurrentes
- [ ] Export PDF du resultat
- [ ] Historique des calculs
- [ ] Mode multi-secteurs (pas que CM)
