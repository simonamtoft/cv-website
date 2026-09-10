import { motion } from "motion/react";
import { SlideFrame, useSlideMotion } from "../SlideLayout";
import { inViewSoft } from "../SlideMotion";

export function FirstPromptSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Kom godt i gang"
      title="Din første prompt"
      page={page}
    >
      <AnnotatedPrompt />
    </SlideFrame>
  );
}

const promptAnnotations = [
  { id: "01", label: "Kilde", note: "Hvad tager opgaven udgangspunkt i?", delay: 0.3 },
  { id: "02", label: "Resultat", note: "Hvad skal den lave?", delay: 0.55 },
  { id: "03", label: "Modtager", note: "Hvem skal kunne bruge det?", delay: 0.8 },
  { id: "04", label: "Levering", note: "Hvad skal den gemme, og hvor?", delay: 1.05 },
] as const;

function AnnotatedPrompt() {
  const animate = useSlideMotion();
  const phraseClass = "border-b-[5px] border-slide-yellow bg-slide-yellow/35 px-[5px] text-slide-ink";

  return (
    <div className="annotated-prompt relative flex h-full flex-col overflow-hidden border border-slide-ink bg-slide-surface px-[64px] py-[30px]">
      <div className="border-b border-slide-rule pb-[16px]">
        <p className="slide-caption font-mono uppercase tracking-[0.16em] text-slide-ink-soft">
          Prompt til Claude Code
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_430px] gap-[66px] pt-[26px]">
        <div className="relative z-10 pt-[8px]">
          <motion.p
            className="slide-body font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Kig i <span className={phraseClass}>mappen kvartal-q3 <sup className="text-slide-accent">01</sup></span>.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Lav <span className={phraseClass}>én samlet oversigt over nøgletallene for hvert selskab <sup className="text-slide-accent">02</sup></span>.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Den skal kunne sendes videre til <span className={phraseClass}>en kollega <sup className="text-slide-accent">03</sup></span>, så hold den på én side.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 0.9, 0.24, 1] }}
          >
            <span className={phraseClass}>Skriv et script, der bygger oversigten, og gem resultatet som kvartal-oversigt.xlsx <sup className="text-slide-accent">04</sup></span>.
          </motion.p>
        </div>

        <div
          className="relative z-10 flex flex-col justify-center gap-[16px]"
          style={{ transform: "translateY(-38px)" }}
        >
          {promptAnnotations.map(({ id, label, note, delay }, index) => (
            <motion.div
              key={id}
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay, ease: [0.22, 0.9, 0.24, 1] }}
            >
              <div className="flex items-start gap-[18px] border-l-[4px] border-slide-accent pl-[20px]">
                <span className="slide-body font-mono text-slide-accent">{id}</span>
                <div>
                  <p className="slide-body font-display font-bold uppercase leading-none">{label}</p>
                  <p className="slide-caption mt-[6px] text-slide-ink-soft">{note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
