import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { cn } from "../../utils";

type PermissionMode = {
  name: string;
  summary: string;
  use: string;
  tone: string;
  textTone: string;
};

export function PermissionModesSlide({ page }: { page: number }) {
  const modes: PermissionMode[] = [
    {
      name: "Manual",
      summary: "Spørger før hver handling.",
      use: "Når du vil følge med trin for trin.",
      tone: "bg-slide-surface border-slide-rule",
      textTone: "text-slide-ink",
    },
    {
      name: "Accept Edits",
      summary: "Retter filer uden stop.",
      use: "Ekstra adgang spørger stadig.",
      tone: "bg-slide-sage border-slide-sage",
      textTone: "text-slide-ink",
    },
    {
      name: "Plan",
      summary: "Læser, undersøger og foreslår.",
      use: "Ingen ændringer, før planen er godkendt.",
      tone: "bg-slide-pink border-slide-pink",
      textTone: "text-slide-ink",
    },
    {
      name: "Auto",
      summary: "Udfører inden for den valgte ramme.",
      use: "Tjek outputtet og resultatet undervejs.",
      tone: "bg-slide-green border-slide-green",
      textTone: "text-slide-bg",
    },
    {
      name: "Bypass permissions",
      summary: "Ingen godkendelser.",
      use: "Kun i en isoleret, disponibel mappe.",
      tone: "bg-slide-navy border-slide-navy",
      textTone: "text-slide-bg",
    },
  ];

  return (
    <SlideFrame
      kicker="Tilladelser"
      title="Hvor meget må Claude gøre selv?"
      lead="Modes findes i Claude Code — i Cowork godkender I undervejs i stedet."
      page={page}
    >
      <div className="permission-modes flex h-full min-h-0 flex-col justify-center overflow-hidden">
        <div className="grid grid-cols-5 gap-[18px]">
          {modes.map((mode, index) => (
            <Reveal key={mode.name} delay={0.08 + index * 0.11} className="min-h-0">
              <article className={cn("flex h-[410px] flex-col border p-[26px]", mode.tone, mode.textTone)} data-permission-mode={mode.name}>
                <span className="slide-caption font-mono text-current/55">0{index + 1}</span>
                <h3 className="slide-body-lg mt-[26px] font-display font-bold uppercase leading-[0.95]">
                  {mode.name}
                </h3>
                <p className="slide-body mt-[22px] font-semibold leading-tight">
                  {mode.summary}
                </p>
                <p className="slide-caption mt-auto leading-snug text-current/70">{mode.use}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}
