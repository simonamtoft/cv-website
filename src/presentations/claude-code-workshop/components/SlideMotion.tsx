import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useSlideMotion } from "./SlideLayout";

/** Entrance animations fire when the element scrolls into view. */
export const inViewSoft = { once: false, amount: 0.15 } as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const animate = useSlideMotion();
  if (!animate) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewSoft}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.9, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}
