export function initTypewriter(elementId) {
  const el = document.getElementById(elementId)
  if (!el) return

  const words = [
    'Cybersecurity Engineer',
    'Full-Stack Developer',
    'AI/ML Enthusiast',
    'Network Security Specialist'
  ]

  let wordIndex = 0
  let charIndex = 0
  let deleting = false
  let paused = false

  function type() {
    const current = words[wordIndex]

    if (paused) {
      paused = false
      setTimeout(type, 1200)
      return
    }

    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1)
      charIndex++
      if (charIndex === current.length) {
        paused = true
        deleting = true
        setTimeout(type, 80)
        return
      }
      setTimeout(type, 80)
    } else {
      el.textContent = current.slice(0, charIndex - 1)
      charIndex--
      if (charIndex === 0) {
        deleting = false
        wordIndex = (wordIndex + 1) % words.length
      }
      setTimeout(type, 45)
    }
  }

  setTimeout(type, 1800)
}
