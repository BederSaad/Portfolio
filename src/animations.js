import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function initAnimations() {

  // ── Hero name fly-in ──────────────────────────────────────
  gsap.from('#heroName span', {
    y: 120, opacity: 0, rotation: 15,
    stagger: 0.06, duration: 1.1, ease: 'expo.out', delay: 0.4
  })

  gsap.from('.hero-badge', { y: -30, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 0.2 })
  gsap.from('.hero-typewriter', { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 1.4 })
  gsap.from('.hero-bio', { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 1.6 })
  gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 1.8 })
  gsap.from('.scroll-indicator', { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 2.1 })

  // ── Section lines draw ────────────────────────────────────
  gsap.utils.toArray('.section-line').forEach(line => {
    gsap.from(line, {
      scaleX: 0, transformOrigin: 'left',
      scrollTrigger: { trigger: line, start: 'top 85%' },
      duration: 0.9, ease: 'power3.out'
    })
  })

  // ── About: stat cards slide from left ─────────────────────
  gsap.from('.stat-card', {
    x: -60, opacity: 0, stagger: 0.12,
    scrollTrigger: { trigger: '.about-stats', start: 'top 78%' },
    duration: 0.7, ease: 'back.out(1.4)'
  })

  gsap.from('.about-text', {
    x: 60, opacity: 0,
    scrollTrigger: { trigger: '.about-text', start: 'top 78%' },
    duration: 0.8, ease: 'expo.out'
  })

  // ── Stat counters ─────────────────────────────────────────
  ScrollTrigger.create({
    trigger: '.about-stats',
    start: 'top 80%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.stat-card').forEach(card => {
        const target = parseInt(card.dataset.count)
        const countEl = card.querySelector('.count')
        gsap.to({ val: 0 }, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate: function () { countEl.textContent = Math.floor(this.targets()[0].val) }
        })
      })
    }
  })

  // ── Skill cards stagger fade-up ───────────────────────────
  gsap.from('.skill-card', {
    y: 60, opacity: 0, stagger: 0.1,
    scrollTrigger: { trigger: '.skills-grid', start: 'top 78%' },
    duration: 0.7, ease: 'back.out(1.2)'
  })

  // ── Skills section heading ────────────────────────────────
  gsap.from('.skills .section-header', {
    y: 40, opacity: 0,
    scrollTrigger: { trigger: '.skills', start: 'top 80%' },
    duration: 0.8, ease: 'expo.out'
  })

  // ── Timeline line draws down ──────────────────────────────
  gsap.from('.timeline-line', {
    scaleY: 0, transformOrigin: 'top',
    scrollTrigger: {
      trigger: '.timeline', start: 'top 65%', end: 'bottom 45%', scrub: 1
    }
  })

  gsap.utils.toArray('.timeline-entry').forEach((entry, i) => {
    const fromX = entry.classList.contains('left') ? -80 : 80
    gsap.from(entry.querySelector('.timeline-card'), {
      x: fromX, opacity: 0,
      scrollTrigger: { trigger: entry, start: 'top 80%' },
      duration: 0.8, ease: 'expo.out'
    })
    gsap.from(entry.querySelector('.timeline-dot'), {
      scale: 0, opacity: 0,
      scrollTrigger: { trigger: entry, start: 'top 80%' },
      duration: 0.5, ease: 'back.out(2)'
    })
  })

  // ── Projects heading letters ──────────────────────────────
  gsap.from('.projects-heading span', {
    y: 50, opacity: 0, stagger: 0.07,
    scrollTrigger: { trigger: '#projects', start: 'top 82%' },
    duration: 0.7, ease: 'expo.out'
  })

  // ── Cert cards ────────────────────────────────────────────
  gsap.from('.cert-card', {
    y: 50, opacity: 0, stagger: 0.15,
    scrollTrigger: { trigger: '.certs-grid', start: 'top 80%' },
    duration: 0.8, ease: 'back.out(1.4)'
  })

  // ── Contact ───────────────────────────────────────────────
  gsap.from('.contact-heading', {
    y: 50, opacity: 0,
    scrollTrigger: { trigger: '.contact', start: 'top 75%' },
    duration: 0.9, ease: 'expo.out'
  })

  gsap.from('.contact-buttons .contact-btn', {
    y: 40, opacity: 0, stagger: 0.12,
    scrollTrigger: { trigger: '.contact-buttons', start: 'top 82%' },
    duration: 0.7, ease: 'back.out(1.3)'
  })

  // ── Navbar shrink on scroll ───────────────────────────────
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      document.getElementById('navbar').classList.toggle('scrolled', self.progress > 0)
    }
  })
}
