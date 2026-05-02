// ═══════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();
document.querySelectorAll('button,a,.project-card,.service-item,.certifications-item,.skill-pill').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; ring.style.transform = 'translate(-50%,-50%) scale(1.5)'; cursor.style.background = 'var(--accent2)'; });
  el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.transform = 'translate(-50%,-50%) scale(1)'; cursor.style.background = 'var(--accent)'; });
});

// ═══════════════════════════════════════════
//  GLOBAL 3D CANVAS — morphs per section
// ═══════════════════════════════════════════
(function () {
  const canvas = document.getElementById('world-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, orbCx = 0;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; if (!orbCx) orbCx = W * 0.65; }
  resize(); window.addEventListener('resize', resize);

  // Section palette configs
  const PALETTES = {
    hero: { r1: 108, g1: 99, b1: 255, r2: 0, g2: 229, b2: 255, bg: 'rgba(108,99,255,0.06)', shape: 'sphere', ringColor: 'rgba(108,99,255,' },
    about: { r1: 0, g1: 229, b1: 255, r2: 108, g2: 99, b2: 255, bg: 'rgba(0,229,255,0.05)', shape: 'torus', ringColor: 'rgba(0,229,255,' },
    work: { r1: 255, g1: 77, b1: 141, r2: 108, g2: 99, b2: 255, bg: 'rgba(255,77,141,0.05)', shape: 'cube', ringColor: 'rgba(255,77,141,' },
    certifications: { r1: 57, g1: 255, b1: 20, r2: 0, g2: 229, b2: 255, bg: 'rgba(57,255,20,0.04)', shape: 'icosa', ringColor: 'rgba(57,255,20,' },
    blogs: { r1: 255, g1: 152, b1: 0, r2: 255, g2: 77, b2: 141, bg: 'rgba(255,152,0,0.05)', shape: 'diamond', ringColor: 'rgba(255,152,0,' },
    contact: { r1: 224, g1: 64, b1: 251, r2: 108, g2: 99, b2: 255, bg: 'rgba(224,64,251,0.07)', shape: 'sphere', ringColor: 'rgba(224,64,251,' },
  };

  // Current lerp state
  let cur = { ...PALETTES.hero };
  let target = { ...PALETTES.hero };
  let shapeT = 0;
  let currentSection = 'hero';
  let prevSection = 'hero';
  let morphProgress = 1; // 0→1: blends prevSection shape → currentSection shape

  // ── POINTS ──
  const N = 280;
  let dots = [];
  function initDots() {
    dots = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - 2 * (i + .5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      dots.push({ phi, theta, r: Math.random() * 1.5 + 0.5, speed: Math.random() * 0.0015 + 0.001 });
    }
  }
  initDots();

  function getShapePoint(shape, d, i, animAngle, t2) {
    let px, py, pz;
    if (shape === 'sphere') {
      px = Math.sin(d.phi) * Math.cos(animAngle);
      py = Math.cos(d.phi);
      pz = Math.sin(d.phi) * Math.sin(animAngle);
    } else if (shape === 'torus') {
      const u = animAngle, v = d.phi * 2;
      const R2t = 0.7, r2t = 0.3;
      px = (R2t + r2t * Math.cos(v)) * Math.cos(u);
      py = r2t * Math.sin(v);
      pz = (R2t + r2t * Math.cos(v)) * Math.sin(u);
    } else if (shape === 'cube') {
      const face = i % 6;
      const uv = ((t2 * 6) % 1), vv = (i % 17) / 17;
      const faces = [[1, uv * 2 - 1, vv * 2 - 1], [-1, uv * 2 - 1, vv * 2 - 1], [uv * 2 - 1, 1, vv * 2 - 1], [uv * 2 - 1, -1, vv * 2 - 1], [uv * 2 - 1, vv * 2 - 1, 1], [uv * 2 - 1, vv * 2 - 1, -1]];
      [px, py, pz] = faces[face];
    } else if (shape === 'icosa') {
      const phi2 = (1 + Math.sqrt(5)) / 2;
      const norm = Math.sqrt(1 + phi2 * phi2);
      const verts = [[0, 1 / norm, phi2 / norm], [0, -1 / norm, phi2 / norm], [phi2 / norm, 0, 1 / norm], [-phi2 / norm, 0, 1 / norm], [1 / norm, phi2 / norm, 0], [-1 / norm, phi2 / norm, 0], [1 / norm, -phi2 / norm, 0], [-1 / norm, -phi2 / norm, 0], [phi2 / norm, 0, -1 / norm], [-phi2 / norm, 0, -1 / norm], [0, 1 / norm, -phi2 / norm], [0, -1 / norm, -phi2 / norm]];
      const v = verts[i % 12];
      const noiseT = Math.sin(animAngle * 0.3 + i) * 0.15;
      px = v[0] * (1 + noiseT); py = v[1] * (1 + noiseT); pz = v[2] * (1 + noiseT);
    } else if (shape === 'diamond') {
      const levels = [0, 0.3, 0.6, 0.9, 1.2, 0.8];
      const level = Math.floor(t2 * levels.length);
      const angle2 = animAngle * 3;
      const r2d = levels[level % levels.length] || 0.5;
      px = Math.cos(angle2) * r2d; py = (level / levels.length) * 2 - 1; pz = Math.sin(angle2) * r2d;
    } else {
      px = Math.sin(d.phi) * Math.cos(animAngle);
      py = Math.cos(d.phi);
      pz = Math.sin(d.phi) * Math.sin(animAngle);
    }
    return [px, py, pz];
  }

  let time = 0, mouseX = 0.5, mouseY = 0.5;
  document.addEventListener('mousemove', e => { mouseX = e.clientX / window.innerWidth; mouseY = e.clientY / window.innerHeight; });

  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpPalette(speed = 0.05) {
    cur.r1 = lerp(cur.r1, target.r1, speed); cur.g1 = lerp(cur.g1, target.g1, speed); cur.b1 = lerp(cur.b1, target.b1, speed);
    cur.r2 = lerp(cur.r2, target.r2, speed); cur.g2 = lerp(cur.g2, target.g2, speed); cur.b2 = lerp(cur.b2, target.b2, speed);
  }

  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, W, H);
    time += 0.007;
    lerpPalette(0.05);
    morphProgress = Math.min(1, morphProgress + 0.022); // ~45 frames ≈ 0.75s
    const eased = morphProgress < 0.5 ? 2 * morphProgress * morphProgress : 1 - Math.pow(-2 * morphProgress + 2, 2) / 2;

    const targetCx = (currentSection === 'work' || currentSection === 'contact' || currentSection === 'certifications' || currentSection === 'blogs') ? W * 0.5 : W * 0.65;
    orbCx += (targetCx - orbCx) * 0.04;
    const cx = orbCx, cy = H * 0.5;
    const R = Math.min(W, H) * 0.3 * (0.8 + eased * 0.2);
    const rotY = time * 0.4 + (mouseX - 0.5) * 0.6;
    const rotX = Math.sin(time * 0.18) * 0.3 + (mouseY - 0.5) * 0.4;

    // ── BACKGROUND GLOW ──
    const bg = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.6);
    bg.addColorStop(0, `rgba(${Math.round(cur.r1)},${Math.round(cur.g1)},${Math.round(cur.b1)},0.06)`);
    bg.addColorStop(0.6, `rgba(${Math.round(cur.r1)},${Math.round(cur.g1)},${Math.round(cur.b1)},0.02)`);
    bg.addColorStop(1, 'transparent');
    ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(cx, cy, R * 1.6, 0, Math.PI * 2); ctx.fill();

    // ── EQUATORIAL RINGS (morph in/out) ──
    for (let rk = 0; rk < 3; rk++) {
      const rad = 0.6 + rk * 0.22;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * rad, R * rad * Math.abs(Math.sin(rotX + rk * 0.5)) * 0.28, rotY * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${Math.round(cur.r1)},${Math.round(cur.g1)},${Math.round(cur.b1)},${(0.12 - rk * 0.03) * eased})`;
      ctx.lineWidth = 1; ctx.stroke();
    }

    // ── TRANSFORM 3D POINTS ──
    const visible = [];

    const shapeA = PALETTES[prevSection]?.shape || 'sphere';
    const shapeB = PALETTES[currentSection]?.shape || 'sphere';

    dots.forEach((d, i) => {
      const t2 = i / N;
      const animAngle = d.theta + time * d.speed * 50;

      const [ax, ay, az] = getShapePoint(shapeA, d, i, animAngle, t2);
      const [bx, by, bz] = getShapePoint(shapeB, d, i, animAngle, t2);
      const px = lerp(ax, bx, eased);
      const py = lerp(ay, by, eased);
      const pz = lerp(az, bz, eased);

      // Rotate Y
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const px2 = px * cosY - pz * sinY, pz2 = px * sinY + pz * cosY;
      // Rotate X
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const py3 = py * cosX - pz2 * sinX, pz3 = py * sinX + pz2 * cosX;
      visible.push({ sx: cx + px2 * R, sy: cy + py3 * R, z: pz3, r: d.r, i });
    });
    visible.sort((a, b) => a.z - b.z);

    // ── CONNECTIONS ──
    ctx.lineWidth = 0.4;
    for (let i = 0; i < visible.length; i++) {
      for (let j = i + 1; j < visible.length; j++) {
        const dx = visible[i].sx - visible[j].sx, dy = visible[i].sy - visible[j].sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 48) {
          const avgZ = (visible[i].z + visible[j].z) * 0.5;
          const alpha = (1 - dist / 48) * ((avgZ + 1) * 0.5) * 0.3;
          const it = visible[i].i / N;
          const r = Math.round(lerp(cur.r1, cur.r2, it));
          const g = Math.round(lerp(cur.g1, cur.g2, it));
          const b = Math.round(lerp(cur.b1, cur.b2, it));
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath(); ctx.moveTo(visible[i].sx, visible[i].sy); ctx.lineTo(visible[j].sx, visible[j].sy); ctx.stroke();
        }
      }
    }

    // ── DOTS ──
    visible.forEach(d => {
      const bright = (d.z + 1) * 0.5;
      const it = d.i / N;
      const r = Math.round(lerp(cur.r1, cur.r2, it));
      const g = Math.round(lerp(cur.g1, cur.g2, it));
      const b = Math.round(lerp(cur.b1, cur.b2, it));
      ctx.beginPath(); ctx.arc(d.sx, d.sy, d.r * (0.4 + bright * 0.9), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${0.25 + bright * 0.75})`; ctx.fill();
      if (bright > 0.75) {
        const gd = ctx.createRadialGradient(d.sx, d.sy, 0, d.sx, d.sy, d.r * 5);
        gd.addColorStop(0, `rgba(${r},${g},${b},0.25)`); gd.addColorStop(1, 'transparent');
        ctx.fillStyle = gd; ctx.beginPath(); ctx.arc(d.sx, d.sy, d.r * 5, 0, Math.PI * 2); ctx.fill();
      }
    });

    // ── SECONDARY smaller orb (left side) ──
    const cx2 = W * 0.1, cy2 = H * 0.4;
    const R2 = Math.min(W, H) * 0.1;
    const bg2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, R2 * 2);
    bg2.addColorStop(0, `rgba(${Math.round(cur.r2)},${Math.round(cur.g2)},${Math.round(cur.b2)},0.07)`);
    bg2.addColorStop(1, 'transparent');
    ctx.fillStyle = bg2; ctx.beginPath(); ctx.arc(cx2, cy2, R2 * 2, 0, Math.PI * 2); ctx.fill();
  }
  draw();

  // ── EXPOSE section changer ──
  window._setSection = function (sec) {
    if (currentSection !== sec && PALETTES[sec]) {
      prevSection = currentSection;
      currentSection = sec;
      target = { ...PALETTES[sec] };
      morphProgress = 0;
    }
  };
})();

