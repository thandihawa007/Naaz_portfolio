 Hero Section — Right Panel: WebGL Animated Background

> **Reference:** The right ~60% of the hero section from Naazneet's portfolio design.
> This document is a complete implementation prompt for the animated topographic/fluid WebGL canvas that fills the right side of the hero.

---

## 🎯 Visual Goal

Recreate an **animated dark topographic map** that feels like a living terrain — fluid contour lines that slowly pulse, warp, and glow, with a single bright "light source" or glowing orb drifting through the surface. The overall mood is: **deep space meets geological survey — mysterious, technical, elegant.**

Key characteristics observed in the reference:
- Pure black (`#000000`) background
- ~20–30 thin white/light-gray contour lines (`rgba(255,255,255,0.12)` to `rgba(255,255,255,0.25)`) drawn as smooth curves
- Lines are NOT static — they breathe/morph slowly using noise
- One **glowing white light point** (like a star or lamp beneath the surface) that creates a local bloom/glow
- Scattered **tiny dot particles** (2–4px) floating across the canvas
- Small **crosshair / plus (+) markers** floating around the left-center area
- A text annotation in the upper right: *"ideas that build impact"* in a handwritten/cursive style with a small arrow
- A **floating square cursor** element (outlined box with a center dot) around mid-canvas
- Bottom-right has a vertical "SCROLL TO EXPLORE" label with a downward animated line/dot

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| `Three.js` (r134+) | WebGL renderer, scene, camera |
| `glsl` (inline ShaderMaterial) | Custom fragment shader for contour lines |
| `simplex-noise` or `glsl-noise` | Smooth organic animation |
| `gsap` (optional) | Orchestrating floating UI elements |
| Vanilla JS or React component | Wrapping layer |

---

## 📐 Layout & Sizing

```
.hero-right {
  position: absolute;
  right: 0;
  top: 0;
  width: 62%;           /* ~60-65% of viewport width */
  height: 100vh;
  overflow: hidden;
  pointer-events: none; /* let left panel receive clicks */
}

canvas#webgl-hero {
  width: 100%;
  height: 100%;
  display: block;
}
```

The left panel content overlaps slightly over this canvas (z-index layering). The canvas sits behind at `z-index: 0`.

---

## 🌊 WebGL Animation — Step-by-Step Implementation

### Step 1 — Scene Setup

```javascript
import * as THREE from 'three';

const canvas = document.getElementById('webgl-hero');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth * 0.65, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Orthographic camera for a flat 2D shader plane
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
camera.position.z = 1;
```

---

### Step 2 — Full-Screen Shader Plane

Create a single `PlaneGeometry` that fills the view, and drive everything through a GLSL fragment shader:

```javascript
const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime:       { value: 0.0 },
    uResolution: { value: new THREE.Vector2(canvas.width, canvas.height) },
    uMouse:      { value: new THREE.Vector2(0.5, 0.5) },  // normalized 0–1
    uLightPos:   { value: new THREE.Vector2(0.72, 0.48) }, // glowing orb position
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: FRAGMENT_SHADER_SOURCE, // see Step 3
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

---

### Step 3 — Fragment Shader (Core Visual)

This is the most important part. Paste this as your `FRAGMENT_SHADER_SOURCE`:

```glsl
precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform vec2  uLightPos;

varying vec2 vUv;

// ── Simplex-style noise helpers ──────────────────────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1  = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy  -= i1;
  i = mod289(i);
  vec3 p  = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m  = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m * m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// ─────────────────────────────────────────────────────────────────────────────

// Layered noise for organic terrain feel
float terrain(vec2 p) {
  float n  = snoise(p * 1.2 + uTime * 0.04) * 0.5;
        n += snoise(p * 2.4 - uTime * 0.03) * 0.25;
        n += snoise(p * 4.8 + uTime * 0.02) * 0.125;
        n += snoise(p * 9.6 - uTime * 0.015) * 0.0625;
  return n;
}

