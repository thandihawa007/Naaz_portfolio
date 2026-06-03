import React from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Work from './sections/Work';
import About from './sections/About';
import Experience from './sections/Experience';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  return (
    <div style={{ position: 'relative', background: '#050505', minHeight: '100vh' }}>
      {/* Global Grain Texture */}
      <div className="grain-overlay" />

      {/* Interactive topographic canvas background */}
      <InteractiveBackground />

      <CustomCursor />
      <Navbar />

      {/* Main Content */}
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Work />
        <About />
        <Experience />
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        style={{
          position: 'relative',
          padding: '80px 60px 48px',
          background: 'transparent',
          borderTop: '0.8px solid #222222',
          zIndex: 10,
        }}
      >

        {/* Subtle vertical grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(90deg, rgba(163,151,131,0.018) 1px, transparent 1px)',
          backgroundSize: '25% 100%',
        }} />

        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

          {/* ── CTA block ──────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
            <div>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#FFFFFF', display: 'block', marginBottom: '20px',
              }}>
                Let's Collaborate
              </span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(28px, 3.5vw, 48px)',
                fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em',
                color: '#EFEFEF', margin: 0,
              }}>
                Ready to build?
              </h2>
            </div>

            <a
              href="mailto:naazneetm@gmail.com"
              className="btn-primary"
              style={{ fontSize: '12px' }}
            >
              Start a project
            </a>
          </div>

          {/* ── Divider ────────────────────────────────────── */}
          <div style={{ height: '0.8px', background: '#1A1A1A', marginBottom: '40px' }} />

          {/* ── Bottom meta row ────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '16px', fontWeight: 500,
              letterSpacing: '0.05em', color: '#333333',
            }}>
              © NAAZNEET 2026
            </span>

            <span style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '10px', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#333333',
            }}>

            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
