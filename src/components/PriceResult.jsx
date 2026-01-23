import React from 'react';
import { formatPrix } from '../utils/pricingCalculator';

function PriceResult({ result }) {
  if (!result) return null;

  return (
    <div className="price-result">
      <h2 className="result-title">Ton Pricing Recommande</h2>

      {/* Fourchette de prix */}
      <div className="price-cards">
        <div className="price-card minimum">
          <span className="price-label">Prix minimum</span>
          <span className="price-sublabel">(seuil de refus)</span>
          <span className="price-value">{formatPrix(result.prixMinimum)}</span>
        </div>

        <div className="price-card ideal">
          <span className="price-label">Prix ideal</span>
          <span className="price-sublabel">(aligne FA)</span>
          <span className="price-value">{formatPrix(result.prixIdeal)}</span>
        </div>

        <div className="price-card ambitieux">
          <span className="price-label">Prix rêvé</span>
          <span className="price-sublabel">(ton objectif)</span>
          <span className="price-value">{formatPrix(result.prixReve)}</span>
        </div>
      </div>

      {/* Prix recommandé */}
      <div className="recommended-price">
        <span className="recommended-label">Prix recommande a communiquer</span>
        <span className="recommended-value">{formatPrix(result.prixRecommande)}/mois</span>
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
          <span>Prix plancher (temps x taux horaire)</span>
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
