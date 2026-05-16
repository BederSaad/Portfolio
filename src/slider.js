import gsap from 'gsap';
import Lenis from '@studio-freight/lenis';

/**
 * ORBITAL RING SLIDER — src/slider.js
 * Full orbital ring project browser with interactive modal.
 */

const PROJECTS_DATA = [
  {
    id: 1,
    category: "Web Dev",
    color: "#f97316",
    title: "Maieutica App",
    desc: "Plateforme éducative interactive conçue pour l'apprentissage moderne et l'engagement des étudiants.",
    tags: ["React", "Vite", "Node.js"],
    assets: [
      { type: 'video', url: './assets/projects/Maieutica/Enregistrement 2026-05-15 215727.mp4' },
      { type: 'image', url: './assets/projects/Maieutica/1.png' },
      { type: 'image', url: './assets/projects/Maieutica/courses.png' },
      { type: 'image', url: './assets/projects/Maieutica/couse 2.png' }
    ]
  },
  {
    id: 2,
    category: "Cybersecurity",
    color: "#0ea5e9",
    title: "CTI & SOC Platform",
    desc: "Infrastructure SOC avancée avec orchestration SIEM/SOAR et moteur d'intelligence sur les menaces.",
    tags: ["pfSense", "Wazuh", "n8n", "Python"],
    assets: [
      { type: 'video', url: './assets/projects/CTI/Enregistrement 2026-05-15 222020.mp4' },
      { type: 'image', url: './assets/projects/CTI/0.png' },
      { type: 'image', url: './assets/projects/CTI/1.png' },
      { type: 'image', url: './assets/projects/CTI/2.png' },
      { type: 'image', url: './assets/projects/CTI/3.png' },
      { type: 'image', url: './assets/projects/CTI/4.png' },
      { type: 'image', url: './assets/projects/CTI/5.png' },
      { type: 'image', url: './assets/projects/CTI/6.png' },
      { type: 'image', url: './assets/projects/CTI/7.png' },
      { type: 'image', url: './assets/projects/CTI/8.png' }
    ]
  },
  {
    id: 3,
    category: "AI/ML",
    color: "#8b5cf6",
    title: "Chat Bot AI",
    desc: "Assistant conversationnel intelligent utilisant les dernières technologies d'IA pour une interaction fluide et naturelle.",
    tags: ["React", "Vite", "CSS", "OpenAI"],
    assets: [
      { type: 'image', url: './assets/projects/AI/1.png' },
      { type: 'image', url: './assets/projects/AI/2.png' },
      { type: 'image', url: './assets/projects/AI/3.png' },
      { type: 'image', url: './assets/projects/AI/4.png' }
    ]
  },
  {
    id: 4,
    category: "Game Dev",
    color: "#10b981",
    title: "Investigation Game",
    desc: "Expérience narrative immersive mêlant énigmes et intelligence artificielle pour des dialogues dynamiques.",
    tags: ["Unity", "C#", "AI"],
    assets: [
      { type: 'video', url: './assets/projects/Investigation/Interrogation.mp4' },
      { type: 'image', url: './assets/projects/Investigation/1.png' },
      { type: 'image', url: './assets/projects/Investigation/2.png' },
      { type: 'image', url: './assets/projects/Investigation/3.png' },
      { type: 'image', url: './assets/projects/Investigation/4.png' },
      { type: 'image', url: './assets/projects/Investigation/5.png' }
    ]
  },
  {
    id: 5,
    category: "Web Design",
    color: "#f43f5e",
    title: "La Bella Pizza",
    desc: "Design premium pour une pizzeria avec menu interactif et système de commande fluide.",
    tags: ["HTML", "CSS", "JS", "Animations"],
    assets: [
      { type: 'image', url: './assets/projects/Pizza/1.png' },
      { type: 'image', url: './assets/projects/Pizza/2.png' },
      { type: 'image', url: './assets/projects/Pizza/3.png' },
      { type: 'image', url: './assets/projects/Pizza/4.png' },
      { type: 'image', url: './assets/projects/Pizza/5.png' },
      { type: 'image', url: './assets/projects/Pizza/6.png' }
    ]
  },
  {
    id: 6,
    category: "Web Design",
    color: "#7c3aed",
    title: "Arôme Café",
    desc: "Site vitrine élégant capturant l'essence d'un café artisanal avec des effets visuels soignés.",
    tags: ["Parallax", "Design UX", "HTML/CSS"],
    assets: [
      { type: 'image', url: './assets/projects/Coffee/1.png' },
      { type: 'image', url: './assets/projects/Coffee/2.png' },
      { type: 'image', url: './assets/projects/Coffee/3.png' },
      { type: 'image', url: './assets/projects/Coffee/4.png' },
      { type: 'image', url: './assets/projects/Coffee/5.png' },
      { type: 'image', url: './assets/projects/Coffee/6.png' },
      { type: 'image', url: './assets/projects/Coffee/7.png' }
    ]
  },
  {
    id: 7,
    category: "Mobile",
    color: "#06b6d4",
    title: "Security Emergency",
    desc: "Application mobile de secours avec géolocalisation en temps réel.",
    tags: ["Android", "Java", "Firebase"],
    assets: [{ type: 'image', url: 'https://picsum.photos/seed/mob/800/600' }]
  },
  {
    id: 8,
    category: "IoT",
    color: "#fbbf24",
    title: "Smart Irrigation",
    desc: "Système automatisé de gestion de l'eau via capteurs connectés.",
    tags: ["Arduino", "IoT", "Cloud"],
    assets: [{ type: 'image', url: 'https://picsum.photos/seed/iot/800/600' }]
  }
];