void main() {
  vec2 uv   = vUv;
  // Aspect-correct coordinates
  vec2 p    = uv * vec2(uResolution.x / uResolution.y, 1.0);

  // ── Terrain field ──────────────────────────────────────────────────────────
  float field = terrain(p);

  // ── Contour lines ─────────────────────────────────────────────────────────
  // Draw ~25 evenly spaced contour bands
  float lineCount  = 25.0;
  float contour    = fract(field * lineCount);
  float lineWidth  = 0.04;                         // relative band width
  float line       = smoothstep(lineWidth, 0.0, contour)
                   + smoothstep(1.0 - lineWidth, 1.0, contour);

  // Base color: very dark gray lines on pure black
  vec3 baseColor   = vec3(0.0);
  vec3 lineColor   = vec3(0.18);                   // ~rgba(46,46,46)
  vec3 col         = mix(baseColor, lineColor, line);

  // ── Light orb / glow ──────────────────────────────────────────────────────
  // Animated position: drifts slightly on a slow Lissajous path
  vec2 lightUV  = uLightPos
                + vec2(sin(uTime * 0.18) * 0.03, cos(uTime * 0.14) * 0.025);
  vec2 lightPos = lightUV * vec2(uResolution.x / uResolution.y, 1.0);
  float dist    = length(p - lightPos);

  // Wide, soft atmospheric bloom
  float bloom   = exp(-dist * 5.0) * 0.55;
  // Tight bright core
  float core    = exp(-dist * 35.0) * 1.2;

  col += vec3(bloom);
  col += vec3(core);

  // Highlight contour lines near the light (they appear brighter close to orb)
  float lightInfluence = exp(-dist * 3.5);
  col += line * lightInfluence * vec3(0.6, 0.6, 0.55);

  // ── Subtle mouse interaction ───────────────────────────────────────────────
  vec2 mousePos = uMouse * vec2(uResolution.x / uResolution.y, 1.0);
  float mDist   = length(p - mousePos);
  col          += line * exp(-mDist * 6.0) * 0.15;

  // ── Vignette ──────────────────────────────────────────────────────────────
  float vign = 1.0 - dot(uv - 0.5, (uv - 0.5) * 1.6);
  col *= vign;

  gl_FragColor = vec4(col, 1.0);
}
```

**What this produces:**
- Smooth animated topographic contour lines in near-black
- A drifting glowing orb with soft bloom + hard core
- Lines near the orb glow brighter (as seen in the reference)
- Subtle mouse-follow highlight
- Dark vignette at edges

---

### Step 4 — Animation Loop

```javascript
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();
  material.uniforms.uTime.value = elapsed;

  renderer.render(scene, camera);
}
animate();
```

---

### Step 5 — Mouse Tracking

```javascript
window.addEventListener('mousemove', (e) => {
  // Normalize to 0–1, flip Y for WebGL coords
  material.uniforms.uMouse.value.set(
    e.clientX / window.innerWidth,
    1.0 - e.clientY / window.innerHeight
  );
});
```

---

### Step 6 — Resize Handler

```javascript
window.addEventListener('resize', () => {
  const w = window.innerWidth * 0.65;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  material.uniforms.uResolution.value.set(w, h);
});
```

---

## ✨ Floating HTML Overlay Elements

These sit **on top of the canvas** via absolute positioning (pointer-events: none). They are pure HTML/CSS — NOT drawn in WebGL.

### 1. "ideas that build impact" annotation (top-right area)

```html
<div class="annotation annotation--top-right">
  <svg class="annotation__arrow" ...> <!-- small curved arrow pointing left --> </svg>
  <p>ideas<br>that build<br>impact</p>
</div>
```

```css
.annotation {
  position: absolute;
  top: 22%;
  right: 8%;
  font-family: 'Caveat', 'Dancing Script', cursive; /* match handwritten style */
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.4;
  text-align: right;
  animation: floatAnnotation 6s ease-in-out infinite;
}

@keyframes floatAnnotation {
  0%, 100% { transform: translateY(0px);   opacity: 0.75; }
  50%       { transform: translateY(-6px);  opacity: 0.95; }
}
```

### 2. Floating Square Cursor (mid-canvas)

```html
<div class="floating-cursor"></div>
```

```css
.floating-cursor {
  position: absolute;
  top: 48%;
  left: 46%;
  width: 28px;
  height: 28px;
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: cursorFloat 8s ease-in-out infinite;
}

.floating-cursor::after {
  content: '';
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
}

