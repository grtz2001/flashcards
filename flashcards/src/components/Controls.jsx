// my control component
function Controls({
  onPrev,
  onFlip,
  onNext,
  disablePrev,
  disableNext,
  disableFlip,
}) {
  return (
    <div className="controls">
      <button
        className="nav-btn"
        onClick={onPrev}
        disabled={disablePrev}
        aria-label="Previous card"
      >
        ‹
      </button>
      <button className="flip-btn" onClick={onFlip} disabled={disableFlip}>
        Flip
      </button>
      <button
        className="nav-btn"
        onClick={onNext}
        disabled={disableNext}
        aria-label="Next card"
      >
        ›
      </button>
    </div>
  )
}

export default Controls
