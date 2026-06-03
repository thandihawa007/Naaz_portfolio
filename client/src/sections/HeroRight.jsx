import React from 'react';

const HeroRight = () => {
  return (
    <div className="hero-right">
      {/* ── Floating annotations / text overlay ── */}
      <div className="annotation annotation--top-right">
        {/* Curved arrow pointing left */}
        <svg width="42" height="28" viewBox="0 0 42 28" fill="none" style={{ display: 'block', marginLeft: 'auto', marginBottom: '6px', opacity: 0.7 }}>
          <path d="M36 6 C28 14, 18 12, 8 18 M8 18 L14 21 M8 18 L11 12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>ideas<br />that build<br />impact</span>
      </div>
      {/* ── Scattered pulsing crosshairs ── */}
      <span className="crosshair" style={{ top: '18%', left: '8%' }}></span>
      <span className="crosshair" style={{ top: '35%', left: '22%' }}></span>
      <span className="crosshair" style={{ top: '15%', left: '55%' }}></span>
      <span className="crosshair" style={{ top: '68%', left: '42%' }}></span>

      {/* ── Scattered drifting dot particles ── */}
      <span className="dot-particle" style={{ top: '35%', left: '40%', animationDelay: '0.8s' }}></span>
      <span className="dot-particle" style={{ top: '22%', left: '16%', animationDelay: '2.5s' }}></span>
      <span className="dot-particle" style={{ top: '65%', left: '26%', animationDelay: '1.2s' }}></span>
      <span className="dot-particle" style={{ top: '50%', left: '62%', animationDelay: '4.1s' }}></span>
      <span className="dot-particle" style={{ top: '14%', left: '72%', animationDelay: '3s' }}></span>

      {/* ── SCROLL TO EXPLORE vertical hint ── */}
      <div className="scroll-hint">
        <span>SCROLL</span>
        <span>TO EXPLORE</span>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
