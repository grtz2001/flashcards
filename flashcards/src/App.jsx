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
            {idx + 1} / {cards.length}
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
          onNext={() => go(1)}
        />
      </div>
    </div>
  )
}

export default App
