export function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]')

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -22
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-8px)`
      const glow = card.querySelector('.card-glow')
      if (glow) {
        const px = ((e.clientX - rect.left) / rect.width) * 100
        const py = ((e.clientY - rect.top) / rect.height) * 100
        glow.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(14,165,233,0.18), transparent 60%)`
      }
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)'
      const glow = card.querySelector('.card-glow')
      if (glow) glow.style.background = 'none'
    })
  })
}
