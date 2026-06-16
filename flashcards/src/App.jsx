import { useState } from 'react'
import { cards } from './data/cards'
import Flashcard from './components/Flashcard'
import Controls from './components/Controls'
import './App.css'

function App() {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const go = (dir) => {
    setIdx((i) => (i + dir + cards.length) % cards.length)
    setFlipped(false)
  }

  // next card random
  const nextRandom = () => {
    setIdx((i) => {
      if (cards.length < 2) return i
      // pick a random card, but never the one we're already on
      let r = Math.floor(Math.random() * (cards.length - 1))
      if (r >= i) r += 1
      return r
    })
    setFlipped(false)
  }

  const card = cards[idx]

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
        />

        <Controls
          onPrev={() => go(-1)}
          onFlip={() => setFlipped((f) => !f)}
          onNext={nextRandom}
        />
      </div>
    </div>
  )
}

export default App
