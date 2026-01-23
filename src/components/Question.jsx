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
