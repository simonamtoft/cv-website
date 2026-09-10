import { SlideFrame } from "../SlideLayout";
import { Reveal } from "../SlideMotion";
import { cn } from "../../utils";

export function SkillsSlide({ page }: { page: number }) {
  const points: Array<[string, string, string]> = [
    [
      "01",
      "Hvad en skill er",
      "En mappe med din egen opskrift på en opgave, du laver igen og igen. Skrevet i almindeligt sprog, ikke i kode.",
    ],
    [
      "02",
      "Hvordan den bliver brugt",
      "Claude kan selv se, at opgaven passer, og følger opskriften. Du kan også bede om den direkte.",
    ],
    [
      "03",
      "Hvornår det betaler sig",
      "Når I mærker, at I forklarer det samme til Claude igen. Bed den om at lave et skill, mens eksemplet stadig ligger foran jer.",
    ],
  ];

  return (
    <SlideFrame
      kicker="Skills"
      title={
        <>
          Skriv opskriften <span className="slide-mark">én gang</span>
        </>
      }
      page={page}
    >
      <div className="skill-slide grid h-full min-h-0 grid-cols-[0.82fr_1.18fr] gap-[56px] overflow-hidden">
        <div className="flex min-h-0 flex-col justify-center gap-[42px]">
          {points.map(([number, heading, body], index) => (
            <Reveal key={number} delay={0.08 + index * 0.14}>
              <div className="border-l-[6px] border-slide-accent pl-[26px]">
                <div className="flex items-baseline gap-[16px]">
                  <span className="slide-caption font-mono text-slide-accent">{number}</span>
                  <h3 className="slide-body-lg font-display font-bold uppercase leading-none">
                    {heading}
                  </h3>
                </div>
                <p className="slide-body mt-[14px] text-slide-ink-soft">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <SkillFolderVisual />
      </div>
    </SlideFrame>
  );
}

type TreeEntry = { depth: number; label: string; kind: "folder" | "markdown" | "shell"; active?: boolean };

const skillTree: TreeEntry[] = [
  { depth: 0, label: "kvartal-tjek", kind: "folder" },
  { depth: 1, label: "SKILL.md", kind: "markdown", active: true },
  { depth: 1, label: "scripts", kind: "folder" },
  { depth: 2, label: "tjek-tal.sh", kind: "shell" },
  { depth: 1, label: "referencer", kind: "folder" },
  { depth: 2, label: "faelder.md", kind: "markdown" },
];

const fileIcon: Record<TreeEntry["kind"], string> = {
  folder: "⌄",
  markdown: "M↓",
  shell: "$_",
};

const skillMarkdown = [
  "---",
  "name: kvartal-tjek",
  "description: Brug dette skill, når",
  "  brugeren vil tjekke kvartalstal.",
  "---",
  "",
  "# Kvartal-tjek",
  "",
  "1. Kør scripts/tjek-tal.sh",
  "2. Undersøg hver afvigelse",
  "3. Skriv, hvad du har tjekket",
];

const skillScript = [
  "#!/usr/bin/env bash",
  "python sammenlign.py q3-*.xlsx",
];

function CodePanel({
  file,
  lines,
  className,
}: {
  file: string;
  lines: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col overflow-hidden bg-slide-navy text-slide-bg", className)}>
      <div className="flex items-center gap-[12px] border-b border-slide-bg/15 px-[26px] py-[13px]">
        <span className="h-[9px] w-[9px] shrink-0 bg-slide-accent-soft" />
        <span className="slide-chrome font-mono text-slide-bg/65">{file}</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-[3px] px-[26px] py-[20px]">
        {lines.map((line, index) => (
          <div
            key={`${file}-${index}`}
            className="flex items-baseline gap-[14px] font-mono text-[20px] leading-[1.5]"
          >
            <span className="w-[22px] shrink-0 select-none text-right text-[16px] text-slide-bg/30">
              {index + 1}
            </span>
            <span
              className={cn(
                line.startsWith("#") ? "font-semibold text-slide-bg" : "text-slide-bg/80",
              )}
            >
              {line || "\u00a0"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillFolderVisual() {
  return (
    <div className="skill-folder-visual grid h-full min-h-0 grid-cols-[360px_1fr] gap-[30px] overflow-hidden">
      <Reveal delay={0.06} className="min-h-0">
        <div className="flex h-full flex-col border border-slide-rule bg-slide-surface px-[30px] py-[26px]">
          <p className="slide-kicker text-slide-accent">Mappen</p>
          <div className="mt-[26px] flex flex-col gap-[14px]">
            {skillTree.map(({ depth, label, kind, active }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-[14px] px-[14px] py-[10px] font-mono",
                  active ? "bg-slide-pink" : "",
                )}
                style={{ marginLeft: depth * 26 }}
              >
                <span
                  className={cn(
                    "slide-chrome w-[42px] shrink-0 text-center",
                    kind === "folder" ? "text-slide-ink-soft" : "text-slide-accent",
                  )}
                  aria-hidden
                >
                  {fileIcon[kind]}
                </span>
                <span
                  className={cn(
                    "slide-caption",
                    kind === "folder" ? "text-slide-ink-soft" : "text-slide-ink",
                  )}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="slide-chrome mt-auto leading-snug text-slide-ink-soft">
            Opskriften ligger i SKILL.md. De mekaniske trin ligger i et script, så de kører ens hver
            gang.
          </p>
        </div>
      </Reveal>

      <div className="grid min-h-0 grid-rows-[1fr_auto] gap-[24px]">
        <Reveal delay={0.28} className="min-h-0">
          <CodePanel file="kvartal-tjek / SKILL.md" lines={skillMarkdown} className="h-full" />
        </Reveal>
        <Reveal delay={0.5}>
          <CodePanel file="kvartal-tjek / scripts / tjek-tal.sh" lines={skillScript} />
        </Reveal>
      </div>
    </div>
  );
}
