import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx = canvas.getContext('2d');
    let animationFrameId;

    const state = {
      width: window.innerWidth,
      height: window.innerHeight,
      time: 0,
      targetMouseX: window.innerWidth / 2,
      targetMouseY: window.innerHeight / 2,
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      targetHoverIntensity: 0,
      hoverIntensity: 0,
      scrollY: window.scrollY,
      targetScrollY: window.scrollY,
    };

    const handleResize = () => {
      state.width = canvas.width = window.innerWidth;
      state.height = canvas.height = window.innerHeight;
    };

    let lastMoveTime = Date.now();

    const handleMouseMove = (e) => {
      state.targetMouseX = e.clientX;
      state.targetMouseY = e.clientY;
      state.targetHoverIntensity = 1.0;
      lastMoveTime = Date.now();
    };

    const handleMouseLeave = () => {
      state.targetHoverIntensity = 0.0;
    };

    const handleScroll = () => {
      state.targetScrollY = window.scrollY;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // Color definitions for elegant dark grey topographic map lines
    const colors = ['#202020', '#2a2a2a', '#333333', '#3d3d3d'];

    const render = () => {
      state.time += 0.015; // morphed wave progression speed (5-7s per cycle)

      // Smooth inertia lerping
      state.mouseX += (state.targetMouseX - state.mouseX) * 0.07;
      state.mouseY += (state.targetMouseY - state.mouseY) * 0.07;
      state.scrollY += (state.targetScrollY - state.scrollY) * 0.08;

      // Inactivity timeout: Fade cursor influence to 0 after 3.5s of no movement
      if (Date.now() - lastMoveTime > 3500) {
        state.targetHoverIntensity = 0.0;
      }
      state.hoverIntensity += (state.targetHoverIntensity - state.hoverIntensity) * 0.05;

      ctx.clearRect(0, 0, state.width, state.height);

      // 1. Solid matte black background
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, state.width, state.height);

      // Subtle premium volumetric smoke-glow / ink-dispersion realism detail
      ctx.shadowColor = 'rgba(255, 255, 255, 0.03)';
      ctx.shadowBlur = 4;

      // 2. Draw Concentric Topographic Loop Islands (Peak Contours/Fingerprints)
      // Responsive coordinate scaling: prevent islands from slipping off-screen
      const peaks = [
        { cx: 0.8, cy: 0.28, radiusBase: 45, loops: 5, spacing: 14, speed: 0.12, angle: 0.6 },
        { cx: 0.2, cy: 0.72, radiusBase: 35, loops: 4, spacing: 12, speed: -0.10, angle: -0.4 }
      ];

      peaks.forEach((peak) => {
        // Adjust coordinates relative to current dimensions
        const centerX = state.width * peak.cx + Math.sin(state.time * peak.speed) * 35;
        const centerY = state.height * peak.cy + Math.cos(state.time * peak.speed * 0.8) * 35;

        // Draw the shining star inside the top-right peak (peak.cx === 0.8) before drawing its circles
        if (peak.cx === 0.8) {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          
          // Apply scroll parallax to star's centerY matching the loops
          const starY = centerY + state.scrollY * 0.12;

          const maxGlowRadius = 380;
          const radialGrad = ctx.createRadialGradient(centerX, starY, 0, centerX, starY, maxGlowRadius);
          radialGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');     // tight bright core
          radialGrad.addColorStop(0.02, 'rgba(255, 255, 255, 0.92)');
          radialGrad.addColorStop(0.06, 'rgba(255, 255, 255, 0.52)');  // bright inner glow
          radialGrad.addColorStop(0.12, 'rgba(255, 255, 255, 0.28)');  // soft transition
          radialGrad.addColorStop(0.25, 'rgba(255, 255, 255, 0.11)');  // wide soft bloom
          radialGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.04)');  // outer atmospheric glow
          radialGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');    // fade out

          ctx.fillStyle = radialGrad;
          ctx.beginPath();
          ctx.arc(centerX, starY, maxGlowRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        for (let j = 0; j < peak.loops; j++) {
          ctx.beginPath();
          
          const opacity = (j % 3 === 0 ? 0.75 : 0.4) * 0.9;
          const strokeColor = colors[j % colors.length];
          ctx.strokeStyle = strokeColor;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = j % 2 === 0 ? 1.4 : 0.9;

          // Non-linear spacing gradient (loops broaden naturally as they ripple outwards)
          const currentRadius = peak.radiusBase + Math.pow(j, 1.15) * peak.spacing;

          for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.04) {
            let r;
            let rx, ry;

            if (peak.cx === 0.8) {
              // Perfectly round concentric circles breathing in a slow elegant pulse
              const breathing = Math.sin(state.time * 0.4 + j * 0.05) * 3.5;
              r = currentRadius + breathing;
              rx = Math.cos(a) * r;
              ry = Math.sin(a) * r;
            } else {
              // Apply wobbly fingerprint distortion using overlapping sine frequencies
              const wobble = Math.sin(a * 4 + state.time * 0.8 + j * 0.3) * 12;
              const secondaryWobble = Math.cos(a * 7 - state.time * 0.4 + j * 0.1) * 5;
              const microNoise = Math.sin(a * 50 + state.time * 2) * 0.35; // high-frequency micro-wobble
              r = currentRadius + wobble + secondaryWobble + microNoise;

              // Asymmetrical ellipse stretching
              rx = Math.cos(a) * r * 1.35;
              ry = Math.sin(a) * r * 0.85;
            }

            // Rotate peaks organically to form premium topographic whorls
            const cosRot = Math.cos(peak.angle);
            const sinRot = Math.sin(peak.angle);
            let px = centerX + (rx * cosRot - ry * sinRot);
            let py = centerY + (rx * sinRot + ry * cosRot);

            // Parallax scroll shift (unify coefficients for top-right peak to stay concentric)
            if (peak.cx === 0.8) {
              py += state.scrollY * 0.12;
            } else {
              py += state.scrollY * 0.14 * (j % 2 === 0 ? 1 : -1);
            }

            // Mouse proximity energy bend with lerping hoverIntensity
            if (state.hoverIntensity > 0.01) {
              const dx = px - state.mouseX;
              const dy = py - state.mouseY;
              const dist = Math.hypot(dx, dy);
              const forceRadius = 180;

              if (dist < forceRadius) {
                const force = Math.pow((forceRadius - dist) / forceRadius, 2.2) * state.hoverIntensity;
                const angle = Math.atan2(dy, dx);
                px += Math.cos(angle) * force * 50;
                py += Math.sin(angle) * force * 50;
              }
            }

            if (a === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }
      });

      // 3. Draw Organic Sweeping Contours (Three-Layered Depth & Marble Veins)
      const lineCount = 14;
      
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();

        // Assign each sweeping line to one of three depth layers
        // Layer 0: Background (0-3), Layer 1: Midground (4-9), Layer 2: Foreground (10-13)
        let depthLayer = 1;
        if (i < 4) depthLayer = 0;
        else if (i >= 10) depthLayer = 2;

        let strokeColor = colors[i % colors.length];
        let opacity = 0.5;
        let lineWidth = 1.2;
        let speedMultiplier = 1.0;
        let mouseForceMultiplier = 1.0;
        let scrollParallaxMultiplier = 0.12;

        if (depthLayer === 0) {
          // Background - thin, soft, slow, minimal mouse reactivity
          opacity = 0.24;
          lineWidth = 0.8;
          speedMultiplier = 0.6;
          mouseForceMultiplier = 0.3;
          scrollParallaxMultiplier = 0.06;
        } else if (depthLayer === 2) {
          // Foreground - thicker, brighter, responsive, strong parallax
          opacity = 0.72;
          lineWidth = 1.8;
          speedMultiplier = 1.4;
          mouseForceMultiplier = 1.35;
          scrollParallaxMultiplier = 0.18;
        } else {
          // Midground
          opacity = 0.48;
          lineWidth = 1.3;
          speedMultiplier = 1.0;
          mouseForceMultiplier = 0.9;
          scrollParallaxMultiplier = 0.12;
        }

        // Apply density band clustering
        const isCluster = i % 4 === 0 || i % 7 === 0;
        if (isCluster) {
          opacity *= 1.25;
          lineWidth *= 1.2;
        }

        ctx.strokeStyle = strokeColor;
        ctx.globalAlpha = Math.min(opacity, 0.95);
        ctx.lineWidth = lineWidth;

        // Modulate vertical start position with a slow large-scale sine wave for variable clustering
        const clusterBanding = Math.sin(i * 0.35 + state.time * 0.2 * speedMultiplier) * 55;
        const rowY = (state.height / (lineCount - 1)) * i + clusterBanding;
        const step = 8;

        for (let x = 0; x <= state.width; x += step) {
          // Complex non-linear, flowing marble vein equation
          const waveFreqX = x * 0.0018 + rowY * 0.0022 + state.time * 0.2 * speedMultiplier;
          const waveFreqY = x * 0.0028 - rowY * 0.0015 + state.time * 0.3 * speedMultiplier;
          
          let px = x + Math.cos(waveFreqX) * 60;
          let py = rowY + Math.sin(waveFreqY) * 75;

          // Introduce subtle high-frequency imperfections/grit to sweeping waves
          const microNoise = Math.sin(x * 0.35 + state.time * 1.5) * 0.4;
          py += microNoise;

          // Parallax shift
          py += state.scrollY * scrollParallaxMultiplier * (i % 2 === 0 ? 1 : -1);

          // Mouse reactive warp
          if (state.hoverIntensity > 0.01) {
            const dx = px - state.mouseX;
            const dy = py - state.mouseY;
            const dist = Math.hypot(dx, dy);
            const forceRadius = 200;

            if (dist < forceRadius) {
              const force = Math.pow((forceRadius - dist) / forceRadius, 2.0) * state.hoverIntensity * mouseForceMultiplier;
              const angle = Math.atan2(dy, dx);
              px += Math.cos(angle) * force * 55;
              py += Math.sin(angle) * force * 55;
            }
          }

          if (x === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.stroke();
      }

      ctx.globalAlpha = 1.0;
      // Reset shadows for any external canvas overlay operations
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#050505',
      }}
    />
  );
};

export default InteractiveBackground;
