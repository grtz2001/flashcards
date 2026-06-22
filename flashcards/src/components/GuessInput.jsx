// Lets the user type a Spanish guess and check it before flipping the card.
function GuessInput({ value, onChange, onSubmit, result }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className="guess" onSubmit={handleSubmit}>
      <label className="guess-label" htmlFor="guess-input">
        Your guess (in Spanish)
      </label>

      <div className="guess-row">
        <input
          id="guess-input"
          className={`guess-input${result ? ' is-' + result : ''}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type the Spanish word…"
          autoComplete="off"
        />
        <button type="submit" className="guess-btn">
          Check
        </button>
      </div>

      {result === 'correct' && (
        <div className="feedback feedback-correct">✓ ¡Correcto!</div>
      )}
      {result === 'incorrect' && (
        <div className="feedback feedback-incorrect">✗ Not quite — try again</div>
      )}
    </form>
  )
}

export default GuessInput
