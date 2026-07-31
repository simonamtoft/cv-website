import { useEffect, useState } from 'react';

// Reveals `text` one character at a time, driving the char-span typewriter used
// by the homepage hero and the article title. Returns `revealed` (count of
// visible chars) and `done` (true once the whole string is shown).
//
// State always starts at 0 so the prerendered HTML and the client's first
// render agree (no hydration mismatch); the effect then either animates or, for
// prefers-reduced-motion, jumps straight to the fully-revealed state.
export default function useTypewriter(text, { speed = 24 } = {}) {
  const length = text.length;
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(length);
      return undefined;
    }
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setRevealed(i);
      if (i >= length) clearInterval(iv);
    }, speed);
    return () => clearInterval(iv);
  }, [length, speed]);

  return { revealed, done: revealed >= length };
}
