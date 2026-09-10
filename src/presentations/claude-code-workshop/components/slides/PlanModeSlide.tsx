import { motion } from "motion/react";
import { SlideFrame, useSlideMotion } from "../SlideLayout";
import { inViewSoft, Reveal } from "../SlideMotion";

export function PlanModeSlide({ page }: { page: number }) {
  const steps: Array<[string, string]> = [
    ["01", "Åbn projektmappen"],
    ["02", "Skift til Plan mode"],
    ["03", "Iterér planen, til den passer"],
    ["04", "Løs én opgave ad gangen"],
  ];

  // rå markdown-linjer: [markør, tekst, status]
  const plan: Array<[string, string, string?]> = [
    ["#", "Plan: kvartal-oversigt"],
    ["", ""],
    ["##", "Opgave"],
    ["-", "Saml tallene fra de tre q3-filer"],
    ["-", "Én række pr. selskab"],
    ["", ""],
    ["##", "Fremgangsmåde"],
    ["1.", "Læs filerne, tjek kolonnenavne", "løst"],
    ["2.", "Byg tabellen", "næste"],
    ["", ""],
    ["##", "Kontrol"],
    ["- [ ]", "Stemmer totalen med rapporten?"],
    ["- [ ]", "Stikprøve på fem rækker"],
  ];

  return (
    <SlideFrame
      kicker="Jeres første tur"
      title="Plan først. Godkend bagefter."
      lead="Godkend planen, før den rører noget. Hold opgaven lille: lange forløb kan samle irrelevant kontekst og gøre fejl dyrere at rette."
      page={page}
    >
      <div className="plan-mode-journey flex h-full min-h-0 flex-col gap-[24px] overflow-hidden">
        <div className="grid min-h-0 flex-1 grid-cols-[0.85fr_0.9fr_1.25fr] gap-[44px]">
          {/* Trinene */}
          <div className="flex min-h-0 flex-col">
            <Reveal delay={0.06}>
              <p className="slide-kicker text-slide-accent">
                Konteksten udvider sig
              </p>
            </Reveal>
            <div className="mt-[24px] flex flex-col gap-[22px]">
              {steps.map(([n, label], i) => (
                <Reveal key={n} delay={0.16 + i * 0.1}>
                  <div className="flex gap-[18px]">
                    <span className="slide-caption shrink-0 pt-[8px] font-mono text-slide-accent">
                      {n}
                    </span>
                    <p className="slide-body-lg font-semibold leading-tight">
                      {label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Tragten */}
          <Reveal delay={0.2} className="min-h-0">
            <div className="h-full w-full">
              <ContextFunnel />
            </div>
          </Reveal>

          {/* plan.md */}
          <Reveal delay={0.34} className="min-h-0">
            <div className="flex h-full flex-col overflow-hidden bg-slide-surface">
              <div className="flex items-center gap-[10px] border-b border-slide-ink/12 px-[26px] py-[14px]">
                <span className="h-[9px] w-[9px] shrink-0 bg-slide-accent" />
                <span className="slide-caption font-mono text-slide-ink-soft">
                  plan.md
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col justify-center gap-[3px] px-[26px] py-[22px]">
                {plan.map(([marker, text, status], i) => (
                  <div
                    key={`${marker}-${text}-${i}`}
                    className="flex items-baseline gap-[10px] font-mono text-[19px] leading-[1.5]"
                  >
                    <span className="w-[22px] shrink-0 select-none text-right text-[14px] text-slide-ink/25">
                      {i + 1}
                    </span>
                    {marker === "" ? (
                      <span>&nbsp;</span>
                    ) : (
                      <>
                        <span
                          className={
                            marker.startsWith("#")
                              ? "shrink-0 text-slide-accent"
                              : "shrink-0 text-slide-ink/40"
                          }
                        >
                          {marker}
                        </span>
                        <span
                          className={
                            marker.startsWith("#")
                              ? "font-semibold text-slide-ink"
                              : "text-slide-ink-soft"
                          }
                        >
                          {text}
                        </span>
                        {status && (
                          <span className="ml-auto shrink-0 text-[14px] uppercase tracking-[0.1em] text-slide-accent">
                            {status}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}

function ContextFunnel() {
  const animate = useSlideMotion();
  const lines = [-150, -110, -72, -36, 0, 36, 72, 110, 150];
  return (
    <div className="context-funnel relative h-full w-full overflow-hidden bg-slide-navy">
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <motion.path
          d="M0,40 C150,40 210,180 300,196 L300,204 C210,220 150,360 0,360 Z"
          fill="var(--slide-pink)"
          opacity={0.18}
          initial={{ opacity: animate ? 0 : 0.18 }}
          whileInView={{ opacity: 0.18 }}
          viewport={inViewSoft}
          transition={{ duration: 0.8 }}
        />
        {lines.map((offset, i) => (
          <motion.path
            key={offset}
            d={`M-4,${200 + offset} C150,${200 + offset} 190,200 302,200`}
            fill="none"
            stroke="var(--slide-pink)"
            strokeWidth={offset === 0 ? 2.4 : 1.2}
            opacity={offset === 0 ? 1 : 0.55}
            initial={{ pathLength: animate ? 0 : 1, opacity: animate ? 0 : 1 }}
            whileInView={{ pathLength: 1, opacity: offset === 0 ? 1 : 0.55 }}
            viewport={inViewSoft}
            transition={{
              duration: 1.1,
              delay: 0.15 + i * 0.07,
              ease: [0.22, 0.9, 0.24, 1],
            }}
          />
        ))}
        <motion.circle
          cx="302"
          cy="200"
          r="7"
          fill="var(--slide-accent)"
          initial={{ scale: animate ? 0 : 1, opacity: animate ? 0 : 1 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={inViewSoft}
          transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }}
        />
        <motion.line
          x1="302"
          y1="200"
          x2="382"
          y2="200"
          stroke="var(--slide-accent)"
          strokeWidth="2.4"
          initial={{ pathLength: animate ? 0 : 1 }}
          whileInView={{ pathLength: 1 }}
          viewport={inViewSoft}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        className="absolute top-1/2 right-[26px] -translate-y-1/2 border border-slide-pink/50 bg-slide-bg px-[14px] py-[10px]"
        initial={{ opacity: animate ? 0 : 1, x: animate ? 12 : 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewSoft}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <span className="slide-kicker text-slide-ink">Plan</span>
      </motion.div>

      <span className="slide-kicker absolute top-[28px] left-[32px] text-slide-bg/80">
        Mere kontekst
      </span>
      <span className="slide-kicker absolute bottom-[26px] left-[32px] text-slide-bg/45">
        Filer · mål · regler
      </span>
    </div>
  );
}
