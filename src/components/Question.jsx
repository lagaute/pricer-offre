import React from 'react';

function Question({ question, value, onChange }) {
  const handleChange = (newValue) => {
    onChange(question.id, newValue);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'dropdown':
        return (
          <select
            className="dropdown-select"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option value="">-- Sélectionne une option --</option>
            {question.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="options-container">
            {question.options.map((opt) => (
              <label key={opt.value} className={`option-label radio ${value === opt.value ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={question.id}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-text">{opt.label}</span>
                  {opt.description && (
                    <span className="option-description">{opt.description}</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      case 'multiple':
        const selectedValues = value || [];
        return (
          <div className="options-container">
            {question.options.map((opt) => (
              <label
                key={opt.value}
                className={`option-label checkbox ${selectedValues.includes(opt.value) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={selectedValues.includes(opt.value)}
                  onChange={(e) => {
                    let newValues;
                    if (e.target.checked) {
                      // Si on sélectionne "aucun", désélectionner les autres
                      if (opt.value === 'aucun') {
                        newValues = ['aucun'];
                      } else {
                        // Sinon, enlever "aucun" si présent et ajouter la nouvelle valeur
                        newValues = [...selectedValues.filter(v => v !== 'aucun'), opt.value];
                      }
                    } else {
                      newValues = selectedValues.filter((v) => v !== opt.value);
                    }
                    handleChange(newValues);
                  }}
                />
                <span className="option-text">{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <div className="number-input-container">
            <input
              type="number"
              className="number-input"
              value={value || ''}
              min={question.min}
              max={question.max}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={`${question.min} - ${question.max}`}
            />
            {question.unit && <span className="number-unit">{question.unit}</span>}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            className="textarea-input"
            value={value || ''}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={question.placeholder || ''}
            rows={4}
          />
        );

      case 'benchmark': {
        const benchmarkValue = value || {};
        const fait = benchmarkValue.fait;

        const updateBenchmark = (key, val) => {
          handleChange({ ...benchmarkValue, [key]: val });
        };

        return (
          <div className="benchmark-container">
            <div className="benchmark-toggle">
              <label className={`option-label radio ${fait === true ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={question.id}
                  checked={fait === true}
                  onChange={() => updateBenchmark('fait', true)}
                />
                <span className="option-text">Oui</span>
              </label>
              <label className={`option-label radio ${fait === false ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={question.id}
                  checked={fait === false}
                  onChange={() => updateBenchmark('fait', false)}
                />
                <span className="option-text">Non</span>
              </label>
            </div>

            {fait === true && (
              <div className="benchmark-fields">
                <div className="benchmark-field">
                  <label className="benchmark-field-label">Entrée de gamme</label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      className="number-input"
                      value={benchmarkValue.entreeDeGamme || ''}
                      min={0}
                      onChange={(e) => updateBenchmark('entreeDeGamme', e.target.value)}
                      placeholder="ex: 750"
                    />
                    <span className="number-unit">€</span>
                  </div>
                </div>
                <div className="benchmark-field">
                  <label className="benchmark-field-label">Intermédiaire</label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      className="number-input"
                      value={benchmarkValue.intermediaire || ''}
                      min={0}
                      onChange={(e) => updateBenchmark('intermediaire', e.target.value)}
                      placeholder="ex: 1100"
                    />
                    <span className="number-unit">€</span>
                  </div>
                </div>
                <div className="benchmark-field">
                  <label className="benchmark-field-label">Premium</label>
                  <div className="number-input-container">
                    <input
                      type="number"
                      className="number-input"
                      value={benchmarkValue.premium || ''}
                      min={0}
                      onChange={(e) => updateBenchmark('premium', e.target.value)}
                      placeholder="ex: 1400"
                    />
                    <span className="number-unit">€</span>
                  </div>
                </div>
              </div>
            )}

            {fait === false && (
              <p className="benchmark-recommandation">
                <em>Un benchmark est recommandé pour avoir un pricer le plus précis possible.</em>
              </p>
            )}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="question-container">
      <label className="question-label">
        {question.question}
        {question.required && <span className="required">*</span>}
      </label>
      {question.helpText && (
        <p className="question-help">{question.helpText}</p>
      )}
      {renderInput()}
    </div>
  );
}

export default Question;