// ═══════════════════════════════════════════
//  SCROLL → THEME MORPH ENGINE
// ═══════════════════════════════════════════
const sections = ['hero', 'about', 'work', 'certifications', 'blogs', 'contact'];
const snapDots = document.querySelectorAll('.snap-dot');
const wordmarks = {
  hero: document.getElementById('wm-hero'),
  about: document.getElementById('wm-about'),
  work: document.getElementById('wm-work'),
  certifications: document.getElementById('wm-certifications'),
  blogs: document.getElementById('wm-blogs'),
  contact: document.getElementById('wm-contact'),
};

// CSS accent color transitions per section
const sectionColors = {
  hero: { accent: '#6c63ff', accent2: '#ff4d8d', accent3: '#00e5ff' },
  about: { accent: '#00e5ff', accent2: '#6c63ff', accent3: '#ff4d8d' },
  work: { accent: '#ff4d8d', accent2: '#6c63ff', accent3: '#00e5ff' },
  certifications: { accent: '#39ff14', accent2: '#00e5ff', accent3: '#6c63ff' },
  blogs: { accent: '#ff9800', accent2: '#ff4d8d', accent3: '#00e5ff' },
  contact: { accent: '#e040fb', accent2: '#6c63ff', accent3: '#ff4d8d' },
};

