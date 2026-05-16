import '../styles/main.css'
import Lenis from '@studio-freight/lenis'
import { initScene } from './scene.js'
import { initTypewriter } from './typewriter.js'
import { initTilt } from './tilt.js'
import { initAnimations } from './animations.js'
import { initCursor } from './cursor.js'
import { initSlider } from './slider.js'

// ── Lenis smooth scroll ──────────────────────────────────────
const lenis = new Lenis({ lerp: 0.08, smooth: true })
window.lenis = lenis // Make it accessible to other modules
function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)

// ── Init custom components ───────────────────────────────────
initCursor()
initSlider()

// ── Three.js hero canvas ─────────────────────────────────────
initScene('heroCanvas')

// ── Typewriter ───────────────────────────────────────────────
initTypewriter('typewriterText')

// ── 3D card tilt ─────────────────────────────────────────────
initTilt()

// ── GSAP animations ──────────────────────────────────────────
initAnimations()

// ── Mobile nav burger ────────────────────────────────────────
const burger = document.getElementById('navBurger')
const navLinks = document.querySelector('.nav-links')
burger?.addEventListener('click', () => {
  navLinks.classList.toggle('open')
  burger.classList.toggle('active')
})

// ── Smooth scroll for nav links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    const target = document.querySelector(link.getAttribute('href'))
    if (target) lenis.scrollTo(target, { offset: -80 })
    navLinks.classList.remove('open')
  })
})

// ── Active nav highlight ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]')
const navAnchors = document.querySelectorAll('.nav-links a')

function onScroll() {
  let current = ''
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 200) current = sec.id
  })
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  })
}
window.addEventListener('scroll', onScroll, { passive: true })
