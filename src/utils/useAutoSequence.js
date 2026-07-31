import { useCallback, useEffect, useRef } from 'react';

// Auto-plays a visual's step sequence when it scrolls into view in the reading
// essay: advances `setIndex` through `order` once (one step per `interval`),
// then stops. Replays if it leaves and re-enters. Any user interaction should
// call the returned `cancel`, which permanently stops autoplay so the reader
// stays in control. Respects prefers-reduced-motion, and is a no-op when
// `enabled` is false (e.g. presentation mode) or off the client (prerender).
//
// `order` must be a stable reference (define it as a module constant), otherwise
// the effect re-runs every render.
export default function useAutoSequence({ order, setIndex, enabled, interval = 1300 }) {
  const ref = useRef(null);
  const cancelledRef = useRef(false);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let timer = null;
    let playing = false;
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    const play = () => {
      stop();
      // Reduced motion: skip the animation, jump straight to the final state.
      if (reduced) {
        setIndex(order[order.length - 1]);
        return;
      }
      let step = 0;
      setIndex(order[0]);
      timer = setInterval(() => {
        step += 1;
        if (cancelledRef.current || step >= order.length) {
          stop();
          return;
        }
        setIndex(order[step]);
      }, interval);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (cancelledRef.current) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.5) {
          if (!playing) {
            playing = true;
            play();
          }
        } else if (!e.isIntersecting) {
          playing = false;
          stop();
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [enabled, order, setIndex, interval]);

  return { ref, cancel };
}
