import { motion } from "motion/react";
import { useSlideMotion } from "../SlideLayout";

export function BlinkUnderscore() {
  const animate = useSlideMotion();
  return (
    <motion.span
      className="text-slide-accent-soft"
      animate={animate ? { opacity: [1, 1, 0.1, 0.1] } : { opacity: 1 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    >
      _
    </motion.span>
  );
}
