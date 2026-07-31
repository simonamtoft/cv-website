import { useEffect, useRef } from 'react';

// Adds the `is-visible` class to the returned ref's element once it scrolls
// into view, driving the fade-in transition shared by the Writing and Talks
// sections.
export default function useRevealOnScroll(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return ref;
}
