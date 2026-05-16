import * as THREE from 'three'

export function initScene(canvasId) {
  const canvas = document.getElementById(canvasId)
  if (!canvas) return

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 5

  // ── Icosahedron wireframe ──────────────────────────────────
  const icoGeo = new THREE.IcosahedronGeometry(1.5, 1)
  const icoMat = new THREE.MeshBasicMaterial({ color: 0x0ea5e9, wireframe: true, transparent: true, opacity: 0.35 })
  const ico = new THREE.Mesh(icoGeo, icoMat)
  scene.add(ico)

  // ── Star particles ─────────────────────────────────────────
  const starGeo = new THREE.BufferGeometry()
  const starCount = 2000
  const positions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount * 3; i++) positions[i] = (Math.random() - 0.5) * 50
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.6 })
  scene.add(new THREE.Points(starGeo, starMat))

  // ── Torus knots ────────────────────────────────────────────
  const torusColors = [0x7c3aed, 0x0ea5e9, 0x38bdf8]
  const toruses = torusColors.map((col, i) => {
    const t = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.28, 0.07, 64, 8),
      new THREE.MeshBasicMaterial({ color: col, wireframe: true, opacity: 0.45, transparent: true })
    )
    t.position.set((i - 1) * 7, Math.sin(i * 1.3) * 2.5, -4)
    scene.add(t)
    return t
  })

  // ── Grid plane ─────────────────────────────────────────────
  const gridHelper = new THREE.GridHelper(30, 30, 0x0ea5e9, 0x0ea5e9)
  gridHelper.material.opacity = 0.04
  gridHelper.material.transparent = true
  gridHelper.position.y = -4
  scene.add(gridHelper)

  // ── Mouse parallax ─────────────────────────────────────────
  let mouseX = 0, mouseY = 0
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.4
  })

  // ── Animate ────────────────────────────────────────────────
  const clock = new THREE.Clock()
  function animate() {
    requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    ico.rotation.x = t * 0.15
    ico.rotation.y = t * 0.2
    toruses.forEach((tor, i) => {
      tor.rotation.x = t * (0.2 + i * 0.08)
      tor.rotation.y = t * (0.15 + i * 0.05)
    })
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - camera.position.y) * 0.05
    camera.lookAt(scene.position)
    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
}
