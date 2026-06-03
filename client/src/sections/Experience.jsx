import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Graphics Member",
    company: "GDG Cloud Chandigarh",
    period: "2026 – PRESENT",
    description: "Designed high-complexity promotional posters and visual assets for technical workshops, speaker sessions, and community events.Maintained consistent branding across digital platforms through collaborative design execution with the core team.",
    index: "001",
  },
  {
    role: "Graphic Designer & Core Team Member",
    company: "D4 Community",
    period: "2025 - Present",
    description: "Created engaging multi-format social media creatives, marketing visuals, and event branding assets using Adobe Creative Suite.Strengthened community presence through strategic visual storytelling and brand-consistent design systems.",
    index: "002",
  },
  {
    role: "Designing Head",
    company: "VentureNest — CGC Jhanjeri TBI Association",
    period: "2025 - 2026",
    description: "Led the complete branding direction for startup incubation events and investor pitch competitions.Designed startup branding kits, pitch deck visuals, and marketing collateral for multiple ventures.",
    index: "003",
  }
];

const Experience = () => {
  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        padding: '72px 60px',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Top hairline */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />

      {/* Vertical grid line accents */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(90deg, rgba(163,151,131,0.02) 1px, transparent 1px)',
        backgroundSize: '25% 100%',
      }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── Header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0.4, 1] }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
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
            color: '#EFEFEF', margin: '0 auto',
          }}>
            Experience
          </h2>
          <div style={{ width: '48px', height: '0.8px', background: '#FFFFFF', margin: '24px auto 0' }} />
        </motion.div>

        {/* ── Experience list ─────────────────────────────── */}
        <div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12, duration: 0.8, ease: [0.2, 0, 0.4, 1] }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 2fr auto',
                gap: '40px',
                alignItems: 'center',
                padding: '40px 0',
                borderBottom: '0.8px solid #1A1A1A',
                cursor: 'default',
                transition: 'background 300ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,26,26,0.4)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Index */}
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '28px', fontWeight: 400,
                color: '#222222', lineHeight: 1,
                userSelect: 'none',
                transition: 'color 300ms ease',
              }}>
                {exp.index}
              </div>

              {/* Period + Company */}
              <div>
                <div style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#555555', marginBottom: '8px',
                }}>
                  {exp.period}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '22px', fontWeight: 500, letterSpacing: '-0.01em',
                  color: '#EFEFEF', margin: 0,
                  transition: 'color 300ms ease',
                }}>
                  {exp.company}
                </h3>
              </div>

              {/* Role + Description */}
              <div>
                <h4 style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '14px', fontWeight: 500,
                  letterSpacing: '0.04em',
                  color: '#FFFFFF', margin: '0 0 10px',
                }}>
                  {exp.role}
                </h4>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '14px', fontWeight: 300, lineHeight: '22px',
                  color: '#888888', margin: 0,
                }}>
                  {exp.description}
                </p>
              </div>

              {/* Arrow indicator */}
              <div style={{
                width: '24px', height: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0.3,
                transition: 'opacity 300ms ease, transform 300ms ease',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="square"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom hairline */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />
    </section>
  );
};

export default Experience;
