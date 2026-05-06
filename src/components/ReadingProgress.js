import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ReadingProgress.css';

const ReadingProgress = () => {
  const { pathname } = useLocation();
  const [pct, setPct] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const { scrollY } = window;
        const { scrollHeight, clientHeight } = document.documentElement;
        const total = scrollHeight - clientHeight;
        setPct(total > 0 ? (scrollY / total) * 100 : 0);
        raf.current = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (pathname === '/') return null;

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div className="reading-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
};

export default ReadingProgress;
