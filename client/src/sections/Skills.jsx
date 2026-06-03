import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Matter from 'matter-js';

const skillData = [
  { name: 'React',      size: 110, isFeature: false },
  { name: 'Three.js',   size: 125, isFeature: true  },
  { name: 'WebGL',      size: 100, isFeature: false },
  { name: 'Tailwind',   size: 108, isFeature: false },
  { name: 'Framer',     size: 115, isFeature: false },
  { name: 'Node.js',    size: 100, isFeature: false },
  { name: 'TypeScript', size: 112, isFeature: false },
  { name: 'Next.js',    size: 128, isFeature: true  },
  { name: 'GSAP',       size: 98,  isFeature: false },
  { name: 'Figma',      size: 100, isFeature: false },
];

const Skills = () => {
  const sectionRef  = useRef(null);
  const sceneRef    = useRef(null);
  const bgCanvasRef = useRef(null);
  const bubbleRefs  = useRef([]);
  const glareRefs   = useRef([]);
  const engineRef   = useRef(null);
  const runnerRef   = useRef(null);
  const isInView    = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, World, Bodies, Body, Runner, Mouse, MouseConstraint, Events } = Matter;

    const width  = sceneRef.current.clientWidth  || 900;
    const height = sceneRef.current.clientHeight || 420;
    const cx     = width / 2;
    const cy     = height / 2;
    const scale  = window.innerWidth < 640 ? 0.7 : window.innerWidth < 1024 ? 0.82 : 1;

    const engine = Engine.create();
    engine.gravity.x = 0; engine.gravity.y = 0;
    engine.world.gravity.x = 0; engine.world.gravity.y = 0;
    engineRef.current = engine;

    const t = 150;
    World.add(engine.world, [
      Bodies.rectangle(-t/2,        cy,       t, height*2, { isStatic: true }),
      Bodies.rectangle(width + t/2, cy,       t, height*2, { isStatic: true }),
      Bodies.rectangle(cx,          -t/2,  width*2, t,     { isStatic: true }),
      Bodies.rectangle(cx, height + t/2,  width*2, t,     { isStatic: true }),
    ]);

    const scaledSkills = skillData.map((s) => ({
      ...s,
      size:       Math.round(s.size * scale),
      floatSpeed: (Math.PI * 2) / (4 + Math.random() * 2.5),
      phaseX:     Math.random() * Math.PI * 2,
      phaseY:     Math.random() * Math.PI * 2,
    }));

    const bodies = scaledSkills.map((skill, i) => {
      const angle  = i * ((Math.PI * 2) / scaledSkills.length);
      const radius = skill.isFeature ? 0 : 130 + Math.random() * 55;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      const b = Bodies.circle(x, y, skill.size / 2, {
        restitution: 0.88,
        frictionAir: 0.042,
        friction:    0.08,
        label:       skill.name,
      });
      b.skillData = skill;
      return b;
    });

    World.add(engine.world, bodies);

    const mouse = Mouse.create(sceneRef.current);
    const mc    = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.08, render: { visible: false } },
    });
    World.add(engine.world, mc);
    mouse.element.removeEventListener('mousewheel',     mouse.mousewheel);
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

    const mp = { x: -9999, y: -9999 };
    const onMove  = e => { const r = sceneRef.current.getBoundingClientRect(); mp.x = e.clientX - r.left; mp.y = e.clientY - r.top; };
    const onLeave = () => { mp.x = -9999; mp.y = -9999; };
    sceneRef.current.addEventListener('mousemove', onMove);
    sceneRef.current.addEventListener('mouseleave', onLeave);

    /* Ambient canvas particles — Sacred ID accent */
    let raf;
    const bgCanvas = bgCanvasRef.current;
    if (bgCanvas) {
      const ctx = bgCanvas.getContext('2d');
      bgCanvas.width  = width;
      bgCanvas.height = height;

      const particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        r: 0.6 + Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
        a: 0.04 + Math.random() * 0.14,
      }));

      const drawParticles = () => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.hypot(dx, dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(163,151,131,${0.035 * (1 - dist / 110)})`;
              ctx.lineWidth   = 0.4;
              ctx.stroke();
            }
          }
        }
        particles.forEach(p => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = width;  if (p.x > width)  p.x = 0;
          if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
          if (mp.x !== -9999) {
            const dx = p.x - mp.x, dy = p.y - mp.y, d = Math.hypot(dx, dy);
            if (d < 110) { const f = (110 - d) * 0.0025, a = Math.atan2(dy, dx); p.x += Math.cos(a)*f; p.y += Math.sin(a)*f; }
          }
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(163,151,131,${p.a})`; ctx.fill();
        });
        raf = requestAnimationFrame(drawParticles);
      };
      drawParticles();
    }

    Events.on(engine, 'beforeUpdate', () => {
      const tick = engine.timing.timestamp * 0.001;
      bodies.forEach(b => {
        const dx = cx - b.position.x, dy = cy - b.position.y;
        const d  = Math.hypot(dx, dy);
        const k  = d * 0.0000038 * (b.skillData.isFeature ? 1.5 : 1);
        Body.applyForce(b, b.position, { x: dx * k, y: dy * k });

        const fs = b.skillData.floatSpeed;
        const px = b.skillData.phaseX;
        const py = b.skillData.phaseY;
        Body.applyForce(b, b.position, {
          x: Math.sin(tick * fs + px) * 0.000055,
          y: Math.cos(tick * fs + py) * 0.000055,
        });

        if (mp.x !== -9999) {
          const mdx = b.position.x - mp.x, mdy = b.position.y - mp.y;
          const md  = Math.hypot(mdx, mdy);
          const rr  = 175 * scale;
          if (md < rr) {
            const f  = (rr - md) * 0.00024;
            const a  = Math.atan2(mdy, mdx);
            Body.applyForce(b, b.position, { x: Math.cos(a) * f, y: Math.sin(a) * f });
          }
        }
      });
    });

    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((b, i) => {
        const el = bubbleRefs.current[i];
        const gl = glareRefs.current[i];
        if (!el) return;
        const x = b.position.x - b.circleRadius;
        const y = b.position.y - b.circleRadius;
        el.style.transform = `translate3d(${x}px,${y}px,0) rotate(${b.angle}rad)`;
        if (gl) gl.style.transform = `rotate(${-b.angle}rad)`;
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;

    return () => {
      if (raf) cancelAnimationFrame(raf);
      sceneRef.current?.removeEventListener('mousemove', onMove);
      sceneRef.current?.removeEventListener('mouseleave', onLeave);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0, 0.4, 1] } },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '96px 60px',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Top hairline */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />

      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(163,151,131,0.03) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── Header ──────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}
        >
          <div>
            <motion.span
              variants={itemVariants}
              style={{
                display: 'block',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#FFFFFF', marginBottom: '16px',
              }}
            >
              Capability Matrix // 06
            </motion.span>
            <motion.h2
              variants={itemVariants}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(48px, 6vw, 88px)',
                fontWeight: 500, lineHeight: 1.0, letterSpacing: '-0.025em',
                color: '#EFEFEF', margin: 0,
              }}
            >
              Technical Arsenal
            </motion.h2>
            <motion.div
              variants={itemVariants}
              style={{ width: '48px', height: '0.8px', background: '#FFFFFF', marginTop: '24px' }}
            />
          </div>

          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}
          >
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#555555', margin: 0,
            }}>
              Physics-Enabled · Zero-G
            </p>
            <p style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#FFFFFF', opacity: 0.6, margin: 0,
            }}>
              Drag · Fling · Interact
            </p>
          </motion.div>
        </motion.div>

        {/* ── Physics stage ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.2, 0, 0.4, 1], delay: 0.3 }}
        >
          {/* Gradient border shell */}
          <div style={{
            padding: '1px',
            background: 'linear-gradient(135deg, #222222 0%, #1A1A1A 50%, #333333 100%)',
          }}>
            <div
              ref={sceneRef}
              style={{
                position: 'relative',
                width: '100%', height: '460px',
                background: 'rgba(10,10,10,0.96)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                overflow: 'hidden',
                userSelect: 'none',
                cursor: 'grab',
              }}
            >
              <canvas
                ref={bgCanvasRef}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
              />

              {/* Corner hint */}
              <div style={{
                position: 'absolute', top: '16px', right: '20px',
                fontFamily: "'Manrope', sans-serif",
                fontSize: '8px', color: 'rgba(163,151,131,0.25)',
                textTransform: 'uppercase', letterSpacing: '0.15em',
                pointerEvents: 'none', zIndex: 10,
              }}>
                [ Zero-G · Physics ]
              </div>

              {/* Skill balloons */}
              {skillData.map((skill, index) => {
                const s    = typeof window !== 'undefined' && window.innerWidth < 640 ? 0.7
                           : typeof window !== 'undefined' && window.innerWidth < 1024 ? 0.82
                           : 1;
                const size = Math.round(skill.size * s);

                return (
                  <div
                    key={skill.name}
                    ref={el => (bubbleRefs.current[index] = el)}
                    style={{
                      position: 'absolute',
                      width: size, height: size,
                      left: 0, top: 0,
                      borderRadius: '50%',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      userSelect: 'none', zIndex: 10,
                      cursor: 'grab',
                      /* Sacred ID glass bubble surface */
                      background: skill.isFeature
                        ? 'radial-gradient(circle at 35% 35%, rgba(163,151,131,0.18) 0%, rgba(26,26,26,0.85) 100%)'
                        : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06) 0%, rgba(10,10,10,0.82) 100%)',
                      border: skill.isFeature ? '0.8px solid #FFFFFF' : '0.8px solid #222222',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: skill.isFeature
                        ? 'inset 0 3px 16px rgba(163,151,131,0.10), 0 12px 40px rgba(0,0,0,0.7)'
                        : 'inset 0 2px 12px rgba(255,255,255,0.03), 0 8px 28px rgba(0,0,0,0.6)',
                      transition: 'border-color 300ms ease, box-shadow 300ms ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#FFFFFF';
                      e.currentTarget.style.boxShadow = 'inset 0 3px 18px rgba(163,151,131,0.14), 0 16px 44px rgba(0,0,0,0.75), 0 0 24px rgba(163,151,131,0.10)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = skill.isFeature ? '#FFFFFF' : '#222222';
                      e.currentTarget.style.boxShadow = skill.isFeature
                        ? 'inset 0 3px 16px rgba(163,151,131,0.10), 0 12px 40px rgba(0,0,0,0.7)'
                        : 'inset 0 2px 12px rgba(255,255,255,0.03), 0 8px 28px rgba(0,0,0,0.6)';
                    }}
                  >
                    {/* Gloss glint */}
                    <div
                      ref={el => (glareRefs.current[index] = el)}
                      style={{
                        position: 'absolute', top: '9%', left: '13%',
                        width: '36%', height: '18%',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
                        transform: 'rotate(-14deg)',
                        filter: 'blur(0.6px)',
                        pointerEvents: 'none',
                        opacity: 0.65,
                      }}
                    />

                    {/* Label */}
                    <span style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '8.5px', fontWeight: skill.isFeature ? 600 : 500,
                      letterSpacing: '0.08em', textAlign: 'center',
                      color: skill.isFeature ? '#FFFFFF' : '#888888',
                      padding: '0 8px',
                      transition: 'color 300ms ease',
                    }}>
                      {skill.name}
                    </span>

                    {/* Status dot */}
                    <span style={{
                      display: 'block',
                      width: '3px', height: '3px',
                      borderRadius: '50%',
                      background: skill.isFeature ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
                      marginTop: '5px',
                      opacity: 0.5,
                    }} />
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Bottom hairline */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />
    </section>
  );
};

export default Skills;
