function Flashcard({ front, back, flipped, onFlip }) {
  return (
    <div
      className={`flashcard${flipped ? ' is-flipped' : ''}`}
      onClick={onFlip}
    >
      <div className="flashcard-inner">
        <div className="card-face card-front">
          <div className="front-word">{front}</div>
          <div className="flip-hint">tap to flip</div>
        </div>
        <div className="card-face card-back">
          <div className="back-label">Español</div>
          <div className="back-word">{back}</div>
        </div>
      </div>
    </div>
  )
}

export default Flashcard
