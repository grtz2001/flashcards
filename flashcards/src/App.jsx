import { useState } from 'react'
import { cards } from './data/cards'
import Flashcard from './components/Flashcard'
import Controls from './components/Controls'
import GuessInput from './components/GuessInput'
import { checkAnswer } from './utils/checkAnswer'
import './App.css'

function App() {
  // The deck lives in state so the Shuffle button can reorder it.
  // It starts in the original sequence from cards.js.
  const [deck, setDeck] = useState(cards)
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [guess, setGuess] = useState('') // what the user typed
  const [result, setResult] = useState(null) // null | 'correct' | 'incorrect'

  const card = deck[idx]

  // The card can only be flipped once the user has submitted a guess.
  const canFlip = result !== null

  // A fresh card always starts unflipped with no guess/feedback.
  const resetForNewCard = () => {
    setFlipped(false)
    setGuess('')
    setResult(null)
  }

  // Move through the ordered deck. No wrap-around: stay put at the ends.
  const go = (dir) => {
    setIdx((i) => {
      const n = i + dir
      if (n < 0 || n >= deck.length) return i
      return n
    })
    resetForNewCard()
  }

  // Shuffle the whole deck into a random order, then start again from the first card of the new sequence.
  const shuffleDeck = () => {
    setDeck((prev) => {
      const shuffled = [...prev]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    })
    setIdx(0)
    resetForNewCard()
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
            {idx + 1} / {deck.length}
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
          disableNext={idx === deck.length - 1}
          disableFlip={!canFlip}
        />

        <button className="random-btn" onClick={shuffleDeck}>
          Shuffle
        </button>
      </div>
    </div>
  )
}

export default App
