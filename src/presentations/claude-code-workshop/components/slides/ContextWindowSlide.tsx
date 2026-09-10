import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { SlideFrame, useSlideMotion } from "../SlideLayout";

// Time between step starts. The completed window holds for two steps before replaying.
const STEP_DURATION_MS = 2000;
// Independent duration for the chat fade and context fill.
const TRANSITION_DURATION_MS = 1250;

const events = [
  { speaker: "Dig", text: "Opsummér Q3-resultaterne for Nord.", label: "Din besked", height: 30, color: "var(--slide-pink)" },
  { speaker: "Claude læser", text: "q3-nord.xlsx → relevante rækker", label: "Filindhold · Nord", height: 68, color: "var(--slide-sage)" },
  { speaker: "Claude", text: "Her er overblikket over Nord …", label: "Claudes svar", height: 38, color: "var(--slide-rule)" },
  { speaker: "Dig", text: "Sammenlign med Syd.", label: "Din næste besked", height: 30, color: "var(--slide-pink)" },
  { speaker: "Claude læser", text: "q3-syd.xlsx → relevante rækker", label: "Filindhold · Syd", height: 68, color: "var(--slide-sage)" },
  { speaker: "Claude", text: "Her er forskellene mellem Nord og Syd …", label: "Claudes næste svar", height: 38, color: "var(--slide-rule)" },
];

export function ContextWindowSlide({ page }: { page: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const animate = useSlideMotion();
  const reducedMotion = useReducedMotion();
  const still = !animate || reducedMotion;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (still || !inView) return;
    setStep(0);
    const timer = window.setInterval(() => {
      setStep((current) => (current + 1) % (events.length + 2));
    }, STEP_DURATION_MS);
    return () => window.clearInterval(timer);
  }, [still, inView]);

  const visibleCount = still ? events.length : Math.min(step, events.length);
  const transition = { duration: still ? 0 : TRANSITION_DURATION_MS / 1000 };

  return (
    <SlideFrame
      kicker="Kontekst"
      title="Hver besked og læst fil fylder"
      page={page}
      footer="Illustrativ størrelse · Tokens er små tekststykker, ikke nødvendigvis hele ord"
    >
      <div ref={ref} className="flex h-full flex-col gap-[28px]">
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_80px_660px] gap-[36px]">
          <section className="flex flex-col">
            <h3 className="slide-subtitle mb-[24px]">Samtalen</h3>
            <div className="flex flex-1 flex-col gap-[8px] rounded-[20px] bg-slide-surface p-[20px]">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{ opacity: index < visibleCount ? 1 : 0, x: index < visibleCount ? 0 : -12 }}
                  transition={transition}
                  aria-hidden={index >= visibleCount}
                  className="border-l-[5px] border-solid py-[4px] pl-[20px]"
                  style={{ borderColor: event.color }}
                >
                  <p className="font-mono text-[20px] leading-[1.2] text-slide-ink-soft">{event.speaker}</p>
                  <p className="text-[26px] leading-[1.2]">{event.text}</p>
                </motion.div>
              ))}
            </div>
          </section>
          <div className="flex items-center justify-center text-[60px] text-slide-accent" aria-hidden>→</div>
          <section className="flex min-h-0 flex-col">
            <h3 className="slide-subtitle">Kontekstvinduet</h3>
            <p className="mb-[12px] mt-[8px] text-[24px] leading-[1.2] text-slide-ink-soft">Det Claude har foran sig lige nu</p>
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[20px] border-2 border-solid border-slide-ink/40 p-[12px]">
              <div className="flex min-h-[40px] flex-1 items-center justify-center text-[24px] text-slide-ink-soft">Plads til mere input og næste svar</div>
              <div className="flex flex-col-reverse" aria-label="Indhold i kontekstvinduet">
                <div className="flex h-[42px] shrink-0 items-center justify-center bg-slide-ink text-[23px] text-slide-bg">Instruktioner</div>
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{ height: index < visibleCount ? event.height : 0, opacity: index < visibleCount ? 1 : 0 }}
                    transition={transition}
                    aria-hidden={index >= visibleCount}
                    className="flex shrink-0 items-center justify-center overflow-hidden border-t-2 border-solid border-slide-bg text-[23px]"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.label}
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="mt-[10px] text-[22px] leading-[1.2] text-slide-ink-soft">Måles i tokens · input og svar tæller i forbruget</p>
          </section>
        </div>
        <div className="shrink-0 border-t border-solid border-slide-rule pt-[24px]">
          <p className="text-[32px] font-semibold">Dit næste spørgsmål starter ikke fra tomt.</p>
          <p className="mt-[8px] text-[26px] text-slide-ink-soft">Filer fylder først, når indholdet læses ind — ikke bare fordi de ligger i mappen.</p>
        </div>
      </div>
    </SlideFrame>
  );
}
