import { useEffect, useState } from 'react';

// Tracks how far a build-up visual has assembled, by the furthest sequence-rank
// its `active` part has ever reached. Reveal is monotonic: autoplay (or stepping
// forward) grows it, but clicking an earlier part only re-selects - it never
// un-reveals what was already built. `order` must be a stable module constant.
//
// Returns `shown(i)` — whether part `i` is revealed yet — and `rank(i)`.
export default function useRevealProgress(order, active, startFull) {
  const rank = (i) => order.indexOf(i);
  const [maxRank, setMaxRank] = useState(startFull ? order.length - 1 : rank(active));

  useEffect(() => {
    setMaxRank((m) => Math.max(m, order.indexOf(active)));
  }, [order, active]);

  return { rank, shown: (i) => order.indexOf(i) <= maxRank };
}
