import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const coreSkills = [
    'React / Next.js',
    'UI/UX Design',
    'Tailwind CSS',
    'JavaScript',
    'Figma',
    'Responsive Design',
  ];

  const contactItems = [
    {
      id: 'email',
      label: 'Email',
      value: 'naazneetm@gmail.com',
      href: 'mailto:naazneetm@gmail.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/naazneet-mahal',
      href: 'https://www.linkedin.com/in/naazneet-mahal-6060aa326/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '96px 60px',
        background: 'transparent',
        overflow: 'hidden',
      }}
    >
      {/* Top & bottom hairline rules */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '0.8px', background: '#222222' }} />

      {/* Subtle vertical grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(90deg, rgba(163,151,131,0.025) 1px, transparent 1px)',
        backgroundSize: '25% 100%',
      }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* ── Two-column visual layout ─────────────────────── */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '80px',
          flexWrap: 'wrap',
          width: '100%',
        }}>

          {/* LEFT COLUMN — About content (60% width target) */}
          <div style={{
            flex: '1 1 640px',
            maxWidth: '780px',
            width: '100%',
          }}>

            {/* Text Content and Interactive Sections */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0, 0.4, 1] }}
              viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
            >
              {/* Elegant glassmorphic greeting card - speech bubble style */}
              <div style={{
                background: '#1A1A1A',
                border: '0.8px solid #222222',
                padding: '24px 64px',
                borderRadius: '9999px', // Makes it a beautiful oval / pill shape
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'fit-content',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
              }}>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: 500,
                  color: '#EFEFEF',
                  margin: 0,
                  lineHeight: 1.1,
                  textAlign: 'center',
                }}>
                  Hi, I'm Naazneet Mahal!
                </h3>
              </div>

              {/* Bio text */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: '28px',
                  color: '#888888',
                  margin: 0,
                }}>
                  I'm a Web Developer and UI/UX Designer passionate about crafting modern digital experiences
                  that blend functionality with refined visual design. I focus on building responsive,
                  user-centric interfaces that feel intuitive, seamless, and impactful across every screen.
                </p>
                <p style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '16px',
                  fontWeight: 300,
                  lineHeight: '28px',
                  color: '#888888',
                  margin: 0,
                }}>
                  With a strong foundation in frontend development and creative design, I transform ideas into
                  polished digital products using clean code and thoughtful user experience principles. My approach
                  combines aesthetics, performance, and usability to create experiences that are both visually
                  compelling and technically efficient.
                </p>
              </div>

              {/* Core Skills & Contact Me side-by-side grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
                borderTop: '0.8px solid #222222',
                paddingTop: '32px',
              }}>
                {/* Skills block */}
                <div>
                  <h4 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    margin: '0 0 20px 0',
                  }}>
                    Core Skills
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}>
                    {coreSkills.map((skill) => (
                      <div
                        key={skill}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <span style={{
                          width: '4px',
                          height: '4px',
                          background: '#FFFFFF',
                          flexShrink: 0,
                        }} />
                        <span style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '14px',
                          fontWeight: 300,
                          color: '#888888',
                        }}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Contact Me block */}
                <div>
                  <h4 style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                    margin: '0 0 20px 0',
                  }}>
                    Contact me
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}>
                    {contactItems.map((item) => (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        target={item.id !== 'email' ? '_blank' : undefined}
                        rel={item.id !== 'email' ? 'noopener noreferrer' : undefined}
                        whileHover={{ x: 6 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '12px',
                          textDecoration: 'none',
                          color: '#888888',
                          width: 'fit-content',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#EFEFEF';
                          e.currentTarget.querySelector('svg').style.stroke = '#FFFFFF';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#888888';
                          e.currentTarget.querySelector('svg').style.stroke = 'currentColor';
                        }}
                      >
                        <span style={{
                          color: 'currentColor',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'color 300ms ease',
                        }}>
                          {item.icon}
                        </span>
                        <span style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '14px',
                          fontWeight: 300,
                          transition: 'color 300ms ease',
                        }}>
                          {item.value}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>

          </div>

          {/* RIGHT COLUMN — Premium Work SVG Illustration panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.2, 0, 0.4, 1] }}
            viewport={{ once: true }}
            style={{
              flex: '1 1 320px',
              maxWidth: '420px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10,
              margin: '0 auto',
            }}
          >
            <img
              src="/untitled_design.svg"
              alt="About me graphic illustration"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'grayscale(20%) brightness(0.9)',
                transition: 'filter 600ms ease, transform 600ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.filter = 'grayscale(0%) brightness(1.0)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.filter = 'grayscale(20%) brightness(0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
