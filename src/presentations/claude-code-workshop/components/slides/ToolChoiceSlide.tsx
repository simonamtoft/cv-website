import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { cn } from "../../utils";

export function ToolChoiceSlide({ page }: { page: number }) {
  const rows: Array<[string, string, string, string, string]> = [
    [
      "Hvad det er",
      "Jeres egen chat, driftet af jeres IT",
      "Anthropics chat",
      "Claude i en mappe, med en opgave",
      "En agent i en mappe",
    ],
    [
      "Data",
      "Bliver i det godkendte miljø",
      "Det, I indsætter, forlader huset",
      "Filerne i mappen sendes med, når de bruges",
      "Den vælger selv, hvad den læser og sender med",
    ],
    [
      "Brug til",
      "Materiale, der ikke må sendes ud",
      "Sparring og hurtige udkast",
      "Opgaver med filer: rapportpakker, gennemgange, oprydning",
      "Arbejde, der skal kunne køres igen: scripts, analyser, demoer",
    ],
    [
      "Brug ikke til",
      "Det, jeres IT ikke har rullet ud",
      "Arbejde, der skal ende i filer",
      "Mapper med materiale, der ikke må ud",
      "Hurtige spørgsmål uden filer",
    ],
  ];
  return (
    <SlideFrame kicker="Værktøjskassen" title="Hvornår bruger du hvad?" page={page}>
      <div className="flex h-full min-h-0 flex-col gap-[22px] overflow-hidden">
        <div className="tool-choice-table min-h-0 flex-1 overflow-hidden bg-slide-bg p-[2px]">
          <table className="h-full w-full table-fixed border-separate border-spacing-[2px] text-left">
            <colgroup>
              <col className="w-[250px]" />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="bg-slide-surface px-[22px] py-[14px]" />
                {["Intern GPT", "Claude Chat", "Claude Cowork", "Claude Code"].map((title, index) => (
                  <th
                    key={title}
                    scope="col"
                    className={cn(
                      "px-[22px] py-[14px] align-bottom",
                      index === 3
                        ? "bg-slide-pink"
                        : index === 2
                          ? "bg-slide-sage/45"
                          : "bg-slide-surface",
                    )}
                  >
                    <h3 className="slide-body-lg font-display font-bold uppercase leading-tight">
                      {title}
                    </h3>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, a, b, c, d]) => (
                <tr key={label}>
                  <th scope="row" className="bg-slide-surface px-[22px] py-[6px] align-top">
                    <span className="slide-caption font-mono uppercase tracking-[0.12em] text-slide-accent">
                      {label}
                    </span>
                  </th>
                  <td className="bg-slide-surface px-[22px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink-soft">{a}</p>
                  </td>
                  <td className="bg-slide-surface px-[22px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink-soft">{b}</p>
                  </td>
                  <td className="bg-slide-sage/20 px-[22px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink">{c}</p>
                  </td>
                  <td className="bg-slide-pink/35 px-[22px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink">{d}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Reveal delay={0.7} className="shrink-0">
          <div className="border border-slide-rule bg-slide-surface px-[40px] py-[18px]">
            <p className="slide-body text-slide-ink-soft">
              <span className="slide-body font-semibold text-slide-ink">
                Tommelfingerregel:
              </span>{" "}
              Vælg værktøj efter opgaven og de dataregler, I arbejder under.
            </p>
          </div>
        </Reveal>

      </div>
    </SlideFrame>
  );
}
