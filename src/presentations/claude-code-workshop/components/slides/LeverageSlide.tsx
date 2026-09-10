import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { cn } from "../../utils";

export function LeverageSlide({ page }: { page: number }) {
  const levels: Array<[string, string, string, string]> = [
    [
      "01",
      "Koden",
      "Lokal fejl. Rettes på minutter.",
      "52%",
    ],
    [
      "02",
      "Planen",
      "Skæv plan opdages, når noget er bygget.",
      "64%",
    ],
    [
      "03",
      "Research og kontekst",
      "Forkert materiale gør resten forkert.",
      "76%",
    ],
    [
      "04",
      "Opgavevalget",
      "Forkert opgave, løst upåklageligt.",
      "88%",
    ],
    [
      "05",
      "Faste instruktioner og skills",
      "Det I vil gentage, bliver. Resten hører til opgaven.",
      "100%",
    ],
  ];
  return (
    <SlideFrame
      title="Ikke alle valg vejer lige meget"
      lead="Fem minutter mere på instruktionerne og planen sparer en time i koden."
      page={page}
    >
      <div className="leverage-hierarchy flex h-full min-h-0 items-center justify-center overflow-hidden">
        <div className="relative h-[520px] w-[1400px] max-w-full">
          <aside className="absolute top-[40px] bottom-[40px] left-0 w-[190px]" aria-label="A mistake costs minutes at the bottom and a whole afternoon at the top">
            <p className="absolute top-0 left-[28px] max-w-[150px] slide-caption font-mono uppercase tracking-[0.12em] text-slide-accent">
              Hele eftermiddagen
            </p>
            <p className="absolute bottom-0 left-[28px] slide-caption font-mono uppercase tracking-[0.12em] text-slide-ink-soft">
              Minutter
            </p>
            <svg
              className="absolute inset-y-[30px] left-0 h-auto w-[16px]"
              viewBox="0 0 16 300"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M8 292V18M2 30L8 18L14 30" fill="none" stroke="var(--slide-accent)" strokeWidth="2" />
            </svg>
          </aside>

          <div
            className="absolute top-0 right-0 flex w-[1100px] flex-col-reverse gap-[14px]"
            aria-label="Leverage hierarchy from the code up to the standing instructions"
          >
            {levels.map(([number, title, note, width], index) => (
              <Reveal
                key={title}
                delay={0.08 + index * 0.14}
                className="flex justify-center"
              >
                <div
                  className={cn(
                    "flex h-[88px] items-center gap-[26px] px-[30px]",
                    index === levels.length - 1
                      ? "bg-slide-accent text-slide-bg"
                      : index === levels.length - 2
                        ? "bg-slide-pink text-slide-ink"
                        : "bg-slide-surface text-slide-ink",
                  )}
                  style={{ width }}
                >
                  <span className="slide-caption shrink-0 font-mono opacity-70">
                    {number}
                  </span>
                  <div className="min-w-0">
                    <h3 className="slide-body font-display font-bold uppercase leading-none">
                      {title}
                    </h3>
                    <p className="slide-chrome mt-[5px] leading-tight opacity-75">
                      {note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
