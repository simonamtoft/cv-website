import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideFrame, SlideLayout, useSlideMotion } from "./SlideLayout";
import {
  AnnotatedPrompt,
  ChatVersusCode,
  ContextFunnel,
  FolderScopeVisual,
  GrowBar,
  Iceberg,
  Reveal,
  SkillFolderVisual,
  inViewSoft,
} from "./visuals";
import { cn } from "../utils";
import simonPhoto from "../assets/siap.jpg";
import mathiasPhoto from "../assets/mave.jpg";
import imLogoNegative from "../assets/IM_-logo_negativ.svg";
import implementLogo from "../assets/Implement_plain.svg";
import implementLogoNegative from "../assets/Implement_plain_negativ.svg";

export type Slide = {
  id: string;
  title: string;
  /** The deck owns slide order, so each slide is told its own page number. */
  render: (page: number) => ReactNode;
};

/* ------------------------------------------------------------------ */
/* Blinkende underscore: Implement "stay in beta"-motiv                */
/* ------------------------------------------------------------------ */

function BlinkUnderscore() {
  const animate = useSlideMotion();
  return (
    <motion.span
      className="text-slide-accent-soft"
      animate={animate ? { opacity: [1, 1, 0.1, 0.1] } : { opacity: 1 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
    >
      _
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/* 01: Forside                                                        */
/* ------------------------------------------------------------------ */

function TitleSlide() {
  return (
    <SlideLayout variant="navy">
      {/* Rolig, flad farveblok i Implement-stil, uden effekter. */}
      <div className="absolute top-0 right-0 h-full w-[34%] bg-slide-bg/[0.04]" />
      <div className="absolute top-0 right-[34%] h-full w-px bg-slide-bg/15" />
      <div className="absolute top-0 right-0 h-[16px] w-[34%] bg-slide-pink" />

      <div className="relative flex h-full flex-col justify-between px-[130px] pt-[110px] pb-[90px]">

        <div className="flex items-start justify-between">
          <p className="slide-kicker text-slide-pink">Practical workshop</p>
          <img
            src={implementLogoNegative}
            alt="Implement Consulting Group"
            className="h-[64px] w-auto"
          />
        </div>
        <div>
          <Reveal delay={0.05} y={40}>
            <h1 className="slide-title-lg max-w-[1400px]">
              Claude Code
              <BlinkUnderscore />
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="slide-subtitle mt-[34px] max-w-[1100px] text-slide-bg/80">
              Byg noget i dag, som du kan bruge igen.
            </p>
          </Reveal>
        </div>
        <div className="flex items-end justify-between border-t border-slide-bg/25 pt-[28px]">
          <span className="slide-body text-slide-bg/75">
            31. august 2026 · kl. 13.00-15.00
          </span>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 02: Program                                                        */
/* ------------------------------------------------------------------ */

const program: Array<[string, string, string]> = [
  ["13.00 – 13.20", "Kort om at kode med AI", "Hvad det er, hvad det ikke er."],
  ["13.25 – 14.40", "Workshop", "I bygger. Vi går rundt og hjælper undervejs."],
  ["14.45 – 15.00", "Fælles opsamling", "Vil nogen vise noget, er der tid."],
];

function ProgramSlide({ page }: { page: number }) {
  const total = 120;
  const spans = [20, 75, 15];
  return (
    <SlideFrame
      kicker="Program"
      title="Sådan ser de to timer ud"
      lead="Det meste af tiden har I hænderne i tastaturet. Vi holder oplægget kort."
      page={page}
    >
      <div className="flex h-full min-h-0 flex-col justify-center">
        <div className="border border-slide-rule bg-slide-surface">
          {program.map(([time, heading, note], i) => (
            <div key={time}>
              {i > 0 && (
                <Reveal delay={0.1 + i * 0.12}>
                  <div className="flex items-center gap-[24px] border-y border-slide-rule bg-slide-bg px-[36px] py-[6px]">
                    <span className="slide-caption w-[340px] shrink-0 font-mono text-slide-ink-soft">
                      5 min
                    </span>
                    <span className="slide-caption uppercase tracking-[0.2em] text-slide-ink-soft">
                      Pause
                    </span>
                  </div>
                </Reveal>
              )}
              <Reveal delay={0.06 + i * 0.12}>
                <div className="flex items-center gap-[24px] px-[36px] py-[14px]">
                  <span className="slide-body-lg w-[340px] shrink-0 whitespace-nowrap font-mono text-slide-accent">
                    {time}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="slide-subtitle font-display font-bold uppercase leading-none">
                      {heading}
                    </h3>
                    <p className="slide-body mt-[4px] text-slide-ink-soft">
                      {note}
                    </p>
                  </div>
                  <div className="flex w-[300px] shrink-0 items-center gap-[16px]">
                    <div className="flex-1">
                      <GrowBar
                        fraction={spans[i]! / total}
                        delay={0.28 + i * 0.12}
                        className={i === 1 ? "bg-slide-green" : "bg-slide-accent"}
                      />
                    </div>
                    <span className="slide-caption w-[72px] shrink-0 whitespace-nowrap font-mono text-slide-ink-soft">
                      {spans[i]} min
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}


/* ------------------------------------------------------------------ */
/* 03: Os to                                                          */
/* ------------------------------------------------------------------ */

function Host({
  index,
  name,
  role,
  field,
  photo,
  tint,
  align = "left",
}: {
  index: number;
  name: string;
  role: string;
  field: string;
  photo: string;
  tint: string;
  align?: "left" | "right";
}) {
  const animate = useSlideMotion();
  const delay = 0.15 + index * 0.18;
  return (
    <div className="relative h-full overflow-hidden">
      {/* colour block behind the portrait */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ background: tint }}
        initial={animate ? { height: 0 } : false}
        whileInView={{ height: "100%" }}
        viewport={inViewSoft}
        transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* portrait */}
      <motion.img
        src={photo}
        alt={name}
        className="absolute bottom-0 h-[860px] w-full object-cover object-[50%_18%] contrast-[1.05]"
        initial={animate ? { opacity: 0, y: 60 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewSoft}
        transition={{ delay: delay + 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="portrait-text-scrim absolute inset-x-0 bottom-0 h-[460px]" />

      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col gap-[10px] p-[52px] ${
          align === "right" ? "items-end text-right" : "items-start"
        }`}
      >
        <motion.h3
          className="slide-title font-display uppercase leading-[0.9] text-slide-bg"
          initial={animate ? { opacity: 0, y: 30 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewSoft}
          transition={{ delay: delay + 0.35, duration: 0.6 }}
        >
          {name}
        </motion.h3>
        <motion.div
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={inViewSoft}
          transition={{ delay: delay + 0.5, duration: 0.6 }}
          className={align === "right" ? "items-end" : "items-start"}
        >
          <p className="slide-body-lg text-slide-bg">{role}</p>
          <p className="slide-body mt-[10px] max-w-[720px] text-slide-bg/70">
            {field}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function HostsSlide() {
  const animate = useSlideMotion();
  return (
    <SlideLayout>
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between px-[80px] pt-[64px]">
          <div>
            <p className="slide-kicker text-slide-accent">Hvem står her</p>
            <motion.h2
              className="slide-title-lg mt-[16px] font-display uppercase leading-[0.88]"
              initial={animate ? { opacity: 0, y: 30 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewSoft}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Hej
            </motion.h2>
          </div>
          <div className="pb-[10px] text-right">
            <img
              src={implementLogo}
              alt=""
              className="ml-auto h-[48px] w-auto"
            />
          </div>
        </div>

        <motion.div
          className="mx-[80px] mt-[34px] h-[3px] origin-left bg-slide-accent"
          initial={animate ? { scaleX: 0 } : false}
          whileInView={{ scaleX: 1 }}
          viewport={inViewSoft}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="mt-[30px] grid flex-1 grid-cols-2 gap-[24px] px-[80px] pb-[46px]">
          <Host
            index={0}
            name="Simon"
            role="Generative AI-konsulent, The Tech Collective"
            field="Cand.polyt. i matematisk modellering og computing, DTU"
            photo={simonPhoto}
            tint="var(--slide-ink)"
          />
          <Host
            index={1}
            name="Mathias"
            role="Kommerciel strategikonsulent, Implement Consulting Group"
            field="Cand.merc. i Innovation Management & Business Development, Aarhus BSS"
            photo={mathiasPhoto}
            tint="var(--slide-ink)"
            align="right"
          />
        </div>
      </div>
    </SlideLayout>
  );
}



/* ------------------------------------------------------------------ */
/* 05: Mappen                                                         */
/* ------------------------------------------------------------------ */

function FolderSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Rammen"
      title={
        <>
          Mappen er Claudes <span className="slide-mark">verden</span>
        </>
      }
      page={page}
    >
      <FolderScopeVisual />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 04: Samme opgave, to udfald                                        */
/* ------------------------------------------------------------------ */

function TwoOutcomesSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Fra svar til handling"
      title={
        <>
          Chat svarer. Claude Code <span className="slide-mark">udfører</span>.
        </>
      }
      lead="Forskellen er ikke modellen, men værktøjerne."
      page={page}
    >
      <ChatVersusCode />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 06: Så meget må Claude gøre                                       */
/* ------------------------------------------------------------------ */

type PermissionMode = {
  name: string;
  summary: string;
  use: string;
  tone: string;
  textTone: string;
};

function PermissionModesSlide({ page }: { page: number }) {
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
      use: "Terminal og ekstra adgang spørger stadig.",
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
      lead="Vælg den mindst selvkørende indstilling, der stadig passer til opgaven."
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

/* ------------------------------------------------------------------ */
/* 07: Hvornår bruger du hvad                                         */
/* ------------------------------------------------------------------ */

function ToolChoiceSlide({ page }: { page: number }) {
  const rows: Array<[string, string, string, string]> = [
    [
      "Hvad det er",
      "Jeres egen chat, driftet af jeres IT",
      "Anthropics chat i browser og app",
      "En agent i en mappe på jeres maskine",
    ],
    [
      "Data",
      "Bliver i det godkendte miljø",
      "Det, I indsætter, forlader huset",
      "Den vælger selv, hvad den læser og sender med",
    ],
    [
      "Brug til",
      "Materiale, der ikke må sendes ud",
      "Sparring og hurtige udkast",
      "Arbejde på tværs af filer: præsentationer, analyser, demoer",
    ],
    [
      "Brug ikke til",
      "Det, jeres IT ikke har rullet ud endnu",
      "Materiale, der ikke må ud, og arbejde, der skal ende i filer",
      "Hurtige spørgsmål, og mapper med materiale, der ikke må ud",
    ],
  ];
  return (
    <SlideFrame kicker="Værktøjskassen" title="Hvornår bruger du hvad?" page={page}>
      <div className="flex h-full min-h-0 flex-col gap-[22px] overflow-hidden">
        <div className="tool-choice-table min-h-0 flex-1 overflow-hidden bg-slide-bg p-[2px]">
          <table className="h-full w-full table-fixed border-separate border-spacing-[2px] text-left">
            <colgroup>
              <col className="w-[340px]" />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="bg-slide-surface px-[28px] py-[14px]" />
                {["Intern GPT", "Claude Chat", "Claude Code"].map((title, index) => (
                  <th
                    key={title}
                    scope="col"
                    className={cn(
                      "px-[28px] py-[14px] align-bottom",
                      index === 2 ? "bg-slide-pink" : "bg-slide-surface",
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
              {rows.map(([label, a, b, c], index) => (
                <tr key={label}>
                  <th scope="row" className="bg-slide-surface px-[28px] py-[6px] align-top">
                    <span className="slide-caption font-mono uppercase tracking-[0.12em] text-slide-accent">
                      {label}
                    </span>
                  </th>
                  <td className="bg-slide-surface px-[28px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink-soft">{a}</p>
                  </td>
                  <td className="bg-slide-surface px-[28px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink-soft">{b}</p>
                  </td>
                  <td className="bg-slide-pink/35 px-[28px] py-[6px] align-top">
                    <p className="slide-body text-slide-ink">{c}</p>
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

/* ------------------------------------------------------------------ */
/* 08: Plan mode                                                      */
/* ------------------------------------------------------------------ */


function PlanSlide({ page }: { page: number }) {
  const steps: Array<[string, string]> = [
    ["01", "Åbn projektmappen"],
    ["02", "Skift til Plan mode"],
    ["03", "Iterér planen, til den passer"],
    ["04", "Løs én opgave ad gangen"],
  ];

  // rå markdown-linjer: [markør, tekst, status]
  const plan: Array<[string, string, string?]> = [
    ["#", "Plan: kvartal-oversigt"],
    ["", ""],
    ["##", "Opgave"],
    ["-", "Saml tallene fra de tre q3-filer"],
    ["-", "Én række pr. selskab"],
    ["", ""],
    ["##", "Fremgangsmåde"],
    ["1.", "Læs filerne, tjek kolonnenavne", "løst"],
    ["2.", "Byg tabellen", "næste"],
    ["", ""],
    ["##", "Kontrol"],
    ["- [ ]", "Stemmer totalen med rapporten?"],
    ["- [ ]", "Stikprøve på fem rækker"],
  ];

  return (
    <SlideFrame
      kicker="Jeres første tur"
      title="Plan først. Godkend bagefter."
      lead="Godkend planen, før den rører noget. Og hold opgaven lille: jo længere Claude arbejder i træk, jo dårligere bliver svarene — og jo dyrere bliver turen."
      page={page}
    >
      <div className="plan-mode-journey flex h-full min-h-0 flex-col gap-[24px] overflow-hidden">
        <div className="grid min-h-0 flex-1 grid-cols-[0.85fr_0.9fr_1.25fr] gap-[44px]">
          {/* Trinene */}
          <div className="flex min-h-0 flex-col">
            <Reveal delay={0.06}>
              <p className="slide-kicker text-slide-accent">
                Konteksten udvider sig
              </p>
            </Reveal>
            <div className="mt-[24px] flex flex-col gap-[22px]">
              {steps.map(([n, label], i) => (
                <Reveal key={n} delay={0.16 + i * 0.1}>
                  <div className="flex gap-[18px]">
                    <span className="slide-caption shrink-0 pt-[8px] font-mono text-slide-accent">
                      {n}
                    </span>
                    <p className="slide-body-lg font-semibold leading-tight">
                      {label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Tragten */}
          <Reveal delay={0.2} className="min-h-0">
            <div className="h-full w-full">
              <ContextFunnel />
            </div>
          </Reveal>

          {/* plan.md */}
          <Reveal delay={0.34} className="min-h-0">
            <div className="flex h-full flex-col overflow-hidden bg-slide-surface">
              <div className="flex items-center gap-[10px] border-b border-slide-ink/12 px-[26px] py-[14px]">
                <span className="h-[9px] w-[9px] shrink-0 bg-slide-accent" />
                <span className="slide-caption font-mono text-slide-ink-soft">
                  plan.md
                </span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col justify-center gap-[3px] px-[26px] py-[22px]">
                {plan.map(([marker, text, status], i) => (
                  <div
                    key={`${marker}-${text}-${i}`}
                    className="flex items-baseline gap-[10px] font-mono text-[19px] leading-[1.5]"
                  >
                    <span className="w-[22px] shrink-0 select-none text-right text-[14px] text-slide-ink/25">
                      {i + 1}
                    </span>
                    {marker === "" ? (
                      <span>&nbsp;</span>
                    ) : (
                      <>
                        <span
                          className={
                            marker.startsWith("#")
                              ? "shrink-0 text-slide-accent"
                              : "shrink-0 text-slide-ink/40"
                          }
                        >
                          {marker}
                        </span>
                        <span
                          className={
                            marker.startsWith("#")
                              ? "font-semibold text-slide-ink"
                              : "text-slide-ink-soft"
                          }
                        >
                          {text}
                        </span>
                        {status && (
                          <span className="ml-auto shrink-0 text-[14px] uppercase tracking-[0.1em] text-slide-accent">
                            {status}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  );
}


/* ------------------------------------------------------------------ */
/* 09: Ikke alle valg vejer lige meget                                */
/* ------------------------------------------------------------------ */

function LeverageSlide({ page }: { page: number }) {
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
      "De faste instruktioner (CLAUDE.md)",
      "Skæve rammer gentager fejlen i hver opgave.",
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

/* ------------------------------------------------------------------ */
/* 10: Din første prompt                                              */
/* ------------------------------------------------------------------ */

function PromptSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Kom godt i gang"
      title="Din første prompt"
      page={page}
    >
      <AnnotatedPrompt />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 11: Jeres opgaver i dag                                            */
/* ------------------------------------------------------------------ */

type DeliveryStep = {
  number: string;
  name: string;
  instruction: string;
  tone: string;
};

function TasksSlide({ page }: { page: number }) {
  const steps: DeliveryStep[] = [
    {
      number: "01",
      name: "Vælg",
      instruction: "Et lille eksempel, I kender: et par ufølsomme filer eller en overskuelig opgave.",
      tone: "bg-slide-surface border-slide-rule",
    },
    {
      number: "02",
      name: "Åbn mappen",
      instruction: "Lad Claude kigge rundt, og fortæl kort hvad I gerne vil prøve af.",
      tone: "bg-slide-pink border-slide-pink",
    },
    {
      number: "03",
      name: "Bed om en plan",
      instruction: "Brug Plan mode til at undersøge opgaven og foreslå næste skridt.",
      tone: "bg-slide-surface border-slide-rule",
    },
    {
      number: "04",
      name: "Prøv og tjek",
      instruction: "Lad Claude lave en ændring. Kør en kontrol, og kig resultatet eller diffet igennem.",
      tone: "bg-slide-surface border-slide-rule",
    },
    {
      number: "05",
      name: "Del et fund",
      instruction: "Vis en god prompt, en overraskelse eller noget, der ikke virkede endnu.",
      tone: "bg-slide-navy border-slide-navy text-slide-bg",
    },
  ];
  return (
    <SlideFrame
      kicker="Workshop-opgaven"
      title="Få jord under neglene"
      lead="Prøv Claude Code på noget, I genkender. I behøver ikke at blive færdige — bare kom i gang og se, hvad I lærer."
      page={page}
    >
      <div className="delivery-exercise flex h-full min-h-0 flex-col justify-center overflow-hidden">
        <Reveal delay={0.06}>
          <div className="flex items-center justify-between border border-slide-rule bg-slide-surface px-[34px] py-[20px]">
            <div>
              <p className="slide-kicker text-slide-accent">Et godt udgangspunkt</p>
              <p className="slide-body-lg mt-[6px] font-semibold">
                En lille, kendt opgave er rigeligt til at komme i gang.
              </p>
            </div>
            <div className="border-l border-slide-rule pl-[30px] text-right">
              <p className="slide-caption font-mono uppercase tracking-[0.12em] text-slide-ink-soft">Hvis I når det</p>
              <p className="slide-body mt-[5px] font-semibold">input → handling → resultat</p>
            </div>
          </div>
        </Reveal>
        <div className="mt-[26px] grid min-h-0 flex-1 grid-cols-5 gap-[16px]">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={0.16 + index * 0.1} className="min-h-0">
              <article
                className={cn("flex h-full min-h-0 flex-col border p-[26px]", step.tone)}
                data-delivery-step={step.number}
              >
                <span className="slide-caption font-mono opacity-55">{step.number}</span>
                <h3 className="slide-body-lg mt-[22px] font-display font-bold uppercase leading-none">
                  {step.name}
                </h3>
                <div className="mt-[22px] h-px w-full bg-current opacity-20" />
                <p className="slide-caption mt-[22px] leading-snug opacity-75">{step.instruction}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}


/* ------------------------------------------------------------------ */
/* 12: Workshop start                                                 */
/* ------------------------------------------------------------------ */


function WorkshopSlide({ page }: { page: number }) {
  return (
    <SlideLayout variant="navy">
      <div className="absolute top-0 left-0 h-[16px] w-[420px] bg-slide-pink" />
      <img
        src={imLogoNegative}
        alt=""
        className="absolute top-[78px] right-[130px] h-[48px] w-auto"
      />
      <div className="relative grid h-full grid-cols-[1.4fr_0.6fr] items-center gap-[80px] px-[140px]">
        <div>
          <Reveal delay={0.05}>
            <p className="slide-kicker text-slide-accent-soft">Workshop</p>
          </Reveal>
          <Reveal delay={0.18} y={40}>
            <h2 className="slide-title-lg mt-[30px]">
              Prøv jeres idéer af
              <BlinkUnderscore />
            </h2>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="slide-subtitle mt-[40px] max-w-[1000px] text-slide-bg/80">
              Vi samler op kl. 14.45. Har I noget at vise, er der tid til det.
            </p>
          </Reveal>

        </div>
        <Reveal delay={0.6}>
          <div className="border-l border-slide-bg/20 pl-[46px]">
            <p className="slide-kicker text-slide-pink">Til rådighed</p>
            <p className="font-display text-[190px] leading-[0.9] font-bold uppercase">
              75
            </p>
            <p className="slide-body-lg font-display uppercase tracking-[0.06em]">
              minutter
            </p>
          </div>
        </Reveal>
      </div>

      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        {String(page).padStart(2, "0")}
      </span>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 13: Skills                                                         */
/* ------------------------------------------------------------------ */

function SkillSlide({ page }: { page: number }) {
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

/* ------------------------------------------------------------------ */
/* 14: Isbjerget                                                      */
/* ------------------------------------------------------------------ */

function IcebergSlide({ page }: { page: number }) {
  const hidden: Array<[string, string]> = [
    ["Adgang", "Kan andre overhovedet starte den? Og ser de tal, de ikke må se?"],
    [
      "Forkert input",
      "Nye tal, nyt format. Siger den fra, eller regner den videre på noget forkert?",
    ],
    ["Afprøvning", "Den har kun set de tal, du selv gav den."],
    ["Ejerskab", "Hvem vedligeholder den, og hvem supporterer, når den fejler?"],
    ["Data", "Kan du forklare bagefter, hvor tallene endte?"],
  ];
  return (
    <SlideFrame
      kicker="Fra prototype til drift"
      title="Hvad sker der, når du er på ferie?"
      page={page}
    >
      <Iceberg below={hidden} />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 15: Afslutning                                                     */
/* ------------------------------------------------------------------ */

function ClosingSlide({ page }: { page: number }) {
  return (
    <SlideLayout variant="navy">
      <div className="absolute top-0 left-0 h-[16px] w-[420px] bg-slide-pink" />
      <img
        src={imLogoNegative}
        alt=""
        className="absolute top-[78px] right-[130px] h-[48px] w-auto"
      />
      <div className="relative flex h-full flex-col justify-center px-[140px]">
        <Reveal delay={0.05}>
          <p className="slide-kicker text-slide-accent-soft">Med hjem</p>
        </Reveal>
        <Reveal delay={0.16} y={40}>
          <h2 className="slide-title-lg mt-[30px] max-w-[1250px]">
            Prøv det igen inden fredag
            <BlinkUnderscore />
          </h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="slide-subtitle mt-[36px] max-w-[1050px] text-slide-bg/80">
            Ikke et projekt. Bare én opgave, du plejer at lave i hånden.
          </p>
        </Reveal>
        <p className="slide-body mt-[56px] font-mono text-slide-bg/70">
          Tak for i dag · amtoft.dev ·{" "}
          <a
            href="mailto:siap@thetechcollective"
            className="transition-colors hover:text-slide-pink focus-visible:text-slide-pink focus-visible:outline-none"
          >
            siap@thetechcollective
          </a>
        </p>
      </div>
      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        {String(page).padStart(2, "0")}
      </span>
    </SlideLayout>
  );
}


/* ------------------------------------------------------------------ */

export const slides: Slide[] = [
  {
    id: "forside",
    title: "Claude Code",
    render: () => <TitleSlide />,
  },
  {
    id: "os-to",
    title: "Hvem står her",
    render: () => <HostsSlide />,
  },
  {
    id: "program",
    title: "Program",
    render: (page) => <ProgramSlide page={page} />,
  },
  {
    id: "to-udfald",
    title: "Chat svarer. Claude Code udfører",
    render: (page) => <TwoOutcomesSlide page={page} />,
  },
  {
    id: "mappen",
    title: "Mappen er Claudes verden",
    render: (page) => <FolderSlide page={page} />,
  },
  {
    id: "tilladelser",
    title: "Hvor meget må Claude gøre selv",
    render: (page) => <PermissionModesSlide page={page} />,
  },
  {
    id: "vaerktoej",
    title: "Hvornår bruger du hvad",
    render: (page) => <ToolChoiceSlide page={page} />,
  },
  {
    id: "plan-mode",
    title: "Plan først. Godkend bagefter",
    render: (page) => <PlanSlide page={page} />,
  },
  {
    id: "vaegt",
    title: "Ikke alle valg vejer lige meget",
    render: (page) => <LeverageSlide page={page} />,
  },
  {
    id: "foerste-prompt",
    title: "Din første prompt",
    render: (page) => <PromptSlide page={page} />,
  },
  {
    id: "opgaver",
    title: "Jeres opgaver i dag",
    render: (page) => <TasksSlide page={page} />,
  },
  {
    id: "workshop",
    title: "Prøv jeres idéer af",
    render: (page) => <WorkshopSlide page={page} />,
  },

  {
    id: "skills",
    title: "Skriv opskriften én gang",
    render: (page) => <SkillSlide page={page} />,
  },
  {
    id: "isbjerg",
    title: "Prototype vs. drift",
    render: (page) => <IcebergSlide page={page} />,
  },
  {
    id: "afslutning",
    title: "Prøv det igen inden fredag",
    render: (page) => <ClosingSlide page={page} />,
  },
];

