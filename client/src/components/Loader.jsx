import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <main
      className="loader-canvas"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 60%, #111111 0%, #0A0A0A 100%)',
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage:
          'linear-gradient(rgba(163,151,131,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(163,151,131,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Corner brackets */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '32px', left: '32px', width: '32px', height: '32px', borderTop: '0.8px solid rgba(163,151,131,0.3)', borderLeft: '0.8px solid rgba(163,151,131,0.3)' }} />
        <div style={{ position: 'absolute', top: '32px', right: '32px', width: '32px', height: '32px', borderTop: '0.8px solid rgba(163,151,131,0.3)', borderRight: '0.8px solid rgba(163,151,131,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '32px', left: '32px', width: '32px', height: '32px', borderBottom: '0.8px solid rgba(163,151,131,0.3)', borderLeft: '0.8px solid rgba(163,151,131,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '32px', right: '32px', width: '32px', height: '32px', borderBottom: '0.8px solid rgba(163,151,131,0.3)', borderRight: '0.8px solid rgba(163,151,131,0.3)' }} />
      </div>

      {/* Center cross-hair lines */}
      <div style={{ position: 'absolute', top: 0, left: '50%', width: '0.8px', height: '100%', background: 'rgba(163,151,131,0.04)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '0.8px', background: 'rgba(163,151,131,0.04)', pointerEvents: 'none' }} />

      {/* Central cluster */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px' }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0, 0.4, 1] }}
        >
          <span style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#FFFFFF', opacity: 0.8,
          }}>
            PORTFOLIO — 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.2, 0, 0.4, 1], delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(48px, 8vw, 80px)',
            fontWeight: 500,
            lineHeight: 1,
            letterSpacing: '-0.025em',
            color: '#EFEFEF',
            margin: 0,
            position: 'relative',
          }}
        >
          {/* RGB glitch offsets — subtle */}
          <span style={{
            position: 'absolute', inset: 0,
            color: 'rgba(255, 0, 60, 0.12)',
            transform: 'translateX(-2px)',
            filter: 'blur(1px)',
            pointerEvents: 'none',
          }}>
            NAAZNEET
          </span>
          <span style={{
            position: 'absolute', inset: 0,
            color: 'rgba(0, 255, 246, 0.10)',
            transform: 'translateX(2px)',
            filter: 'blur(1px)',
            pointerEvents: 'none',
          }}>
            NAAZNEET
          </span>
          NAAZNEET
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0, 0.4, 1] }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: '13px', fontWeight: 300,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#888888', margin: 0,
            fontStyle: 'italic',
          }}
        >
          BUILDING DIGITAL EXPERIENCES THAT FEEL ALIVE
        </motion.p>

        {/* Animated loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
          }}
        >
          <motion.div
            animate={{ height: [0, 40, 0], y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '0.8px',
              background: 'linear-gradient(to bottom, #FFFFFF, transparent)',
            }}
          />
        </motion.div>
      </div>

      {/* Decorative ambient glows */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', opacity: 0.5, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '40%', height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(163,151,131,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '40%', height: '40%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(163,151,131,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>
    </main>
  );
};

export default Loader;