let lastSection = 'hero';

// ── Smooth CSS accent color lerp engine ──
function hexToRgb(hex) {
  hex = hex.trim();
  // getComputedStyle returns rgb(r, g, b) format
  const rgb = hex.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgb) return [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])];
  // fallback: #rrggbb
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}
function rgbToHex(r, g, b) { return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join(''); }

let cssFrom = { accent: [108, 99, 255], accent2: [255, 77, 141], accent3: [0, 229, 255] };
let cssTarget = { accent: [108, 99, 255], accent2: [255, 77, 141], accent3: [0, 229, 255] };
let cssT = 1;
let cssRafId = null;

function startCSSColorMorph(c) {
  cssFrom.accent = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
  cssFrom.accent2 = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--accent2').trim());
  cssFrom.accent3 = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue('--accent3').trim());
  cssTarget.accent = hexToRgb(c.accent);
  cssTarget.accent2 = hexToRgb(c.accent2);
  cssTarget.accent3 = hexToRgb(c.accent3);
  cssT = 0;
  if (!cssRafId) animateCSSColors();
}

function easeCSST(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; } // ease-in-out quad

function animateCSSColors() {
  cssT = Math.min(1, cssT + 0.018); // ~55 frames ≈ ~0.9s at 60fps
  const e = easeCSST(cssT);
  ['accent', 'accent2', 'accent3'].forEach(k => {
    const [r1, g1, b1] = cssFrom[k], [r2, g2, b2] = cssTarget[k];
    document.documentElement.style.setProperty('--' + k, rgbToHex(r1 + (r2 - r1) * e, g1 + (g2 - g1) * e, b1 + (b2 - b1) * e));
  });
  if (cssT < 1) { cssRafId = requestAnimationFrame(animateCSSColors); }
  else { cssRafId = null; }
}

