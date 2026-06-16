function Controls({ onPrev, onFlip, onNext }) {
  return (
    <div className="controls">
      <button className="nav-btn" onClick={onPrev} aria-label="Previous card">
        ‹
      </button>
      <button className="flip-btn" onClick={onFlip}>
        Flip
      </button>
      <button className="nav-btn" onClick={onNext} aria-label="Next card">
        ›
      </button>
    </div>
  )
}

export default Controls