@keyframes cursorFloat {
  0%   { transform: translate(0,   0)   rotate(0deg); }
  33%  { transform: translate(6px, -8px) rotate(5deg); }
  66%  { transform: translate(-4px, 4px) rotate(-3deg); }
  100% { transform: translate(0,   0)   rotate(0deg); }
}
```

### 3. Crosshair / Plus markers (scattered)

```html
<span class="crosshair" style="top: 18%; left: 8%"></span>
<span class="crosshair" style="top: 31%; left: 15%"></span>
<span class="crosshair" style="top: 12%; left: 52%"></span>
```

```css
.crosshair {
  position: absolute;
  width: 12px;
  height: 12px;
  opacity: 0.35;
  animation: pulse 4s ease-in-out infinite;
}
.crosshair::before,
.crosshair::after {
  content: '';
  position: absolute;
  background: white;
}
.crosshair::before { width: 1px; height: 100%; left: 50%; top: 0; }
.crosshair::after  { height: 1px; width: 100%; top: 50%;  left: 0; }

@keyframes pulse {
  0%, 100% { opacity: 0.35; transform: scale(1);    }
  50%       { opacity: 0.65; transform: scale(1.25); }
}
```

### 4. Floating Dot Particles

Add 6–10 of these:

```html
<span class="dot-particle" style="top: 35%; left: 40%; animation-delay: 1.2s;"></span>
```

```css
.dot-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  animation: particleDrift 10s ease-in-out infinite;
}

@keyframes particleDrift {
  0%   { transform: translate(0, 0);    opacity: 0.5; }
  25%  { transform: translate(8px, -12px); opacity: 0.8; }
  50%  { transform: translate(15px, 3px);  opacity: 0.4; }
  75%  { transform: translate(5px, 14px);  opacity: 0.7; }
  100% { transform: translate(0, 0);    opacity: 0.5; }
}
```

### 5. "SCROLL TO EXPLORE" — Bottom Right

```html
<div class="scroll-hint">
  <span>SCROLL</span>
  <span>TO EXPLORE</span>
  <div class="scroll-line">
    <div class="scroll-dot"></div>
  </div>
</div>
```

```css
.scroll-hint {
  position: absolute;
  bottom: 5%;
  right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  color: rgba(255,255,255,0.4);
  font-family: 'Inter', sans-serif;
  writing-mode: vertical-rl;  /* rotates the text block vertically */
  text-orientation: mixed;
}

.scroll-line {
  width: 1px;
  height: 60px;
  background: rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
  margin-top: 8px;
}

.scroll-dot {
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: -1px;
  animation: scrollDrop 2s ease-in-out infinite;
}

@keyframes scrollDrop {
  0%   { top: 0%;   opacity: 1; }
  80%  { top: 100%; opacity: 0.3; }
  100% { top: 100%; opacity: 0; }
}
```

---

## 📦 Complete File Structure

```
hero/
├── HeroRight.jsx         ← React component (or hero-right.js for vanilla)
├── shaders/
│   └── topography.frag   ← Fragment shader (can also be inlined)
└── HeroRight.css         ← Overlay element styles
```

---

## 🔧 Performance Tips

- Set `renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))` — retina at full DPR is expensive
- Use `renderer.setAnimationLoop` instead of raw `requestAnimationFrame` for Three.js
- Wrap the canvas in `will-change: transform` for GPU compositing hint
- Throttle `mousemove` listener with `requestAnimationFrame` debounce
- On mobile: reduce `lineCount` in shader from `25.0` to `15.0` for perf

---

## 🎨 Color Reference

| Element | Value |
|---|---|
| Canvas background | `#000000` |
| Contour lines | `rgba(255,255,255,0.12)` to `rgba(255,255,255,0.20)` |
| Glowing orb core | `rgba(255,255,255,1.0)` |
| Bloom glow | `rgba(255,255,255,0.55)` falloff |
| Overlay text | `rgba(255,255,255,0.70)` |
| Crosshairs / dots | `rgba(255,255,255,0.35)` |

---

## 🔗 Dependencies

```bash
npm install three           # WebGL renderer
npm install gsap            # optional: for orchestrated overlay animations
```

For the handwritten font:
```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&display=swap" rel="stylesheet">
```

---

*Built to match: Naazneet's portfolio hero — right panel animated topographic WebGL background.*
