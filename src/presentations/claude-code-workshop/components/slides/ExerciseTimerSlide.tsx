import { useEffect, useRef, useState } from "react";
import { SlideLayout, useSlideMotion } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import imLogoNegative from "../../assets/IM_-logo_negativ.svg";
import { BlinkUnderscore } from "./SlideAccent";

export function ExerciseTimerSlide({
  page,
  kicker,
  title,
  lead,
  minutes,
}: {
  page: number;
  kicker: string;
  title: string;
  lead: string;
  minutes: number;
}) {
  return (
    <SlideLayout variant="navy">
      <div className="absolute top-0 left-0 h-[16px] w-[420px] bg-slide-pink" />
      <img
        src={imLogoNegative}
        alt=""
        className="absolute top-[78px] right-[130px] h-[48px] w-auto"
      />
      <div className="relative grid h-full grid-cols-[1.4fr_0.6fr] items-center gap-[80px] px-[140px]">
        <div>
          <Reveal delay={0.05}>
            <p className="slide-kicker text-slide-accent-soft">{kicker}</p>
          </Reveal>
          <Reveal delay={0.18} y={40}>
            <h2 className="slide-title-lg mt-[30px]">
              {title}
              <BlinkUnderscore />
            </h2>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="slide-subtitle mt-[40px] max-w-[1000px] text-slide-bg/80">{lead}</p>
          </Reveal>

        </div>
        <Reveal delay={0.6}>
          <div className="border-l border-slide-bg/20 pl-[46px]">
            <p className="slide-kicker text-slide-pink">Til rådighed</p>
            <WorkshopCountdown minutes={minutes} />
          </div>
        </Reveal>
      </div>

      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        {String(page).padStart(2, "0")}
      </span>
    </SlideLayout>
  );
}

const DIAL_RADIUS = 168;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;
/** The slide counts as reached once most of it is on screen. */
const REACHED_RATIO = 0.6;

const formatClock = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

/**
 * Counts the workshop block down in real time. It starts the first time the
 * slide is on screen and never restarts, so returning to the slide mid-workshop
 * shows the true remaining time. Thumbnails and print render the full duration.
 */
function WorkshopCountdown({ minutes }: { minutes: number }) {
  const animate = useSlideMotion();
  const totalMs = minutes * 60_000;
  const containerRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(totalMs);

  useEffect(() => {
    if (!animate) return undefined;
    const element = containerRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (startedAt.current === null && entries.some((entry) => entry.intersectionRatio >= REACHED_RATIO)) {
          startedAt.current = Date.now();
        }
      },
      { threshold: [0, REACHED_RATIO, 1] },
    );
    observer.observe(element);

    const tick = window.setInterval(() => {
      if (startedAt.current === null) return;
      setRemainingMs(Math.max(0, totalMs - (Date.now() - startedAt.current)));
    }, 250);

    return () => {
      observer.disconnect();
      window.clearInterval(tick);
    };
  }, [animate, totalMs]);

  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const fractionLeft = remainingMs / totalMs;
  const isDone = remainingMs === 0;

  return (
    <div
      ref={containerRef}
      className="workshop-countdown flex flex-col items-center"
      data-workshop-duration={minutes}
      data-remaining-seconds={remainingSeconds}
    >
      <div className="relative">
        <svg viewBox="0 0 400 400" className="h-[400px] w-[400px]" aria-hidden="true">
          <circle cx="200" cy="200" r={DIAL_RADIUS} fill="none" stroke="var(--slide-bg)" strokeOpacity="0.18" strokeWidth="16" />
          {Array.from({ length: 12 }, (_, index) => {
            const angle = (index * Math.PI) / 6;
            const inner = DIAL_RADIUS - 30;
            return (
              <line
                key={index}
                x1={200 + Math.sin(angle) * inner}
                y1={200 - Math.cos(angle) * inner}
                x2={200 + Math.sin(angle) * (inner - 14)}
                y2={200 - Math.cos(angle) * (inner - 14)}
                stroke="var(--slide-bg)"
                strokeOpacity={index % 3 === 0 ? 0.55 : 0.22}
                strokeWidth={index % 3 === 0 ? 3 : 2}
              />
            );
          })}
          <circle
            cx="200"
            cy="200"
            r={DIAL_RADIUS}
            fill="none"
            stroke={isDone ? "var(--slide-accent)" : "var(--slide-pink)"}
            strokeWidth="16"
            strokeLinecap="butt"
            strokeDasharray={DIAL_CIRCUMFERENCE}
            strokeDashoffset={DIAL_CIRCUMFERENCE * (1 - fractionLeft)}
            transform="rotate(-90 200 200)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-[66px] leading-[0.9] font-bold tabular-nums">
            {isDone ? "Tid" : formatClock(remainingSeconds)}
          </p>
        </div>
      </div>
      <p className="slide-caption mt-[10px] font-mono uppercase tracking-[0.14em] text-slide-bg/65">
        {isDone ? "vi samler op" : `tilbage af ${minutes} min`}
      </p>
    </div>
  );
}
