import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";

export function HooksSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Gør det gentageligt"
      title="Hooks tjekker. Hver gang."
      lead="Et hook kører automatisk, når en bestemt hændelse sker — uanset hvad Claude vælger at gøre."
      page={page}
    >
      <div className="repeatable-work flex h-full min-h-0 flex-col overflow-hidden">
        <Reveal delay={0.1} className="min-h-0 flex-1">
          <div className="grid h-full min-h-0 grid-rows-[1fr_1.25fr_1fr] gap-[18px]">
            <article className="grid grid-cols-[360px_1fr] items-center gap-[32px] border border-slide-rule bg-slide-surface px-[34px] py-[22px]">
              <div>
                <p className="slide-chrome font-mono text-slide-accent">PreToolUse</p>
                <h3 className="slide-body mt-[10px]">Før værktøjet kører</h3>
              </div>
              <p className="slide-body text-slide-ink-soft">
                Tjek kommandoen — og blokér den, hvis den bryder jeres regler.
              </p>
            </article>
            <article className="grid grid-cols-[360px_1fr] items-center gap-[32px] border border-slide-green bg-slide-sage/40 px-[34px] py-[22px]">
              <div>
                <p className="slide-chrome font-mono text-slide-green">PostToolUse · Edit / Write</p>
                <h3 className="slide-body mt-[10px]">Efter en filændring</h3>
              </div>
              <div>
                <div className="flex items-center gap-[18px]">
                  <p className="slide-caption">Claude retter en fil</p>
                  <span aria-hidden="true" className="slide-body-lg text-slide-green">→</span>
                  <p className="slide-caption bg-slide-navy px-[20px] py-[14px] font-mono text-slide-bg">scripts/tjek-tal.sh</p>
                  <span aria-hidden="true" className="slide-body-lg text-slide-green">→</span>
                  <p className="slide-caption">Fejl retur til Claude</p>
                </div>
                <p className="slide-caption mt-[16px] text-slide-ink-soft">Tjekket giver feedback; ændringen er allerede sket.</p>
              </div>
            </article>
            <article className="grid grid-cols-[360px_1fr] items-center gap-[32px] border border-slide-rule bg-slide-surface px-[34px] py-[22px]">
              <div>
                <p className="slide-chrome font-mono text-slide-accent">Stop</p>
                <h3 className="slide-body mt-[10px]">Når Claude vil slutte</h3>
              </div>
              <p className="slide-body text-slide-ink-soft">
                Kør et afsluttende tjek — og få Claude til at fortsætte, hvis noget mangler.
              </p>
            </article>
          </div>
        </Reveal>
        <Reveal delay={0.48} className="mt-[24px] shrink-0">
          <p className="slide-body border-l-[7px] border-slide-good pl-[24px] text-slide-ink-soft">
            Skills guider Claude; hooks håndhæver kontrollen.
          </p>
        </Reveal>
      </div>
    </SlideFrame>
  );
}
