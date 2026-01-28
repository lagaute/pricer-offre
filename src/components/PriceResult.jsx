import React from 'react';
import { formatPrix } from '../utils/pricingCalculator';

function PriceResult({ result, userPrices }) {
  if (!result) return null;

  // Récupérer les prix de l'utilisateur
  const prixMiniUser = parseInt(userPrices?.prix_mini_utilisateur) || 500;
  const prixIdealUser = parseInt(userPrices?.prix_ideal_utilisateur) || 800;
  const prixAmbitieuxUser = parseInt(userPrices?.prix_ambitieux_utilisateur) || 1200;

  // Calculer la position du curseur (prix calculé par rapport aux prix utilisateur)
  const calculateCursorPosition = () => {
    const prixCalcule = result.prixRecommande;
    const min = prixMiniUser;
    const max = prixAmbitieuxUser;

    if (prixCalcule <= min) return 0;
    if (prixCalcule >= max) return 100;

    return ((prixCalcule - min) / (max - min)) * 100;
  };

  const cursorPosition = calculateCursorPosition();

  // Déterminer le message selon la position
  const getPositionMessage = () => {
    const prixCalcule = result.prixRecommande;
    if (prixCalcule < prixMiniUser) {
      return { text: 'En dessous de ton minimum', color: '#e53e3e' };
    } else if (prixCalcule < prixIdealUser) {
      return { text: 'Entre ton minimum et ton idéal', color: '#ed8936' };
    } else if (prixCalcule < prixAmbitieuxUser) {
      return { text: 'Entre ton idéal et ton ambitieux', color: '#48bb78' };
    } else {
      return { text: 'Au-dessus de ton prix ambitieux !', color: '#38a169' };
    }
  };

  const positionMessage = getPositionMessage();

  return (
    <div className="price-result">
      <h2 className="result-title">Ton Pricing Recommande</h2>

      {/* Prix recommandé */}
      <div className="recommended-price">
        <span className="recommended-label">Prix recommande a communiquer</span>
        <span className="recommended-value">{formatPrix(result.prixRecommande)}/mois</span>
      </div>

      {/* Curseur de positionnement */}
      <div className="price-slider-section">
        <h3>Où se situe ton prix calculé ?</h3>
        <div className="price-slider-container">
          <div className="price-slider-track">
            {/* Marqueurs des prix utilisateur */}
            <div className="price-marker mini" style={{ left: '0%' }}>
              <span className="marker-line"></span>
              <span className="marker-label">Mini</span>
              <span className="marker-value">{formatPrix(prixMiniUser)}</span>
            </div>
            <div className="price-marker ideal" style={{ left: '50%' }}>
              <span className="marker-line"></span>
              <span className="marker-label">Idéal</span>
              <span className="marker-value">{formatPrix(prixIdealUser)}</span>
            </div>
            <div className="price-marker ambitieux" style={{ left: '100%' }}>
              <span className="marker-line"></span>
              <span className="marker-label">Ambitieux</span>
              <span className="marker-value">{formatPrix(prixAmbitieuxUser)}</span>
            </div>

            {/* Curseur du prix calculé */}
            <div
              className="price-cursor"
              style={{
                left: `${Math.min(Math.max(cursorPosition, 0), 100)}%`,
                backgroundColor: positionMessage.color
              }}
            >
              <span className="cursor-value">{formatPrix(result.prixRecommande)}</span>
            </div>
          </div>
        </div>
        <p className="position-message" style={{ color: positionMessage.color }}>
          {positionMessage.text}
        </p>
      </div>

      {/* Alertes */}
      {result.alertes && result.alertes.length > 0 && (
        <div className="alerts-section">
          <h3>Alertes pedagogiques</h3>
          {result.alertes.map((alerte, index) => (
            <div key={index} className={`alert alert-${alerte.type}`}>
              <strong>{alerte.titre}</strong>
              <p>{alerte.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Qualification de l'offre */}
      {result.typeOffreCalcule && (
        <div className="offre-qualification">
          <h3>Qualification de ton offre</h3>
          <p>
            Selon les services que tu proposes, ton offre est qualifiée comme :
            <strong>
              {result.typeOffreCalcule === 'complete' && ' Complète (accompagnement 360°)'}
              {result.typeOffreCalcule === 'partielle' && ' Partielle (plusieurs services clés)'}
              {result.typeOffreCalcule === 'specifique' && ' Spécifique (mission ciblée)'}
            </strong>
          </p>
        </div>
      )}

      {/* Justifications */}
      <div className="justifications-section">
        <h3>Justification</h3>
        <ul className="justifications-list">
          {result.justifications.map((justif, index) => (
            <li key={index}>{justif}</li>
          ))}
        </ul>
      </div>

      {/* Zone de marché */}
      <div className="market-info">
        <h3>Zone de marche</h3>
        <p>
          <strong>{result.zoneMarche.label}</strong> : {formatPrix(result.zoneMarche.min)} - {formatPrix(result.zoneMarche.max)}
        </p>
      </div>

      {/* Calculs détaillés */}
      <div className="calculations-section">
        <h3>Details des calculs</h3>
        <div className="calculation-row">
          <span>Prix plancher (temps estimé)</span>
          <span>{formatPrix(result.prixPlancher)}</span>
        </div>
        <div className="calculation-row">
          <span>Prix minimum pour objectif financier</span>
          <span>{formatPrix(result.prixObjectif)}</span>
        </div>
      </div>

      {/* Phrase d'annonce */}
      <div className="phrase-section">
        <h3>Phrase pour annoncer ton prix</h3>
        <blockquote className="phrase-annonce">
          "{result.phraseAnnonce}"
        </blockquote>
      </div>

    </div>
  );
}

export default PriceResult;
