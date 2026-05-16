/**
 * NEON CURSOR — src/cursor.js
 * A modern, snappy neon blue cursor with a high-fidelity light trail.
 */

export function initCursor() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.style.cursor = 'default';
    return;
  }

  document.body.style.cursor = 'none';

  const canvas = document.createElement('canvas');
  canvas.id = 'neon-cursor-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '20000'
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  
  // Modern Trail Configuration
  const historyLimit = 15; // Balanced length for "snappy but present"
  const history = [];
  for (let i = 0; i < historyLimit; i++) {
    history.push({ x: mouse.x, y: mouse.y });
  }

  let time = 0;
  const NEON_BLUE = "56, 189, 248";

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function update() {
    time += 0.05;
    
    // Very fast follow for the head
    history[0].x = history[0].x + (mouse.x - history[0].x) * 0.5;
    history[0].y = history[0].y + (mouse.y - history[0].y) * 0.5;

    // Snappy follow for the rest of the body
    for (let i = 1; i < historyLimit; i++) {
      const p = history[i];
      const prev = history[i - 1];
      p.x = p.x + (prev.x - p.x) * 0.6;
      p.y = p.y + (prev.y - p.y) * 0.6;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (document.hidden) return;

    const pulse = 1 + Math.sin(time) * 0.15;
    const flicker = 0.85 + Math.random() * 0.15;

    // Draw the Trail (Modern Ribbon)
    // We draw backwards from tail to head
    for (let i = historyLimit - 1; i >= 0; i--) {
      const p = history[i];
      const opacity = (1 - i / historyLimit) * 0.8 * flicker;
      const size = (1 - i / historyLimit) * 5 * pulse;
      
      if (i > 0) {
        const prev = history[i - 1];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${NEON_BLUE}, ${opacity})`;
        ctx.lineWidth = size;
        ctx.lineCap = 'round';
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(prev.x, prev.y);
        ctx.stroke();
        
        // Add a secondary glow layer for the trail
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${NEON_BLUE}, ${opacity * 0.3})`;
        ctx.lineWidth = size * 3;
        ctx.stroke();
      }
    }

    // Head Bloom
    const head = history[0];
    const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 18 * pulse);
    grad.addColorStop(0, `rgba(${NEON_BLUE}, ${0.5 * flicker})`);
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 18 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Head Core
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(head.x, head.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  loop();
}
