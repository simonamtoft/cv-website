import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../config';

const ALL_ROUTES = ['/', ...config.navigation.map((n) => n.href)];

const MIN_DISTANCE = 70;        // px of horizontal travel required
const RATIO_THRESHOLD = 1.4;    // |dx| must exceed RATIO * |dy| (avoid vertical scrolls)
const MAX_DURATION = 600;       // ms — anything slower is a drag, not a swipe
const EDGE_IGNORE = 24;         // px from screen edges (avoids iOS back-gesture conflict)

const isHorizontallyScrollable = (target) => {
  let el = target;
  while (el && el !== document.body) {
    const style = window.getComputedStyle(el);
    if (
      (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
      el.scrollWidth > el.clientWidth
    ) {
      return true;
    }
    el = el.parentElement;
  }
  return false;
};

const isInteractiveTarget = (target) => {
  if (!target) return false;
  if (target.closest('input, textarea, select, button, [contenteditable="true"]')) return true;
  if (target.closest('.modal-backdrop')) return true;
  return isHorizontallyScrollable(target);
};

export function useSwipeNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let active = false;

    const onTouchStart = (e) => {
      if (e.touches.length !== 1) {
        active = false;
        return;
      }
      const t = e.touches[0];
      if (t.clientX < EDGE_IGNORE || t.clientX > window.innerWidth - EDGE_IGNORE) {
        active = false;
        return;
      }
      if (isInteractiveTarget(e.target)) {
        active = false;
        return;
      }
      startX = t.clientX;
      startY = t.clientY;
      startTime = Date.now();
      active = true;
    };

    const onTouchEnd = (e) => {
      if (!active) return;
      active = false;

      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const dt = Date.now() - startTime;

      if (dt > MAX_DURATION) return;
      if (Math.abs(dx) < MIN_DISTANCE) return;
      if (Math.abs(dx) < RATIO_THRESHOLD * Math.abs(dy)) return;

      const idx = ALL_ROUTES.indexOf(pathname);
      if (idx === -1) return;

      // swipe left  (dx < 0) → next page
      // swipe right (dx > 0) → previous page
      if (dx < 0 && idx < ALL_ROUTES.length - 1) navigate(ALL_ROUTES[idx + 1]);
      else if (dx > 0 && idx > 0) navigate(ALL_ROUTES[idx - 1]);
    };

    const onTouchCancel = () => {
      active = false;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchCancel, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchCancel);
    };
  }, [pathname, navigate]);
}
