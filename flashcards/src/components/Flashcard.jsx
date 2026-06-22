// my flashcard component
function Flashcard({ front, back, flipped, onFlip, canFlip }) {
  return (
    <div
      className={`flashcard${flipped ? ' is-flipped' : ''}${
        canFlip ? '' : ' is-locked'
      }`}
      onClick={canFlip ? onFlip : undefined}
    >
      <div className="flashcard-inner">
        <div className="card-face card-front">
          <div className="front-word">{front}</div>
          <div className="flip-hint">
            {canFlip ? 'tap to flip' : 'submit a guess to flip'}
          </div>
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
