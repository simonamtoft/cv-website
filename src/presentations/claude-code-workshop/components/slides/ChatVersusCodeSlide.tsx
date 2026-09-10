import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { WindowChrome } from "../SlideWindow";
import { cn } from "../../utils";

export function ChatVersusCodeSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Fra svar til handling"
      title={
        <>
          <span className="block whitespace-nowrap text-[64px] leading-[0.94]">
            Svaret bliver i vinduet. Filen bliver i mappen.
          </span>
        </>
      }
      lead="Forskellen er ikke modellen, men værktøjerne."
      page={page}
    >
      <ChatVersusCode />
    </SlideFrame>
  );
}

const sharedTask = "Saml tallene fra de tre regneark til én kvartalsoversigt";

const chatAnswer: Array<[string, string]> = [
  ["Nord", "12,4 mio."],
  ["Syd", "9,1 mio."],
  ["Vest", "7,8 mio."],
  ["I alt", "29,3 mio."],
];

const codeTranscript: Array<[string, string]> = [
  ["Læser", "q3-nord.xlsx, q3-syd.xlsx, q3-vest.xlsx"],
  ["Skriver", "saml-kvartal.py"],
  ["Skriver", "kvartal-oversigt.xlsx"],
];

function ChatVersusCode() {
  return (
    <div className="chat-vs-code flex h-full min-h-0 flex-col gap-[22px]">
      <Reveal delay={0.06} className="shrink-0">
        <div className="flex items-center gap-[26px] rounded-[16px] bg-slide-pink px-[34px] py-[18px]">
          <span className="slide-kicker shrink-0 text-slide-accent">
            Samme opgave
          </span>
          <p className="slide-body font-mono text-slide-ink">“{sharedTask}”</p>
        </div>
      </Reveal>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-[34px]">
        <Reveal delay={0.24} className="flex min-h-0">
          <section
            data-outcome="chat"
            className="flex min-h-0 w-full flex-col overflow-hidden rounded-[20px] bg-slide-surface"
          >
            <WindowChrome label="Claude Chat" tone="light" />
            <div className="flex min-h-0 flex-1 flex-col gap-[16px] px-[28px] py-[22px]">
              <div className="self-end rounded-[14px] bg-slide-bg px-[22px] py-[12px]">
                <p className="slide-caption text-slide-ink-soft">{sharedTask}</p>
              </div>
              <div className="flex min-h-0 flex-1 flex-col rounded-[14px] border border-slide-ink/15 px-[24px] py-[18px]">
                <p className="slide-chrome text-slide-ink-soft">
                  Her er kvartalsoversigten:
                </p>
                <div className="mt-[14px] flex flex-col gap-[7px]">
                  {chatAnswer.map(([label, value], index) => (
                    <div
                      key={label}
                      className={cn(
                        "flex justify-between font-mono",
                        index === chatAnswer.length - 1
                          ? "slide-caption border-t border-slide-rule pt-[9px] font-semibold text-slide-ink"
                          : "slide-caption text-slide-ink-soft",
                      )}
                    >
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
                <span className="slide-chrome mt-auto self-start rounded-full border border-slide-ink/15 bg-slide-bg px-[18px] py-[8px] font-mono text-slide-ink-soft">
                  Kopiér
                </span>
              </div>
            </div>
            <p className="slide-caption border-t border-slide-rule px-[28px] py-[16px] text-slide-ink-soft">
              Svaret bliver i vinduet. I overfører det selv til regnearket.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.46} className="flex min-h-0">
          <section
            data-outcome="code"
            className="flex min-h-0 w-full flex-col overflow-hidden rounded-[20px] bg-slide-navy text-slide-bg"
          >
            <WindowChrome label="claude · kvartal-q3/" tone="dark" />
            <div className="flex min-h-0 flex-1 flex-col gap-[14px] px-[28px] py-[22px]">
              <p className="slide-caption font-mono">
                <span className="text-slide-accent-soft">&gt; </span>
                {sharedTask}
              </p>
              <div className="flex flex-col gap-[8px]">
                {codeTranscript.map(([action, target]) => (
                  <p key={target} className="slide-chrome font-mono text-slide-bg/75">
                    <span className="text-slide-accent-soft">● </span>
                    {action} {target}
                  </p>
                ))}
              </div>
              <div className="mt-auto rounded-[14px] border border-slide-bg/25 px-[22px] py-[16px]">
                <p className="slide-chrome font-mono text-slide-bg/55">
                  kvartal-q3/
                </p>
                <div className="mt-[10px] flex flex-col gap-[7px]">
                  {["saml-kvartal.py", "kvartal-oversigt.xlsx"].map((file) => (
                    <p key={file} className="slide-caption font-mono">
                      {file}{" "}
                      <span className="slide-chrome text-slide-accent-soft">ny</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <p className="slide-caption border-t border-slide-bg/15 px-[28px] py-[16px] text-slide-bg/75">
              Filerne ligger i mappen og kan åbnes, læses og køres igen.
            </p>
          </section>
        </Reveal>
      </div>

      <Reveal delay={0.72} className="shrink-0">
        <p className="slide-caption border-l-[7px] border-slide-good pl-[22px] text-slide-ink-soft">
          Scriptet kan køres igen — men samme resultat kræver stadig de samme
          filer, den samme opsætning og jeres kontrol af tallene.
        </p>
      </Reveal>
    </div>
  );
}
