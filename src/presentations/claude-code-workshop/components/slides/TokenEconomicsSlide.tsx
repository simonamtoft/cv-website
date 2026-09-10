import { SlideFrame } from "../SlideLayout";

export function TokenEconomicsSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Tokens og genbrug"
      title="Små opgaver. Mindre spild."
      lead="Tokens er tekstbidder: input, svar og reasoning bruger af budgettet. Omveje og gentaget arbejde tæller også."
      page={page}
      footer="Kilde: code.claude.com/docs/en/prompt-caching · Claude Code håndterer caching automatisk"
    >
      <div className="grid h-full grid-cols-[0.9fr_1.1fr] gap-[64px]">
        <div>
          <h3 className="slide-body-lg">Del planen i kontrollerbare bidder</h3>
          <div className="mt-[28px] flex items-center gap-[12px]">
            {["Én opgave", "Løs", "Tjek"].map((step, index) => (
              <div key={step} className="flex flex-1 items-center gap-[12px]">
                {index > 0 && <span className="text-[30px] text-slide-accent">→</span>}
                <div className="flex-1 border border-slide-rule bg-slide-surface px-[12px] py-[28px] text-center text-[30px]">{step}</div>
              </div>
            ))}
          </div>
          <p className="mt-[16px] text-right text-[25px] text-slide-accent">↳ Næste opgave, når tjekket holder</p>
          <p className="mt-[32px] slide-body text-slide-ink-soft">Ét klart resultat og et konkret tjek. Så opdager du fejl, før de bliver bygget videre på.</p>
          <p className="mt-[24px] text-[27px] leading-[1.4] text-slide-ink-soft">Bevar den relevante kontekst — små opgaver kræver ikke en ny chat hver gang.</p>
        </div>
        <div className="border-l border-slide-rule pl-[48px]">
          <h3 className="slide-body-lg">Cache genbruger starten af inputtet</h3>
          <div className="mt-[28px] space-y-[14px] text-[26px]">
            <p className="text-[23px] text-slide-ink-soft">Samme model · identisk start · gyldig cache</p>
            <div className="grid grid-cols-[100px_1fr_180px] items-stretch gap-[10px]">
              <span className="self-center">Kald 1</span>
              <span className="border border-slide-rule bg-slide-surface p-[20px]">Fælles kontekst</span>
              <span className="border border-slide-rule p-[20px]">Opgave A</span>
            </div>
            <div className="grid grid-cols-[100px_1fr_180px] items-stretch gap-[10px]">
              <span className="self-center">Kald 2</span>
              <span className="border border-slide-accent bg-slide-accent/10 p-[20px]">Samme start → cache</span>
              <span className="border border-slide-rule p-[20px]">Opgave B</span>
            </div>
          </div>
          <p className="mt-[28px] slide-body text-slide-ink-soft">Den genbrugte del læses billigere og hurtigere. Svaret bliver lavet på ny.</p>
          <p className="mt-[24px] text-[27px] leading-[1.4] text-slide-ink-soft">Cache er ikke gratis hukommelse. Modelskift bryder genbruget; vælg helst model og effort ved opgavens start.</p>
        </div>
      </div>
    </SlideFrame>
  );
}
