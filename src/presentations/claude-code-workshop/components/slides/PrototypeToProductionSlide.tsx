import { motion } from "motion/react";
import { SlideFrame, useSlideMotion } from "../SlideLayout";
import { inViewSoft, Reveal } from "../SlideMotion";

export function PrototypeToProductionSlide({ page }: { page: number }) {
  const hidden: Array<[string, string]> = [
    ["Adgang", "Kan andre overhovedet starte den? Og ser de tal, de ikke må se?"],
    [
      "Forkert input",
      "Nye tal, nyt format. Siger den fra, eller regner den videre på noget forkert?",
    ],
    ["Afprøvning", "Den har kun set de tal, du selv gav den."],
    ["Ejerskab", "Hvem vedligeholder den, og hvem supporterer, når den fejler?"],
    ["Data", "Kan du forklare bagefter, hvor tallene endte?"],
  ];
  return (
    <SlideFrame
      kicker="Fra prototype til drift"
      title="Hvad sker der, når du er på ferie?"
      page={page}
    >
      <Iceberg below={hidden} />
    </SlideFrame>
  );
}

function Iceberg({ below }: { below: Array<[string, string]> }) {
  const animate = useSlideMotion();
  const ease = [0.22, 0.9, 0.24, 1] as const;

  return (
    <div className="grid h-full grid-cols-[820px_1fr] gap-[56px]">
      <div className="relative h-full overflow-hidden border border-slide-rule bg-slide-surface">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--slide-sage) 16%, transparent), color-mix(in oklab, var(--slide-green) 34%, transparent))",
          }}
        />

        <svg viewBox="0 0 820 620" className="h-full w-full">
          <defs>
            <linearGradient id="ice-air" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--slide-bg)" />
              <stop offset="100%" stopColor="var(--slide-sage)" />
            </linearGradient>
            <linearGradient id="ice-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--slide-sage)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--slide-green)" stopOpacity="0.34" />
            </linearGradient>
            <linearGradient id="ice-deep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--slide-green)" />
              <stop offset="100%" stopColor="var(--slide-ink)" />
            </linearGradient>
            <clipPath id="ice-below-clip">
              <rect x="0" y="236" width="820" height="384" />
            </clipPath>
            <clipPath id="ice-above-clip">
              <rect x="0" y="0" width="820" height="236" />
            </clipPath>
          </defs>

          {/* water body */}
          <rect x="0" y="236" width="820" height="384" fill="url(#ice-water)" />

          {/* bobbing iceberg */}
          <motion.g
            initial={animate ? { y: 26, opacity: 0 } : false}
            viewport={inViewSoft}
            whileInView={
              animate
                ? { y: [26, 0, -5, 0], opacity: 1 }
                : { y: 0, opacity: 1 }
            }
            transition={
              animate
                ? {
                    opacity: { duration: 0.6, ease },
                    y: {
                      duration: 7,
                      times: [0, 0.16, 0.6, 1],
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    },
                  }
                : { duration: 0 }
            }

          >
            {/* submerged mass */}
            <g clipPath="url(#ice-below-clip)">
              <path
                d="M232 236 L300 214 L520 214 L590 236 L664 330 L676 430 L604 528 L470 588 L322 566 L214 486 L162 372 Z"
                fill="url(#ice-deep)"
                opacity="0.9"
              />
              <path
                d="M420 236 L470 588 L322 566 Z"
                fill="var(--slide-bg)"
                opacity="0.07"
              />
              <path
                d="M590 236 L664 330 L676 430 L560 320 Z"
                fill="var(--slide-ink)"
                opacity="0.25"
              />
            </g>

            {/* tip above water */}
            <g clipPath="url(#ice-above-clip)">
              <path
                d="M410 78 L520 214 L590 236 L232 236 L300 214 Z"
                fill="url(#ice-air)"
                stroke="var(--slide-ink)"
                strokeWidth="2"
              />
              <path
                d="M410 78 L440 236 L300 214 Z"
                fill="var(--slide-bg)"
                opacity="0.75"
              />
              <path
                d="M410 78 L520 214 L470 236 L440 236 Z"
                fill="var(--slide-ink)"
                opacity="0.1"
              />
            </g>
          </motion.g>

          {/* waterline */}
          <motion.path
            d="M0 236 C 120 226, 200 246, 320 236 S 520 226, 640 238 S 760 246, 820 236"
            fill="none"
            stroke="var(--slide-accent)"
            strokeWidth="3"
            initial={animate ? { pathLength: 0 } : false}
            whileInView={{ pathLength: 1 }}
            viewport={inViewSoft}
            transition={{ duration: 1, delay: 0.2, ease }}
          />
          <motion.path
            d="M0 250 C 140 242, 220 258, 340 250 S 540 242, 660 252 S 770 258, 820 250"
            fill="none"
            stroke="var(--slide-accent)"
            strokeWidth="1.5"
            opacity="0.35"
            initial={animate ? { pathLength: 0 } : false}
            whileInView={{ pathLength: 1 }}
            viewport={inViewSoft}
            transition={{ duration: 1.2, delay: 0.4, ease }}
          />

          {/* Labels sit left of the iceberg. */}
          <motion.g
            initial={animate ? { opacity: 0, x: -18 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            <text x="30" y="120" fill="var(--slide-accent)" fontSize="62" fontFamily="var(--font-display)">
              20%
            </text>
            <text x="30" y="148" fill="var(--slide-ink-soft)" fontSize="16" letterSpacing="3" fontFamily="var(--font-mono)">
              PROTOTYPEN
            </text>
          </motion.g>

          <motion.g
            initial={animate ? { opacity: 0, x: -18 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.6, delay: 0.85, ease }}
          >
            <text x="30" y="352" fill="var(--slide-ink)" fontSize="62" fontFamily="var(--font-display)">
              80%
            </text>
            <text x="30" y="380" fill="var(--slide-ink-soft)" fontSize="16" letterSpacing="3" fontFamily="var(--font-mono)">
              RESTEN AF
            </text>
            <text x="30" y="402" fill="var(--slide-ink-soft)" fontSize="16" letterSpacing="3" fontFamily="var(--font-mono)">
              ARBEJDET
            </text>
          </motion.g>

          <text
            x="790"
            y="226"
            fill="var(--slide-accent)"
            fontSize="16"
            letterSpacing="3"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            VANDLINJEN
          </text>

        </svg>
      </div>
      <div className="grid min-h-0 grid-rows-5 gap-[16px]">
        {below.map(([label, note], i) => (
          <Reveal key={label} delay={0.5 + i * 0.12} className="min-h-0">
            <div className="flex h-full flex-col justify-center border-l-[6px] border-slide-accent bg-slide-surface px-[30px] py-[16px]">
              <p className="slide-body font-semibold">{label}</p>
              <p className="slide-caption mt-[8px] text-slide-ink-soft">{note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
