import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '28px', height: '28px',
          border: '0.8px solid #FFFFFF',
          borderRadius: '0px',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <div style={{ width: '3px', height: '3px', background: '#FFFFFF', borderRadius: '0px' }} />
      </motion.div>
      <style>{`
        body {
          cursor: none;
        }
        a, button {
          cursor: none;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
