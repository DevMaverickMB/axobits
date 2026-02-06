import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let idleTimer: ReturnType<typeof setTimeout>;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Show cursor when moving
      cursor.style.opacity = '1';
      
      // Clear existing timer
      clearTimeout(idleTimer);
      
      // Set new timer to hide after 0.5 seconds
      idleTimer = setTimeout(() => {
        cursor.style.opacity = '0';
      }, 500);
    };

    const animateCursor = () => {
      // Decreased easing from 0.12 to 0.08 for a smoother, more "liquid" lag
      const ease = 0.08;
      
      // Calculate distance to move
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      currentX += dx * ease;
      currentY += dy * ease;

      // Calculate velocity for "liquid" stretch effect
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const maxStretch = 1.5; // Max stretch factor
      const scale = Math.min(1 + velocity * 0.005, maxStretch);
      const angle = Math.atan2(dy, dx); // Angle of movement

      // Apply translation + rotation + scale (stretch)
      cursor.style.transform = `
          translate(${currentX}px, ${currentY}px) 
          translate(-50%, -50%) 
          rotate(${angle}rad) 
          scale(${scale}, ${1 / scale})
      `;
      
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div 
      id="cursor-glow" 
      ref={cursorRef}
      className="fixed top-0 left-0 w-[600px] h-[600px] pointer-events-none z-0 opacity-0 transition-opacity duration-500 will-change-[transform,opacity] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(99, 91, 255, 0.10) 0%, rgba(99, 91, 255, 0) 60%)'
      }}
    ></div>
  );
};

export default CursorGlow;
