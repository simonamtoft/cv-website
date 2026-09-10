import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";

const outcomes: Array<[string, string, string]> = [
  [
    "01",
    "Et resultat, I har tjekket",
    "En fil eller ændring, I kan åbne, gennemgå og kontrollere — også hvis den ikke er færdig.",
  ],
  [
    "02",
    "En godkendt plan",
    "En overskuelig opgave, delt op i trin, I har set og sagt ja til.",
  ],
  [
    "03",
    "Et næste forsøg",
    "Én opgave fra jeres egen hverdag, I vil prøve igen inden næste fredag.",
  ],
];

export function OutcomesSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="I går herfra med"
      title="Noget, I kan bygge videre på"
      lead="Ikke en færdig løsning — men en arbejdsform, I har prøvet på en rigtig opgave: først i Claude Chat, bagefter i Claude Code."
      page={page}
    >
      <div className="flex h-full min-h-0 flex-col justify-center overflow-hidden">
        <div className="grid grid-cols-3 gap-[20px]">
          {outcomes.map(([number, heading, body], index) => (
            <Reveal key={number} delay={0.08 + index * 0.12}>
              <article className="flex h-[310px] flex-col border border-slide-rule bg-slide-surface p-[30px]">
                <span className="slide-caption font-mono text-slide-accent">{number}</span>
                <h3 className="slide-body-lg mt-[30px] font-display font-bold uppercase leading-none">
                  {heading}
                </h3>
                <p className="slide-body mt-auto text-slide-ink-soft">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5} className="mt-[28px]">
          <p className="slide-body border-l-[7px] border-slide-accent bg-slide-pink/25 px-[28px] py-[18px] text-slide-ink-soft">
            <span className="font-semibold text-slide-ink">I dag gør vi ikke:</span>{" "}
            Forklarer, hvordan en sprogmodel virker, samler en promptbog eller sætter noget i produktion.
          </p>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
