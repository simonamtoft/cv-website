import React, { useEffect, useRef } from 'react';
import '../styles/PageTransition.css';

const PageTransition = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    void el.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('page-enter-active')));
  }, []);

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  );
};

export default PageTransition;
