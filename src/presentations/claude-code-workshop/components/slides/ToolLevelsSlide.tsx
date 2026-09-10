import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { cn } from "../../utils";

export function ToolLevelsSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Tre værktøjer"
      title={
        <>
          Chat svarer. Cowork arbejder. Code <span className="slide-mark">bygger</span>.
        </>
      }
      lead="Samme model — forskellen er, hvor arbejdet lever."
      page={page}
    >
      <ToolLadder />
    </SlideFrame>
  );
}

type Rung = {
  name: string;
  stage: string;
  what: string;
  shift: string;
  height: string;
  tone: string;
};

const rungs: Rung[] = [
  {
    name: "Claude Chat",
    stage: "Samtale",
    what: "I får et svar i vinduet og flytter det selv videre.",
    shift: "Skift, når I selv holder rede på filer og trin.",
    height: "h-[330px]",
    tone: "border-slide-rule bg-slide-surface",
  },
  {
    name: "Claude Cowork",
    stage: "Arbejdsproces",
    what: "Claude arbejder i en mappe: finder input, opdaterer filerne.",
    shift: "Skift, når arbejdsgangen skal kunne køres igen.",
    height: "h-[370px]",
    tone: "border-slide-sage bg-slide-sage/45",
  },
  {
    name: "Claude Code",
    stage: "Reproducerbart system",
    what: "Scripts, kontroller og en arbejdsgang, I kan gentage.",
    shift: "Mere opsætning — og mere kontrol.",
    height: "h-[410px]",
    tone: "border-slide-pink bg-slide-pink",
  },
];

function ToolLadder() {
  return (
    <div className="tool-ladder flex h-full min-h-0 flex-col justify-end">
      <div className="grid grid-cols-3 items-end gap-[20px]">
        {rungs.map((rung, index) => (
          <Reveal key={rung.name} delay={0.08 + index * 0.14}>
            <article
              data-rung={rung.name}
              className={cn("flex flex-col border p-[30px]", rung.height, rung.tone)}
            >
              <span className="slide-caption font-mono text-slide-accent">
                0{index + 1} · {rung.stage}
              </span>
              <h3 className="slide-body-lg mt-[20px] font-display font-bold uppercase leading-none">
                {rung.name}
              </h3>
              <p className="slide-body mt-[18px] text-slide-ink-soft">{rung.what}</p>
              <p className="slide-caption mt-auto border-t border-slide-ink/15 pt-[16px] text-slide-ink">
                {rung.shift}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.56} className="mt-[22px]">
        <p className="slide-body border-l-[7px] border-slide-good pl-[24px] text-slide-ink-soft">
          Vælg det mindst selvkørende værktøj, der stadig løser opgaven.
        </p>
      </Reveal>
    </div>
  );
}
