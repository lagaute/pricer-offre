import React, { useState } from 'react';
import Question from './Question';
import PriceResult from './PriceResult';
import { questions, sections } from '../data/questions';
import { calculerPricing } from '../utils/pricingCalculator';

function QuestionnaireForm() {
  const [showLanding, setShowLanding] = useState(true);
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  if (showLanding) {
    return (
      <div className="questionnaire-container landing-page">
        <div className="landing-content">
          <p className="landing-tag">Méthode Freelance Academy</p>
          <h1 className="landing-title">Le Pricer des<br />Community Managers</h1>
          <p className="landing-description">
            Définis un tarif aligné avec ton expertise et la transformation que tu apportes à tes clients.
          </p>
          <button className="btn btn-primary landing-cta" onClick={() => setShowLanding(false)}>
            Calculer mon prix
          </button>
          <p className="landing-disclaimer">
            * Cet outil a été conçu pour t'aider à te positionner sur tes prix. Il ne remplace pas une vraie stratégie que je te recommande de construire en amont avec la méthodologie de la FA.
          </p>
        </div>
      </div>
    );
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Grouper les questions par section
  const questionsBySection = sections.map((section) => ({
    ...section,
    questions: questions.filter((q) => q.section === section.id)
  }));

  const currentSectionData = questionsBySection[currentSection];

  // Vérifier si la section actuelle est complète
  const isSectionComplete = () => {
    const requiredQuestions = currentSectionData.questions.filter((q) => q.required);
    return requiredQuestions.every((q) => {
      const answer = answers[q.id];
      if (Array.isArray(answer)) {
        return answer.length > 0;
      }
      return answer !== undefined && answer !== '';
    });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Calculer le pricing
      const pricingResult = calculerPricing(answers);
      setResult(pricingResult);
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentSection(0);
    setResult(null);
    setShowResult(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Progress bar
  const progress = showResult
    ? 100
    : ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="questionnaire-container">
      <header className="questionnaire-header">
        <h1 className="title">Generateur de Prix CM</h1>
        <p className="subtitle">Methode Freelance Academy</p>
      </header>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <span className="progress-text">
          {showResult
            ? 'Resultat'
            : `${currentSection + 1} / ${sections.length} - ${currentSectionData.title}`}
        </span>
      </div>

      {showResult ? (
        <>
          <PriceResult result={result} userPrices={answers} />
          <div className="navigation-buttons">
            <button className="btn btn-secondary" onClick={handlePrevious}>
              Modifier mes reponses
            </button>
            <button className="btn btn-primary" onClick={handleRestart}>
              Recommencer
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Section header */}
          <div className="section-header">
            <h2 className="section-title">{currentSectionData.title}</h2>
            <p className="section-description">{currentSectionData.description}</p>
          </div>

          {/* Questions */}
          <form className="questionnaire-form" onSubmit={(e) => e.preventDefault()}>
            {currentSectionData.questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={handleAnswerChange}
              />
            ))}
          </form>

          {/* Navigation */}
          <div className="navigation-buttons">
            {currentSection > 0 && (
              <button className="btn btn-secondary" onClick={handlePrevious}>
                Precedent
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!isSectionComplete()}
            >
              {currentSection === sections.length - 1 ? 'Calculer mon prix' : 'Suivant'}
            </button>
          </div>

          {/* Indicateur de progression */}
          <div className="section-indicators">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`indicator ${index === currentSection ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
                onClick={() => index <= currentSection && setCurrentSection(index)}
                disabled={index > currentSection}
                title={section.title}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionnaireForm;
