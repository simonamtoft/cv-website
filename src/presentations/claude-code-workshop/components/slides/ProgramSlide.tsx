import { motion } from "motion/react";
import { SlideFrame, useSlideMotion } from "../SlideLayout";
import { inViewSoft, Reveal } from "../SlideMotion";
import { cn } from "../../utils";
import { formatTime, scheduledItems } from "../../schedule";

export function ProgramSlide({ page }: { page: number }) {
  const total = scheduledItems.reduce((sum, item) => sum + item.duration, 0);
  return (
    <SlideFrame
      kicker="Program"
      title="Sådan ser eftermiddagen ud"
      page={page}
    >
      <div className="flex h-full min-h-0 flex-col justify-center">
        <div className="program-schedule border border-slide-rule bg-slide-surface">
          {scheduledItems.map((item, index) => (
            <Reveal key={item.id} delay={0.06 + index * 0.12}>
              <div
                className="flex items-center gap-[24px] px-[36px] py-[12px]"
                data-schedule-item={item.id}
                data-start={formatTime(item.start)}
                data-end={formatTime(item.end)}
                data-duration-minutes={item.duration}
              >
                <span className="slide-body-lg w-[340px] shrink-0 whitespace-nowrap font-mono text-slide-accent">
                  {formatTime(item.start)} – {formatTime(item.end)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="slide-subtitle font-display font-bold uppercase leading-none">
                    {item.heading}
                  </h3>
                  <p className="slide-body mt-[6px] text-slide-ink-soft">{item.note}</p>
                </div>
                <div className="flex w-[300px] shrink-0 items-center gap-[16px]">
                  <div className="flex-1">
                    <GrowBar
                      fraction={item.duration / total}
                      delay={0.28 + index * 0.12}
                      className={item.kind === "exercise" ? "bg-slide-green" : "bg-slide-accent"}
                    />
                  </div>
                  <span className="slide-caption w-[72px] shrink-0 whitespace-nowrap font-mono text-slide-ink-soft">
                    {item.duration} min
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function GrowBar({
  fraction,
  delay = 0,
  className,
}: {
  fraction: number;
  delay?: number;
  className?: string;
}) {
  const animate = useSlideMotion();
  return (
    <div className="h-[14px] w-full bg-slide-rule">
      <motion.div
        className={cn("h-full bg-slide-accent", className)}
        initial={{ width: animate ? 0 : `${fraction * 100}%` }}
        whileInView={{ width: `${fraction * 100}%` }}
        viewport={inViewSoft}
        transition={{ duration: 1.1, delay, ease: [0.22, 0.9, 0.24, 1] }}
      />
    </div>
  );
}
