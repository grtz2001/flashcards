// Helpers for checking a user's guess against the correct answer.

// Make two strings comparable by ignoring case, accents, punctuation, etc.
function normalize(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD') // split accented letters into letter + accent mark
    .replace(/[̀-ͯ]/g, '') // remove the accent marks (días -> dias)
    .replace(/[^a-z0-9 ]/g, '') // remove punctuation (¿, ?, !, ., etc.)
    .replace(/\b(el|la|los|las|un|una)\b/g, '') // ignore articles
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim()
}

// Check if the user's guess is correct, allowing for some flexibility.
export function checkAnswer(guess, answer) {
  const g = normalize(guess)
  const a = normalize(answer)

  if (!g) return false // empty guess is never correct
  if (g === a) return true // exact match

  // Partial match: the guess is a real chunk of the answer. should be at least 3 chars
  return g.length >= 3 && a.includes(g)
}
