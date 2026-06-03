import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "Inspirhea V Edition",
    category: "MAGAZINE",
    tagline: "Ideas, insights, impact.",
    image: "/inspirhea.jpg",
    objectFit: "cover",
    href: "https://drive.google.com/file/d/1bnDJQHt7HlvdSS2byRnMTRTjQ2Lv-tZx/view?usp=sharing",
  },
  {
    id: 2,
    title: "Venture Vault '24",
    category: "BRANDING",
    tagline: "Elevating venture identity.",
    image: "/vvv.svg",
    objectFit: "contain",
    href: "https://drive.google.com/file/d/11s5XkW-lUoheX2fQG8n4kNCVIeOfWlXp/view?usp=sharing",
  },
  {
    id: 3,
    title: "Prerna Sprint Brochure",
    category: "BROCHURE",
    tagline: "Showcasing speed and spirit.",
    image: "/prerna.svg",
    objectFit: "contain",
    href: "https://drive.google.com/file/d/1hyiAc9P9ywYVhQPpnRtC084G5J80XBO2/view?usp=sharing",
  },
];

const Work = () => {
  return (
    <section
      id="work"
      style={{
        position: 'relative',
        padding: '72px 60px',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Top hairline */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />

      {/* Subtle vertical grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(90deg, rgba(163,151,131,0.02) 1px, transparent 1px)',
        backgroundSize: '25% 100%',
      }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── Header ──────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0, 0.4, 1] }}
            viewport={{ once: true }}
          >
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#FFFFFF', display: 'block', marginBottom: '16px',
            }}>
        
            </span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em',
              color: '#EFEFEF', margin: 0,
            }}>
              Projects
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#888888', background: 'none',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.querySelector('span').style.width = '40px';
              e.currentTarget.querySelector('span').style.background = '#FFFFFF';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#888888';
              e.currentTarget.querySelector('span').style.width = '24px';
              e.currentTarget.querySelector('span').style.background = '#555555';
            }}
          >
            
            <span style={{
              display: 'inline-block',
              width: '24px', height: '0.8px',
              background: '#555555',
              transition: 'width 300ms ease, background 300ms ease',
            }} />
          </motion.button>
        </div>

        {/* ── Projects grid ──────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {projects.map((project, index) => {
            const CardContent = (
              <>
                {/* Image container — gradient border shell */}
                <div style={{
                  padding: '1px',
                  background: '#1A1A1A',
                }}>
                  <div style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    {/* Ambient Blurred Backdrop for contained logo/banner graphics to prevent empty sidebars */}
                    {project.objectFit === 'contain' && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px) opacity(0.35)',
                        pointerEvents: 'none',
                        zIndex: 1,
                      }} />
                    )}

                    <img
                      src={project.image}
                      alt={project.title}
                      style={{
                        width: '100%', height: '100%',
                        objectFit: project.objectFit || 'cover',
                        filter: 'grayscale(25%)',
                        position: 'relative',
                        zIndex: 2,
                        transition: 'transform 900ms ease, filter 900ms ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.filter = 'grayscale(0%)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'grayscale(25%)'; }}
                    />

                    {/* Dark overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(0deg, rgba(10,10,10,0.6) 0%, transparent 60%)',
                      pointerEvents: 'none',
                    }} />

                    {/* Category tag */}
                    <div style={{
                      position: 'absolute', top: '16px', left: '16px',
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '10px', fontWeight: 500,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: '#FFFFFF',
                      background: 'rgba(10,10,10,0.7)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      border: '0.8px solid #FFFFFF',
                      zIndex: 10,
                    }}>
                      {project.category}
                    </div>
                  </div>
                </div>

                {/* Meta */}
                <div style={{
                  padding: '20px 0 28px',
                  borderBottom: '0.8px solid #1A1A1A',
                }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em',
                    color: '#EFEFEF', margin: '0 0 6px',
                    transition: 'color 300ms ease',
                    cursor: 'pointer',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
                    onMouseLeave={e => e.currentTarget.style.color = '#EFEFEF'}
                  >
                    {project.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '13px', fontWeight: 300,
                    color: '#888888', margin: 0,
                    fontStyle: 'italic',
                  }}>
                    "{project.tagline}"
                  </p>
                </div>
              </>
            );

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12, duration: 0.8, ease: [0.2, 0, 0.4, 1] }}
                viewport={{ once: true }}
                style={{ position: 'relative', background: 'transparent' }}
              >
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', display: 'block' }}
                    onMouseEnter={() => {
                      window.open(project.href, "_blank");
                    }}
                  >
                    {CardContent}
                  </a>
                ) : (
                  CardContent
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Bottom hairline */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />
    </section>
  );
};

export default Work;
