import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";

const debriefQuestions: Array<[string, string, string]> = [
  ["01", "Hvad prøvede I?", "Hvad bad I Claude om at undersøge eller ændre?"],
  ["02", "Hvad tjekkede I?", "Hvad så I i resultatet, filerne eller diffet bagefter?"],
  ["03", "Hvad lærte I?", "Hvad overraskede jer — godt eller mindre godt?"],
  ["04", "Hvad prøver I igen?", "Hvilken opgave vil I tage fat på inden fredag?"],
];

export function DebriefSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Fælles opsamling"
      title="Hvad fandt I?"
      lead="Et par grupper viser, hvad de byggede, og hvad de lærte."
      page={page}
    >
      <div className="debrief-reflection grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-[18px] overflow-hidden">
        {debriefQuestions.map(([number, heading, body], index) => (
          <Reveal key={number} delay={0.08 + index * 0.1} className="min-h-0">
            <article className="flex h-full min-h-0 items-start gap-[26px] border border-slide-rule bg-slide-surface p-[30px]">
              <span className="slide-caption shrink-0 font-mono text-slide-accent">{number}</span>
              <div>
                <h3 className="slide-body-lg font-display font-bold uppercase leading-none">{heading}</h3>
                <p className="slide-body mt-[18px] text-slide-ink-soft">{body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  );
}