function onScroll() {
  const scrollY = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scroll-bar').style.width = (scrollY / docH * 100) + '%';

  // Determine active section
  let active = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.45) active = id;
  });

  if (active !== lastSection) {
    lastSection = active;

    // ── Morph 3D canvas colors + shape ──
    if (window._setSection && active === 'hero') window._setSection(active);

    // Show/hide canvas based on section
const worldCanvas = document.getElementById('world-canvas');
if (worldCanvas) worldCanvas.style.opacity = (active === 'hero') ? '1' : '0';

    // ── Morph CSS accent variables (smoothly via JS lerp) ──
    const c = sectionColors[active];
    if (c) startCSSColorMorph(c);

    // ── Activate section theme layers ──
    document.querySelectorAll('.theme-layer').forEach(l => l.classList.remove('active'));
    const tl = document.getElementById('tl-' + active);
    if (tl) tl.classList.add('active');

    // ── Wordmarks ──
    Object.values(wordmarks).forEach(w => { if (w) w.classList.remove('show'); });
    if (wordmarks[active]) wordmarks[active].classList.add('show');

    // ── Nav dots ──
    snapDots.forEach((d, i) => { d.classList.toggle('active', sections[i] === active); });
  }
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ═══════════════════════════════════════════
//  HAMBURGER / MOBILE NAV
// ═══════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
mobileNavClose.addEventListener('click', () => toggleMenu(false));

