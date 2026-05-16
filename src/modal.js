// src/modal.js
import { projectsData } from './projects.js'
import gsap from 'gsap'

export function initModal() {
  const overlay   = document.getElementById('project-modal')
  const closeBtn  = document.getElementById('modal-close')
  const track     = document.getElementById('slider-track')
  const dotsWrap  = document.getElementById('slider-dots')
  const prevBtn   = document.getElementById('slider-prev')
  const nextBtn   = document.getElementById('slider-next')

  let currentSlide = 0
  let totalSlides  = 0

  // ── Open modal ────────────────────────────────────────────────────────
  function openModal(projectKey) {
    const data = projectsData[projectKey]
    if (!data) return

    // Populate text
    document.getElementById('modal-badge').textContent = data.badge
    document.getElementById('modal-title').textContent = data.title
    document.getElementById('modal-desc').textContent  = data.desc
    document.getElementById('modal-github').href       = data.github
    document.getElementById('modal-live').href         = data.live

    // Tech tags
    const techEl = document.getElementById('modal-tech')
    techEl.innerHTML = data.tech.map(t => `<span class="tag">${t}</span>`).join('')

    // Build slider images
    track.innerHTML  = ''
    dotsWrap.innerHTML = ''
    totalSlides = data.images.length
    currentSlide = 0

    data.images.forEach((src, i) => {
      const img = document.createElement('img')
      img.src = src
      img.alt = `${data.title} screenshot ${i + 1}`
      img.className = 'slider-img'
      img.loading = 'lazy'
      track.appendChild(img)

      const dot = document.createElement('button')
      dot.className = `dot ${i === 0 ? 'active' : ''}`
      dot.setAttribute('aria-label', `Go to image ${i + 1}`)
      dot.addEventListener('click', () => goToSlide(i))
      dotsWrap.appendChild(dot)
    })

    goToSlide(0)

    // Show overlay
    overlay.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'

    gsap.fromTo(overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    )
    gsap.fromTo('.modal-container',
      { y: 60, scale: 0.94, opacity: 0 },
      { y: 0,  scale: 1,    opacity: 1, duration: 0.45, ease: 'expo.out', delay: 0.05 }
    )
  }

  // ── Slider navigation ────────────────────────────────────────────────
  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides
    gsap.to(track, {
      x: `-${currentSlide * 100}%`,
      duration: 0.55,
      ease: 'expo.out'
    })
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide)
    })
  }

  prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1))
  nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1))

  // Keyboard navigation
  window.addEventListener('keydown', e => {
    if (overlay.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'ArrowLeft')  goToSlide(currentSlide - 1)
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1)
      if (e.key === 'Escape')     closeModal()
    }
  })

  // Touch/swipe support
  let touchStartX = 0
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX }, {passive: true})
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX
    if (Math.abs(dx) > 50) dx < 0 ? goToSlide(currentSlide + 1) : goToSlide(currentSlide - 1)
  })

  // ── Close modal ───────────────────────────────────────────────────────
  function closeModal() {
    gsap.to('.modal-container', { y: 40, scale: 0.96, opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0, duration: 0.35, delay: 0.1, ease: 'power2.in',
      onComplete: () => {
        overlay.setAttribute('aria-hidden', 'true')
        document.body.style.overflow = ''
      }
    })
  }

  closeBtn.addEventListener('click', closeModal)
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal() })

  // ── Attach to all "View" buttons ──────────────────────────────────────
  document.querySelectorAll('.project-view-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project))
  })
}
