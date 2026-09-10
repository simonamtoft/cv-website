import type { ReactNode } from "react";
import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { cn } from "../../utils";

type DeliveryStep = {
  number: string;
  name: string;
  instruction: string;
  tone: string;
};

/** The two exercises share a rhythm, so the brief is one slide with two scripts. */
type ExerciseBrief = {
  kicker: string;
  title: string;
  lead: string;
  track: ReactNode;
  rhythm: string;
  steps: DeliveryStep[];
};

const stepTones = [
  "bg-slide-surface border-slide-rule",
  "bg-slide-pink border-slide-pink",
  "bg-slide-surface border-slide-rule",
  "bg-slide-navy border-slide-navy text-slide-bg",
];

const chatBrief: ExerciseBrief = {
  kicker: "Øvelse 1 · Chat og Projects",
  title: "Få jord under neglene",
  lead: "I behøver ikke at blive færdige — bare kom i gang og se, hvad I lærer.",
  track: (
    <>
      <span className="slide-mark">Chat</span> og <span className="slide-mark">Projects</span>.
    </>
  ),
  rhythm: "materiale → udkast → tjek",
  steps: [
    {
      number: "01",
      name: "Vælg opgaven",
      instruction: "Jeres egen eller en, vi foreslår — med materiale, der godt må forlade huset.",
      tone: stepTones[0],
    },
    {
      number: "02",
      name: "Opret et projekt",
      instruction: "Læg materialet ind som projektviden, så I ikke skal indsætte det forfra hver gang.",
      tone: stepTones[1],
    },
    {
      number: "03",
      name: "Bed om et udkast",
      instruction: "Sig hvad kilden er, hvad resultatet skal bruges til, og hvem der skal læse det.",
      tone: stepTones[2],
    },
    {
      number: "04",
      name: "Tjek og skærp",
      instruction: "Læs efter. Ret præmissen frem for svaret, og prøv igen.",
      tone: stepTones[3],
    },
  ],
};

const codeBrief: ExerciseBrief = {
  kicker: "Øvelse 2 · Claude Code",
  title: "Byg noget, I kan gentage",
  lead: "Samme opgave eller en ny — nu i en mappe. Det færdige resultat er ikke målet; arbejdsformen er.",
  track: (
    <>
      <span className="slide-mark">Code</span> i en mappe, I selv vælger.
    </>
  ),
  rhythm: "mappe → plan → resultat",
  steps: [
    {
      number: "01",
      name: "Åbn mappen",
      instruction: "Start Claude Code i en mappe med ufølsomme filer, og lad den kigge rundt.",
      tone: stepTones[0],
    },
    {
      number: "02",
      name: "Bed om en plan",
      instruction: "Plan mode. Iterér planen, til den passer — før noget bliver ændret.",
      tone: stepTones[1],
    },
    {
      number: "03",
      name: "Kør én opgave",
      instruction: "Godkend et trin ad gangen, og hold opgaven lille nok til at kunne tjekkes.",
      tone: stepTones[2],
    },
    {
      number: "04",
      name: "Tjek resultatet",
      instruction: "Kør kontrollen, og læs ændringen igennem, før I går videre.",
      tone: stepTones[3],
    },
  ],
};

function WorkshopExerciseBriefSlide({ page, brief }: { page: number; brief: ExerciseBrief }) {
  const { kicker, title, lead, track, rhythm, steps } = brief;
  return (
    <SlideFrame kicker={kicker} title={title} lead={lead} page={page}>
      <div className="delivery-exercise flex h-full min-h-0 flex-col justify-center overflow-hidden">
        <Reveal delay={0.06}>
          <div className="flex items-stretch justify-between border border-slide-rule bg-slide-surface">
            <div className="flex-1 px-[34px] py-[20px]">
              <p className="slide-kicker text-slide-accent">Vi arbejder i</p>
              <p className="slide-body-lg mt-[6px] font-semibold">{track}</p>
            </div>
            <div className="border-l border-slide-rule px-[30px] py-[20px] text-right">
              <p className="slide-caption font-mono uppercase tracking-[0.12em] text-slide-ink-soft">Fire trin</p>
              <p className="slide-body mt-[5px] font-semibold">{rhythm}</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-[26px] grid min-h-0 flex-1 grid-cols-4 gap-[20px]">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={0.16 + index * 0.1} className="min-h-0">
              <article
                className={cn("flex h-full min-h-0 flex-col border p-[26px]", step.tone)}
                data-delivery-step={step.number}
              >
                <span className="slide-caption font-mono opacity-55">{step.number}</span>
                <h3 className="slide-subtitle mt-[24px] font-display font-bold uppercase leading-[0.95]">
                  {step.name}
                </h3>
                <div className="mt-[24px] h-px w-full bg-current opacity-20" />
                <p className="slide-caption mt-[24px] leading-snug opacity-75">{step.instruction}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

export function ChatExerciseBriefSlide({ page }: { page: number }) {
  return <WorkshopExerciseBriefSlide page={page} brief={chatBrief} />;
}

export function CodeExerciseBriefSlide({ page }: { page: number }) {
  return <WorkshopExerciseBriefSlide page={page} brief={codeBrief} />;
}
