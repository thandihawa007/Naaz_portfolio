import React from 'react';
import { motion } from 'framer-motion';
import HeroRight from './HeroRight';

const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'transparent',
        overflow: 'hidden',
        padding: '80px 60px 80px', // Exact 60px left/right padding to align with Work & About
      }}
    >
      {/* Subtle grid backdrop */}
      <div
        className="grid-bg"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />

      {/* ── WebGL Topographic Background & Floating Elements on the Right ── */}
      <HeroRight />

      {/* Left side volumetric glows */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '2%',
        width: '280px', height: '280px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* ── Outer alignment container — matches 1440px site width ── */}
      <div style={{
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* ══ Left-Aligned vertical content stack — compact & intentional ══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.2, 0, 0.4, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            gap: '16px', // tight vertical grouping
            maxWidth: '500px', // compact left focus
          }}
        >
          {/* ── Profile block with adjacent availability indicators ── */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px', zIndex: 12 }}>

            {/* Circular profile image container */}
            <div style={{
              position: 'relative',
              width: '100px', // Compact elegant profile circle as shown in the reference
              height: '100px',
              borderRadius: '50%',
              overflow: 'hidden',
              background: 'rgba(10, 10, 10, 0.6)',
              border: '0.8px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}>
              <img
                src="/mypic.png"
                alt="Naazneet profile picture"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: 'scale(1.15)',
                }}
              />
            </div>

            {/* "Available for new projects" indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FFFFFF',
              }}>
                {/* Pulsing glow ring */}
                <span className="animate-ping" style={{
                  position: 'absolute',
                  display: 'inline-flex',
                  height: '100%',
                  width: '100%',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  opacity: 0.75,
                }}></span>
              </span>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.05em',
              }}>
                Available for new projects
              </span>
            </div>
          </div>

          {/* ── Large handwritten white greeting SVG ── */}
          <div style={{ 
            maxWidth: '380px', 
            width: '100%', 
            marginTop: '-16px', // Overlaps the circle curve slightly
            marginBottom: '-12px',
            position: 'relative',
            zIndex: 5,
          }}>
            <img 
              src="/hi_im_naazneet.svg" 
              alt="Hi, I'm Naazneet!" 
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* ── Bio paragraph ── */}
          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '14px',
            fontWeight: 300,
            lineHeight: '22px',
            color: '#888888',
            margin: '0 0 8px 0',
            maxWidth: '380px',
          }}>
            Passionate about building thoughtful digital products, I combine technical skills with a user-centered mindset to create experiences that are simple, effective, and impactful.
          </p>

          {/* ── LinkedIn rounded pill button with glassmorphic smoothness ── */}
          <motion.a
            href="https://www.linkedin.com/in/naazneet-mahal-6060aa326/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, background: 'rgba(255, 255, 255, 0.04)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 24px',
              background: 'transparent',
              border: '0.8px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'border-color 300ms ease',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              marginTop: '8px',
              marginBottom: '28px',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
          >
            {/* Diagonal arrow icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
            }}>
              linkedin.com/in/naazneet-mahal
            </span>
          </motion.a>

          {/* ── Bottom social bar & cursive invitation ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px', position: 'relative', width: '100%', marginTop: '16px' }}>
            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <a href="https://github.com/thandihawa007" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.45)', transition: 'color 300ms ease' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/naazneet-mahal-6060aa326/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.45)', transition: 'color 300ms ease' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="mailto:naazneetm@gmail.com" style={{ color: 'rgba(255, 255, 255, 0.45)', transition: 'color 300ms ease' }} onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.45)'}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>

            {/* Vertical Separator line */}
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.12)' }} />

            {/* Cursive invitation text & underline */}
            <div className="annotation annotation--bottom-together">
              <span style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', display: 'block' }}>
                Let's create something meaningful together!
              </span>
              <svg width="180" height="12" viewBox="0 0 180 12" fill="none" style={{ display: 'block', marginTop: '2px', opacity: 0.4 }}>
                <path d="M2 6 Q45 2, 90 6 T178 6" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom hairline separator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '0.8px', background: '#1E1E1E',
      }} />
    </section>
  );
};

export default Hero;