function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileNav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMenu(!mobileNav.classList.contains('open')));

// Close on link click
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    toggleMenu(false);
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    setTimeout(() => {
      if (id === 'certifications') {
        const navH = document.querySelector('nav').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 350);
  });
});


// Dot nav clicks
snapDots.forEach((d, i) => {
  d.addEventListener('click', () => {
    const id = sections[i];
    const target = document.getElementById(id);
    if (!target) return;
    if (id === 'certifications') {
      const navH = document.querySelector('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ═══════════════════════════════════════════
//  TILT CARD
// ═══════════════════════════════════════════
const tiltCard = document.getElementById('tilt-card');
if (tiltCard) {
  tiltCard.parentElement.addEventListener('mousemove', e => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `perspective(800px) rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.02)`;
  });
  tiltCard.parentElement.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
  });
}

// ═══════════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════════
const revObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(r => revObserver.observe(r));

// ═══════════════════════════════════════════
//  SMOOTH SCROLL for nav links
// ═══════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    if (id === 'certifications') {
      const navH = document.querySelector('nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Hide cursor on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  const cur = document.getElementById('cursor');
  const rng = document.getElementById('cursor-ring');
  if (cur) cur.style.display = 'none';
  if (rng) rng.style.display = 'none';
  document.body.style.cursor = 'auto';
}


// ── TECH ICONS: build 4 sets for seamless loop ──
(function () {
  const icons = [
    { label: 'C', color: '#6c63ff', svg: `<polygon points="64,8 120,40 120,88 64,120 8,88 8,40"/><text x="64" y="76" text-anchor="middle" font-size="38" font-weight="bold" font-family="sans-serif" stroke="none" fill="currentColor">C</text>` },
    { label: 'Java', color: '#00e5ff', svg: `<path d="M42 96s-5 3 3.5 4c10 1.2 15 1 26-1.1 0 0 2.9 1.8 6.9 3.4C54 112.7 23 101.5 42 96z"/><path d="M39 82s-5.4 4 2.8 4.8c10.6 1.1 19 1.2 33.4-1.6 0 0 2 2 5.1 3.1C50.4 97 17.5 89 39 82z"/><path d="M70 61c6 6.9-1.6 13.2-1.6 13.2s15.3-7.9 8.3-17.8C70.2 47.2 65 42 92.5 26c0 0-42.7 10.7-22.5 35z"/><path d="M101 108s3.5 2.9-3.9 5.2c-14.1 4.3-58.7 5.6-71.1.2-4.5-1.9 3.9-4.6 6.5-5.2 2.7-.6 4.3-.5 4.3-.5-5-3.5-32 6.9-13.7 9.8C73 126 114 113 101 108z"/><path d="M50 72s-22.7 5.4-8 7.3c6.2.8 18.5.6 30-.3 9.4-.8 18.8-2.5 18.8-2.5s-3.3 1.4-5.7 3.1C62.1 85.6 17.5 82.7 30.3 76.6 41.1 71.4 50 72 50 72z"/><path d="M90.7 95c23.4-12.2 12.6-23.9 5-22.3-1.8.4-2.7.7-2.7.7s.7-1 2-1.5c14.9-5.3 26.5 15.5-4.8 23.7 0 0 .4-.3.5-.6z"/><path d="M74 0S84.9 10.5 64.1 26.5c-16.3 12.8-3.7 20.2 0 28.5-9.5-8.6-16.5-16.1-11.8-23.1C59 19.7 79.7 14.2 74 0z"/><path d="M52.5 126.5c22.5 1.4 57-.8 57.9-11.4 0 0-1.6 4-18.6 7.2-19.2 3.6-42.9 3.2-56.9.9 0 0 2.9 2.4 17.6 3.3z"/>` },
    { label: 'Python', color: '#ff4d8d', svg: `<path d="M63.4 2c-4.2 0-8.3.4-11.8 1-10.5 1.8-12.3 5.7-12.3 12.8v9.4h24.7v3.1H30c-7.2 0-13.5 4.3-15.4 12.5-2.3 9.4-2.4 15.3 0 25.1 1.8 7.3 6 12.5 13.1 12.5h8.5V67.2c0-8.2 7-15.3 15.4-15.3h24.7c6.9 0 12.3-5.7 12.3-12.5V15.8c0-6.7-5.6-11.7-12.3-12.8C72.3 2.3 67.7 2 63.4 2z"/><circle cx="50" cy="9.6" r="4.6"/><path d="M91.7 28.4v11c0 8.5-7.2 15.7-15.4 15.7H51.6c-6.8 0-12.3 5.8-12.3 12.5v23.5c0 6.7 5.8 10.6 12.3 12.5 7.8 2.3 15.3 2.7 24.7 0 6.2-1.8 12.3-5.4 12.3-12.5V82H63.9v-3.1h37c7.2 0 9.9-5 12.3-12.5 2.6-7.7 2.5-15.2 0-25.1-1.8-7.1-5.2-12.5-12.3-12.5H91.7z"/><circle cx="77.8" cy="87.9" r="4.6"/>` },
    { label: 'JS', color: '#39ff14', svg: `<rect x="8" y="8" width="112" height="112" rx="6"/><path d="M116 97c-.9-5.7-4.6-10.5-15.7-15-3.8-1.8-8.1-3-9.4-5.9-.5-1.7-.5-2.6-.2-3.7.8-3.3 4.8-4.4 7.9-3.4 2 .7 3.9 2.2 5.1 4.7 5.4-3.5 5.4-3.5 9.2-5.9-1.4-2.1-2.1-3.1-3-4-3.2-3.6-7.7-5.5-14.8-5.4l-3.7.5c-3.5.9-6.9 2.7-8.9 5.2C80.6 71.7 82.3 83.5 89.5 88.3c7.1 5.3 17.5 6.5 18.9 11.5 1.3 6.1-4.5 8.1-10.2 7.4-4.2-.9-6.6-3-9.1-6.9-4.7 2.7-4.7 2.7-9.5 5.5 1.1 2.5 2.3 3.6 4.3 5.8 9 9.2 31.8 8.7 35.8-5.2.2-.5 1.3-3.7.3-8.4zM69.5 59H57.8l-.1 30.3c0 6.4.3 12.3-.7 14.1-1.7 3.6-6.2 3.1-8.2 2.4-2.1-1-3.1-2.5-4.3-4.5l-.7-1.1-9.5 5.8c1.6 3.2 3.9 6.1 6.9 7.9 4.5 2.7 10.5 3.5 16.7 2.1 4.1-1.2 7.6-3.7 9.4-7.4 2.7-4.9 2.1-10.9 2.1-17.4V59z"/>` },
    { label: 'MySQL', color: '#ff9800', svg: `<ellipse cx="64" cy="32" rx="48" ry="16"/><path d="M16 32v64c0 8.8 21.5 16 48 16s48-7.2 48-16V32"/><path d="M16 64c0 8.8 21.5 16 48 16s48-7.2 48-16"/>` },
    { label: 'GitHub', color: '#6c63ff', svg: `<path d="M64 5.1C30.7 5.1 3.6 32.1 3.6 65.5c0 26.7 17.3 49.3 41.3 57.3 3 .6 4.1-1.3 4.1-2.9 0-1.4-.1-6.2-.1-11.2-16.8 3.7-20.3-7.1-20.3-7.1-2.7-7-6.7-8.8-6.7-8.8-5.5-3.7.4-3.7.4-3.7 6.1.4 9.3 6.2 9.3 6.2 5.4 9.2 14.1 6.6 17.6 5 .5-3.9 2.1-6.6 3.8-8.1-13.4-1.5-27.5-6.7-27.5-29.8 0-6.6 2.4-12 6.2-16.2-.6-1.5-2.7-7.7.6-16 0 0 5.1-1.6 16.6 6.2 4.8-1.3 10-2 15.1-2 5.1 0 10.3.7 15.1 2 11.5-7.8 16.6-6.2 16.6-6.2 3.3 8.3 1.2 14.5.6 16 3.9 4.2 6.2 9.6 6.2 16.2 0 23.2-14.1 28.3-27.6 29.8 2.2 1.9 4.1 5.6 4.1 11.2 0 8.1-.1 14.6-.1 16.6 0 1.6 1.1 3.5 4.1 2.9 24-8 41.3-30.6 41.3-57.3C124.4 32.1 97.3 5.1 64 5.1z"/>` },
    { label: 'Git', color: '#00e5ff', svg: `<path d="M124.7 58.4L69.6 3.3a8.1 8.1 0 00-11.5 0L46.7 14.7l14.5 14.5a9.7 9.7 0 019.9 2.3 9.7 9.7 0 012.3 10L87.4 55.4a9.7 9.7 0 0110-2.1 9.7 9.7 0 11-11.8 9.4 9.7 9.7 0 01-2.1-10.5L68.3 37v36.3a9.7 9.7 0 012.1 1.1 9.7 9.7 0 11-13.7 0 9.7 9.7 0 012.1-1.5V47.2a9.7 9.7 0 01-2.1-1.5 9.7 9.7 0 01-2.1-10.5L40 20.6 3.3 57.1a8.1 8.1 0 000 11.5l55.1 55.1a8.1 8.1 0 0011.5 0l54.8-54.8a8.1 8.1 0 000-11.5z"/>` },
    { label: 'Cloud', color: '#e040fb', svg: `<path d="M98.5 51.5c-.8-20.4-17.7-36.8-38.3-36.8-15.8 0-29.7 9.5-36.1 23.7C11.3 40 3 49 3 60c0 11.6 9.4 21 21 21h72.3c9.8 0 17.7-7.9 17.7-17.7 0-9-6.7-16.5-15.5-11.8z"/>` },
    { label: 'Postman', color: '#ff6c37', svg: `<circle cx="64" cy="64" r="56"/><path d="M90.6 37.4a37.4 37.4 0 10-4.2 55.7L64 64l26.6-26.6z" fill="currentColor" opacity="0.3"/><path d="M64 26.6a37.4 37.4 0 110 74.8A37.4 37.4 0 0164 26.6z"/><line x1="64" y1="64" x2="90" y2="38" stroke-width="6"/><circle cx="79" cy="49" r="5" fill="currentColor"/>` },
  ];

  const track = document.getElementById('tech-track');
  if (!track) return;

  // Build one set as a template string
  function makeSet() {
    return icons.map(({ label, color, svg }) => `
      <div class="tech-icon-item" data-color="${color}">
        <svg viewBox="0 0 128 128" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>
        <span>${label}</span>
      </div>`).join('');
  }

  // 2 identical sets. CSS animates -50% = exactly 1 set. Seamless loop.
  track.innerHTML = makeSet() + makeSet();

  // Hover color effect
  track.querySelectorAll('.tech-icon-item[data-color]').forEach(el => {
    const col = el.getAttribute('data-color');
    el.addEventListener('mouseenter', () => { el.style.color = col; });
    el.addEventListener('mouseleave', () => { el.style.color = ''; });
  });
})();

// ── Fix social icon focus state after click ──
document.querySelectorAll('.social-card').forEach(card => {
  card.addEventListener('click', () => {
    card.blur();
  });
});

// ── BACK TO TOP ──
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.form-btn');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const data = {
      name: document.getElementById('name')?.value || "",
      email: document.getElementById('email')?.value || "",
      message: document.getElementById('message')?.value || "",
    };

    try {
      const res = await fetch('https://formspree.io/f/mqegqwlv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        formStatus.textContent = "Message sent! I'll get back to you soon.";
        formStatus.className = 'form-status show success';
        contactForm.reset();
      } else {
        throw new Error('Failed');
      }
    } catch {
      formStatus.textContent = 'Something went wrong. Try emailing me directly.';
      formStatus.className = 'form-status show error';
    } finally {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }
  });
}