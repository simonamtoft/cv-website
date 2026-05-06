import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config';

const ALL_ROUTES = ['/', ...config.navigation.map(n => n.href)];

export function useKeyboardNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      const tag = document.activeElement?.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(tag)) return;
      if (document.activeElement?.isContentEditable) return;

      const idx = ALL_ROUTES.indexOf(pathname);
      if (e.key === 'ArrowRight' && idx < ALL_ROUTES.length - 1) navigate(ALL_ROUTES[idx + 1]);
      if (e.key === 'ArrowLeft' && idx > 0) navigate(ALL_ROUTES[idx - 1]);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [pathname, navigate]);
}
