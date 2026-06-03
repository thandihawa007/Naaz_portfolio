import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Main Header bar ──────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          /* Left logo / right nav split */
          padding: '0 40px',
          background: scrolled ? 'rgba(10,10,10,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'background 500ms ease',
        }}
      >
        {/* ── Logo — far left ─────────────────────────────── */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          {/* Filled red-orange diamond — exactly like the reference */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7 0L14 7L7 14L0 7L7 0Z" fill="#FFFFFF" />
          </svg>

          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.01em',
              color: '#EFEFEF',
              lineHeight: 1,
            }}
          >
            Naazneet
          </span>
        </a>

        {/* ── Spacer ───────────────────────────────────────── */}
        <div style={{ flex: 1 }} />

        {/* ── Nav links + CTA — far right ──────────────────── */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          <a
            href="#about"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#888888',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EFEFEF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
          >
            About me
          </a>

          <a
            href="#work"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '14px',
              fontWeight: 400,
              color: '#888888',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'color 300ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#EFEFEF')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
          >
            Work
          </a>

          {/* "Get in touch!" pill — Sacred ID accent */}
          <motion.a
            href="https://www.linkedin.com/in/naazneet-mahal-6060aa326/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#0A0A0A',
              background: '#FFFFFF',
              padding: '9px 20px',
              borderRadius: '9999px',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
              transition: 'background 300ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#EFEFEF')}
            onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}
          >
            Get in touch!
          </motion.a>
        </nav>
      </motion.header>
    </>
  );
};

export default Navbar;
