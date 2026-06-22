import { useState } from 'react'
import { cards } from './data/cards'
import Flashcard from './components/Flashcard'
import Controls from './components/Controls'
import GuessInput from './components/GuessInput'
import { checkAnswer } from './utils/checkAnswer'
import './App.css'

function App() {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [guess, setGuess] = useState('') // what the user typed
  const [result, setResult] = useState(null) // null | 'correct' | 'incorrect'

  const card = cards[idx]

  // The card can only be flipped once the user has submitted a guess.
  const canFlip = result !== null

  // Move through the ordered deck. No wrap-around: stay put at the ends.
  const go = (dir) => {
    setIdx((i) => {
      const n = i + dir
      if (n < 0 || n >= cards.length) return i
      return n
    })
    // fresh card -> clear the flip and any previous guess/feedback
    setFlipped(false)
    setGuess('')
    setResult(null)
  }

  // Update the input and clear old feedback while the user retypes.
  const handleGuessChange = (text) => {
    setGuess(text)
    setResult(null)
  }

  // Check the guess against the card's Spanish answer.
  const handleSubmit = () => {
    if (!guess.trim()) return
    setResult(checkAnswer(guess, card.es) ? 'correct' : 'incorrect')
  }

  return (
    <div className="page">
      <header className="header">
        {/* this is my title of card set */}
        <h1 className="title">Spanish Practice</h1>
        {/* this is a description */}
        <div className="description">A website for learning Spanish</div> 
      </header>

      <div className="card-panel">
        <div className="panel-top">
          <div className="panel-title">Study time</div>
          <div className="counter">
            total: {cards.length}
          </div>
        </div>

        <div className="category">{card.cat}</div>

        <Flashcard
          front={card.en}
          back={card.es}
          flipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          canFlip={canFlip}
        />

        <GuessInput
          value={guess}
          onChange={handleGuessChange}
          onSubmit={handleSubmit}
          result={result}
        />

        <Controls
          onPrev={() => go(-1)}
          onFlip={() => setFlipped((f) => !f)}
          onNext={() => go(1)}
          disablePrev={idx === 0}
          disableNext={idx === cards.length - 1}
          disableFlip={!canFlip}
        />
      </div>
    </div>
  )
}

export default App