export function initSlider() {
  const ring = document.getElementById('project-ring');
  const viewport = document.getElementById('project-slider-viewport');
  const dotsContainer = document.getElementById('slider-dots');
  if (!ring || !viewport) return;

  let currentAngle = 0;
  let isDragging = false;
  let startX = 0;
  let startAngle = 0;
  let lastX = 0;
  let velocity = 0;
  let isAutoRotating = true;
  let autoRotateTimer = null;
  let isModalOpen = false;

  const isMobile = () => window.innerWidth < 768;

  // ── Render Cards ───────────────────────────────────────────
  function renderCards() {
    ring.innerHTML = '';
    PROJECTS_DATA.forEach((project, i) => {
      const card = document.createElement('div');
      card.className = 'project-card-3d';
      card.setAttribute('data-id', project.id);
      card.setAttribute('aria-label', `Project: ${project.title}`);
      
      const angle = i * 45;
      if (!isMobile()) {
        card.style.transform = `rotateY(${angle}deg) translateZ(460px)`;
      }

      card.innerHTML = `
        <div class="card-top" style="background: #060e1c">
          <div class="category-icon" style="background: ${project.color}20; color: ${project.color}; box-shadow: 0 0 20px ${project.color}33;">
            ${getCategoryIcon(project.category)}
          </div>
        </div>
        <div class="card-bottom">
          <span class="category-pill" style="background: ${project.color}20; color: ${project.color}">${project.category}</span>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-desc">${project.desc}</p>
          <div class="card-tags">
            ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          </div>
          <button class="view-project-btn" data-id="${project.id}">View Project</button>
        </div>
      `;

      // Make the entire card clickable for maximum reliability
      card.style.cursor = 'pointer';
      
      const btn = card.querySelector('.view-project-btn');
      if (btn) btn.style.pointerEvents = 'none'; // Let the card handle the click

      card.addEventListener('mouseenter', () => {
        isAutoRotating = false;
        card.style.zIndex = "1000";
      });
      
      card.addEventListener('mouseleave', () => {
        if (!isModalOpen) resetAutoRotate();
        card.style.zIndex = "";
      });

      card.addEventListener('click', () => {
        // Snap ring to this project
        const baseAngle = i * 45;
        currentAngle = -baseAngle;
        velocity = 0;
        
        // Immediate visual feedback
        gsap.to(card, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        
        try {
          openModal(project);
        } catch (err) {
          console.error("Failed to open modal:", err);
        }
      });

      ring.appendChild(card);
    });

    if (isMobile()) {
      renderMobileDots();
    }
  }

  function getCategoryIcon(cat) {
    if (cat === 'Cybersecurity') return '🔐';
    if (cat === 'AI/ML') return '🤖';
    if (cat === 'Web Dev') return '💻';
    if (cat === 'Game Dev') return '🎮';
    if (cat === 'IoT') return '🌱';
    if (cat === 'Mobile') return '📱';
    return '🚀';
  }

  // ── 3D Ring Logic ──────────────────────────────────────────
  function updateRing() {
    if (isModalOpen) {
      requestAnimationFrame(updateRing);
      return;
    }
    if (isMobile()) return;

    if (!isDragging && Math.abs(velocity) > 0.5) {
      currentAngle += velocity;
      velocity *= 0.92;
      if (Math.abs(velocity) <= 0.5) {
        snapToNearest();
      }
    }

    ring.style.transform = `rotateY(${currentAngle}deg)`;

    const cards = ring.querySelectorAll('.project-card-3d');
    cards.forEach((card, i) => {
      const baseAngle = i * 45;
      let effectiveAngle = (baseAngle + currentAngle) % 360;
      if (effectiveAngle < 0) effectiveAngle += 360;

      const diff = Math.min(Math.abs(effectiveAngle), Math.abs(effectiveAngle - 360));

      if (diff < 30) {
        card.style.opacity = '1';
        card.style.transform = `rotateY(${baseAngle}deg) translateZ(460px) scale(1.1)`;
        card.style.boxShadow = `0 0 40px ${PROJECTS_DATA[i].color}4d`;
      } else if (diff < 90) {
        card.style.opacity = '0.65';
        card.style.transform = `rotateY(${baseAngle}deg) translateZ(460px) scale(0.9)`;
        card.style.boxShadow = 'none';
      } else {
        card.style.opacity = '0.2';
        card.style.transform = `rotateY(${baseAngle}deg) translateZ(460px) scale(0.7)`;
        card.style.boxShadow = 'none';
      }
      
      card.style.pointerEvents = 'auto'; // Always clickable
    });

    requestAnimationFrame(updateRing);
  }

  function startAutoRotate() {
    clearTimeout(autoRotateTimer);
    autoRotateTimer = setInterval(() => {
      if (!isDragging && !isModalOpen && isAutoRotating) {
        currentAngle -= 45;
        snapToNearest();
      }
    }, 4000);
  }

  function snapToNearest() {
    const nearest = Math.round(currentAngle / 45) * 45;
    gsap.to({ val: currentAngle }, {
      val: nearest,
      duration: 0.6,
      ease: "elastic.out(1, 0.75)",
      onUpdate: function() {
        currentAngle = this.targets()[0].val;
      }
    });
  }

  // ── Drag Logic ─────────────────────────────────────────────
  viewport.addEventListener('pointerdown', (e) => {
    if (isMobile() || isModalOpen) return;
    isDragging = true;
    startX = e.clientX;
    startAngle = currentAngle;
    lastX = e.clientX;
    velocity = 0;
    isAutoRotating = false;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    currentAngle = startAngle + dx * 0.25;
    velocity = e.clientX - lastX;
    lastX = e.clientX;
  });

  window.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    if (Math.abs(velocity) < 0.5) {
      snapToNearest();
    }
    resetAutoRotate();
  });

  function resetAutoRotate() {
    isAutoRotating = false;
    clearTimeout(autoRotateTimer);
    autoRotateTimer = setTimeout(() => {
      if (!isModalOpen) {
        isAutoRotating = true;
      }
    }, 2000);
  }

  // ── Mobile Dots ────────────────────────────────────────────
  function renderMobileDots() {
    dotsContainer.innerHTML = '';
    PROJECTS_DATA.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'slider-dot';
      dot.addEventListener('click', () => {
        const card = ring.querySelectorAll('.project-card-3d')[i];
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
      dotsContainer.appendChild(dot);
    });

    ring.addEventListener('scroll', updateMobileDots);
  }

  function updateMobileDots() {
    const scrollLeft = ring.scrollLeft;
    const width = ring.clientWidth;
    const index = Math.round(scrollLeft / width);
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      if (i === index) {
        dot.style.background = PROJECTS_DATA[i].color;
        dot.style.width = '24px';
      } else {
        dot.style.background = 'rgba(255,255,255,0.2)';
        dot.style.width = '8px';
      }
    });
  }

  // ── Modal Logic ────────────────────────────────────────────
  function openModal(project) {
    isModalOpen = true;
    isAutoRotating = false;
    document.body.style.overflow = 'hidden';
    if (window.lenis) window.lenis.stop();

    const firstAsset = project.assets[0];
    const root = document.getElementById('modal-root');
    
    root.innerHTML = `
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal-content">
          <button class="modal-close-btn" aria-label="Close modal">✕</button>
          
          <div class="modal-left">
            <div class="main-media-container">
              ${renderMedia(firstAsset, project.title, true)}
              <div class="image-counter">1 / ${project.assets.length}</div>
            </div>
            <div class="film-strip-wrapper">
              <div class="film-strip">
                ${project.assets.map((asset, i) => `
                  <div class="thumb ${i === 0 ? 'active' : ''}" data-index="${i}" style="--accent: ${project.color}">
                    ${renderMedia(asset, `Thumb ${i+1}`, false)}
                    ${asset.type === 'video' ? '<div class="play-mini">▶</div>' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="modal-right">
            <div class="modal-header">
              <span class="modal-cat" style="color: ${project.color}">${project.category}</span>
              <h2 class="modal-title">${project.title}</h2>
              <div class="modal-divider" style="background: ${project.color}"></div>
            </div>
            <p class="modal-description">${project.desc}</p>
            <div class="modal-tech-section">
              <span class="label">TECHNOLOGIES</span>
              <div class="modal-tags">
                ${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
              </div>
            </div>
            <div class="modal-links">
              <div class="link-placeholder">Project Link Placeholder</div>
              <div class="link-placeholder">Source Code Placeholder</div>
            </div>
          </div>
        </div>
      </div>
    `;

    function renderMedia(asset, alt, isMain) {
      const safeUrl = encodeURI(asset.url);
      if (asset.type === 'video') {
        return `<video src="${safeUrl}" class="${isMain ? 'modal-main-media' : ''}" ${isMain ? 'autoplay loop muted playsinline' : ''} alt="${alt}"></video>`;
      }
      return `<img src="${safeUrl}" class="${isMain ? 'modal-main-media' : ''}" alt="${alt}">`;
    }

    const overlay = root.querySelector('.modal-overlay');
    const content = root.querySelector('.modal-content');
    const closeBtn = root.querySelector('.modal-close-btn');
    const thumbs = root.querySelectorAll('.thumb');
    const mediaContainer = root.querySelector('.main-media-container');
    const counter = root.querySelector('.image-counter');
    const strip = root.querySelector('.film-strip');

    // Animations
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35 });
    gsap.fromTo(content, { scale: 0.85, opacity: 0, y: 40 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });

    const close = () => {
      window.removeEventListener('keydown', onEsc);
      clearInterval(autoSlideTimer);
      gsap.to(content, { scale: 0.9, opacity: 0, y: 20, duration: 0.3 });
      gsap.to(overlay, { opacity: 0, duration: 0.3, onComplete: () => {
        root.innerHTML = '';
        document.body.style.overflow = '';
        if (window.lenis) window.lenis.start();
        isModalOpen = false;
        resetAutoRotate();
      }});
    };

    const onEsc = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') nextMedia();
      if (e.key === 'ArrowLeft') prevMedia();
    };

    let activeIdx = 0;
    let autoSlideTimer = setInterval(() => nextMedia(), 5000);

    function nextMedia() {
      activeIdx = (activeIdx + 1) % project.assets.length;
      switchMedia(activeIdx);
    }
    function prevMedia() {
      activeIdx = (activeIdx - 1 + project.assets.length) % project.assets.length;
      switchMedia(activeIdx);
    }

    function switchMedia(idx) {
      const asset = project.assets[idx];
      thumbs.forEach(t => t.classList.remove('active'));
      const activeThumb = root.querySelector(`.thumb[data-index="${idx}"]`);
      if (activeThumb) {
        activeThumb.classList.add('active');
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      
      gsap.to(mediaContainer.querySelector('.modal-main-media'), { opacity: 0, scale: 0.98, duration: 0.2, onComplete: () => {
        mediaContainer.innerHTML = `
          ${renderMedia(asset, project.title, true)}
          <div class="image-counter">${idx + 1} / ${project.assets.length}</div>
        `;
        gsap.fromTo(mediaContainer.querySelector('.modal-main-media'), { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
      }});
    }

    window.addEventListener('keydown', onEsc);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        clearInterval(autoSlideTimer); // Stop auto-slide on manual interaction
        activeIdx = parseInt(thumb.dataset.index);
        switchMedia(activeIdx);
      });
    });

    // Film strip drag
    let stripDragging = false;
    let stripStartX = 0;
    let stripScrollLeft = 0;

    strip.addEventListener('pointerdown', (e) => {
      stripDragging = true;
      stripStartX = e.clientX - strip.offsetLeft;
      stripScrollLeft = strip.scrollLeft;
    });

    window.addEventListener('pointermove', (e) => {
      if (!stripDragging) return;
      const x = e.clientX - strip.offsetLeft;
      const walk = (x - stripStartX);
      strip.scrollLeft = stripScrollLeft - walk;
    });

    window.addEventListener('pointerup', () => stripDragging = false);
  }

  // ── Styles ────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    .slider-viewport {
      width: 100%;
      height: 600px;
      perspective: 1600px;
      perspective-origin: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      user-select: none;
      touch-action: none;
    }
    .project-ring {
      width: 270px;
      height: 380px;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.1s linear;
    }
    .project-card-3d {
      position: absolute;
      width: 270px;
      height: 380px;
      left: 0;
      top: 0;
      border-radius: 20px;
      background: rgba(10, 20, 40, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      backface-visibility: hidden;
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease, border-color 0.3s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      cursor: pointer;
    }
    .project-card-3d:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }
    .project-card-3d::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%);
      pointer-events: none;
    }
    .card-top {
      height: 30%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: #060e1c;
    }
    .card-top::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%);
    }
    .category-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      z-index: 2;
      box-shadow: 0 8px 20px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .card-bottom {
      height: 70%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%);
    }
    .category-pill {
      font-size: 8.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 3px 10px;
      border-radius: 100px;
      width: fit-content;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .card-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
      margin-top: 2px;
    }
    .card-desc {
      font-size: 11px;
      color: #94a3b8;
      line-height: 1.5;
      margin-bottom: 4px;
    }
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }
    .tag-pill {
      font-size: 8.5px;
      padding: 3px 8px;
      background: rgba(30, 58, 95, 0.5);
      color: #38bdf8;
      border-radius: 5px;
      border: 1px solid rgba(56, 189, 248, 0.1);
    }
    .view-project-btn {
      width: 100%;
      margin-top: auto;
      padding: 10px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      color: #fff;
      border-radius: 10px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .view-project-btn:hover {
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    .view-project-btn::after {
      content: '→';
      font-size: 14px;
      transition: transform 0.3s ease;
    }
    .view-project-btn:hover::after {
      transform: translateX(4px);
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(2, 8, 19, 0.95);
      backdrop-filter: blur(25px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }
    .modal-content {
      width: 98vw;
      max-width: 1500px;
      height: 96vh;
      background: #000;
      border-radius: 24px;
      border: 1px solid rgba(255,255,255,0.1);
      display: flex;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 100px rgba(0,0,0,0.8);
    }
    .modal-close-btn {
      position: absolute;
      top: 24px;
      right: 24px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
      border: none;
      color: #fff;
      cursor: pointer;
      z-index: 100;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .modal-close-btn:hover {
      background: rgba(255,255,255,0.2);
      transform: rotate(90deg);
    }
    .modal-left {
      width: 70%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #000;
      border-right: 1px solid rgba(255,255,255,0.05);
    }
    .main-media-container {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, #111 0%, #000 100%);
    }
    .modal-main-media {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .image-counter {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background: rgba(0,0,0,0.7);
      backdrop-filter: blur(8px);
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 700;
      z-index: 5;
      color: #fff;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .film-strip-wrapper {
      height: 90px;
      background: rgba(10, 10, 10, 0.8);
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .film-strip {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      height: 100%;
      scrollbar-width: none;
      align-items: center;
    }
    .film-strip::-webkit-scrollbar { display: none; }
    .thumb {
      width: 80px;
      height: 55px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.4;
      transition: all 0.3s;
      border: 2px solid transparent;
      position: relative;
    }
    .thumb.active {
      opacity: 1;
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.4);
    }
    .thumb img, .thumb video { width: 100%; height: 100%; object-fit: cover; }
    .play-mini {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,0.3);
      color: #fff;
      font-size: 10px;
      pointer-events: none;
    }

    .modal-right {
      width: 45%;
      height: 100%;
      padding: 40px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      overflow-y: auto;
    }
    .modal-cat {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .modal-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 28px;
      font-weight: 700;
      margin-top: 8px;
    }
    .modal-divider {
      height: 2px;
      width: 100%;
      margin-top: 16px;
      transform-origin: left;
    }
    .modal-description {
      font-size: 15px;
      color: #94a3b8;
      line-height: 1.7;
    }
    .modal-tech-section .label {
      font-size: 11px;
      font-weight: 700;
      color: #475569;
      letter-spacing: 1px;
      display: block;
      margin-bottom: 12px;
    }
    .modal-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .modal-links {
      margin-top: auto;
      display: flex;
      gap: 12px;
    }
    .link-placeholder {
      flex: 1;
      padding: 12px;
      border: 1px dashed #334155;
      border-radius: 8px;
      color: #334155;
      font-size: 11px;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    /* Mobile Slider Dots */
    .slider-dots-mobile {
      display: none;
      justify-content: center;
      gap: 8px;
      margin-top: 24px;
    }
    .slider-dot {
      height: 8px;
      width: 8px;
      border-radius: 100px;
      background: rgba(255,255,255,0.2);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .slider-viewport {
        height: auto;
        perspective: none;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        justify-content: flex-start;
        padding: 40px 20px;
        scrollbar-width: none;
      }
      .slider-viewport::-webkit-scrollbar { display: none; }
      .project-ring {
        display: flex;
        transform: none !important;
        width: auto;
        height: auto;
        gap: 20px;
      }
      .project-card-3d {
        position: relative;
        flex-shrink: 0;
        width: 85vw;
        height: 450px;
        transform: none !important;
        opacity: 1 !important;
        scroll-snap-align: center;
      }
      .slider-dots-mobile { display: flex; }

      /* Mobile Modal */
      .modal-content {
        flex-direction: column;
        height: 90vh;
      }
      .modal-left { width: 100%; height: 40vh; }
      .modal-right { width: 100%; height: 60vh; padding: 24px; }
      .modal-title { font-size: 22px; }
    }
  `;
  document.head.appendChild(style);

  renderCards();
  if (!isMobile()) {
    requestAnimationFrame(updateRing);
    startAutoRotate();
  }

  window.addEventListener('resize', () => {
    renderCards();
  });
}
