import { useState } from 'react'
import './App.css'
import QuestionnaireForm from './components/QuestionnaireForm'

const PASSWORD = import.meta.env.VITE_ACCESS_PASSWORD

function App() {
  const [unlocked, setUnlocked] = useState(
    sessionStorage.getItem('pricer_access') === 'true'
  )
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem('pricer_access', 'true')
      setUnlocked(true)
    } else {
      setError(true)
      setInput('')
    }
  }

  if (!unlocked) {
    return (
      <div className="app">
        <div className="questionnaire-container password-gate">
          <p className="landing-tag">Méthode Freelance Academy</p>
          <h1 className="password-title">Accès privé</h1>
          <p className="password-subtitle">Ce pricer est réservé aux clientes FA.</p>
          <form onSubmit={handleSubmit} className="password-form">
            <input
              type="password"
              className="password-input"
              placeholder="Code d'accès"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false) }}
              autoFocus
            />
            {error && <p className="password-error">Code incorrect, réessaie.</p>}
            <button type="submit" className="btn btn-primary">Accéder</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <QuestionnaireForm />
    </div>
  )
}

export default App
