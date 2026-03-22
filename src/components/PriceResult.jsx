import React from 'react';
import { formatPrix } from '../utils/pricingCalculator';

function calculerRange(prix) {
  const bas = Math.floor(prix / 100) * 100;
  const haut = Math.ceil(prix / 100) * 100 + 50;
  return { bas, haut };
}

function PriceResult({ result, userPrices }) {
  if (!result) return null;

  if (result.tarifSurDevis) {
    return (
      <div className="price-result">
        <h2 className="result-title">Ton Pricing Recommande</h2>
        <div className="sur-devis-message">
          <p>La tarification de ce service dépend de la prestation proposée au client.</p>
          <ul>
            <li>Nombre de vidéos incluses</li>
            <li>Type de vidéos (Reels, YouTube, Stories…)</li>
            <li>Durée et complexité du montage</li>
            <li>Heures de tournage si applicable</li>
          </ul>
          <p>Construis un devis personnalisé selon ces critères.</p>
        </div>
      </div>
    );
  }

  const range = calculerRange(result.prixRecommande);

  const prixMiniUser = parseInt(userPrices?.prix_mini_utilisateur) || 500;
  const prixIdealUser = parseInt(userPrices?.prix_ideal_utilisateur) || 800;
  const prixAmbitieuxUser = parseInt(userPrices?.prix_ambitieux_utilisateur) || 1200;

  const minPrice = Math.min(prixMiniUser, prixIdealUser, prixAmbitieuxUser);
  const maxPrice = Math.max(prixMiniUser, prixIdealUser, prixAmbitieuxUser);
  const midPrice = prixIdealUser;

  const idealMarkerPosition = maxPrice > minPrice
    ? ((midPrice - minPrice) / (maxPrice - minPrice)) * 100
    : 50;

  const prixCalcule = result.prixRecommande;
  const cursorPosition = prixCalcule <= minPrice ? 0
    : prixCalcule >= maxPrice ? 100
    : ((prixCalcule - minPrice) / (maxPrice - minPrice)) * 100;

  const positionMessage = prixCalcule < minPrice
    ? { text: 'En dessous de ton minimum', color: '#e53e3e' }
    : prixCalcule < midPrice
    ? { text: 'Entre ton minimum et ton idéal', color: '#ed8936' }
    : prixCalcule < maxPrice
    ? { text: 'Entre ton idéal et ton ambitieux', color: '#48bb78' }
    : { text: 'Au-dessus de ton prix ambitieux !', color: '#38a169' };

  return (
    <div className="price-result">

      {/* Prix recommandé */}
      <div className="recommended-price">
        <span className="recommended-label">Fourchette recommandée</span>
        <p className="recommended-value">{formatPrix(range.bas)} — {formatPrix(range.haut)}<span className="recommended-unit">/mois</span></p>
      </div>

      {result.objectifCA && (
        <p className="clients-objectif">Pour atteindre ton objectif de {formatPrix(result.objectifCA)}/mois → <strong>{result.clientsNecessaires} client{result.clientsNecessaires > 1 ? 's' : ''}</strong></p>
      )}

      {/* Curseur de positionnement */}
      <div className="price-slider-section">
        <h3>Où se situe ton prix calculé ?</h3>
        <div className="price-slider-container">
          <div className="price-slider-track">
            <div className="price-marker mini" style={{ left: '0%' }}>
              <span className="marker-line"></span>
              <span className="marker-label">Mini</span>
              <span className="marker-value">{formatPrix(minPrice)}</span>
            </div>
            <div className="price-marker ideal" style={{ left: `${idealMarkerPosition}%` }}>
              <span className="marker-line"></span>
              <span className="marker-label">Idéal</span>
              <span className="marker-value">{formatPrix(midPrice)}</span>
            </div>
            <div className="price-marker ambitieux" style={{ left: '100%' }}>
              <span className="marker-line"></span>
              <span className="marker-label">Ambitieux</span>
              <span className="marker-value">{formatPrix(maxPrice)}</span>
            </div>
            <div
              className="price-cursor"
              style={{ left: `${Math.min(Math.max(cursorPosition, 0), 100)}%`, backgroundColor: positionMessage.color }}
            >
              <span className="cursor-value">{formatPrix(Math.round(result.prixRecommande / 10) * 10)}</span>
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

      {/* Phrase d'annonce */}
      <div className="phrase-section">
        <h3>Reminder ♡</h3>
        <blockquote className="phrase-annonce">
          Le client ne paie pas une prestation parmi tant d'autres, il paie la transformation business que tu lui apportes.
        </blockquote>
      </div>

    </div>
  );
}

export default PriceResult;
