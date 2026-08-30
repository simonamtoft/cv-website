import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideFrame, SlideLayout, useSlideMotion } from "./SlideLayout";
import {
  AnnotatedPrompt,
  ChatVersusCode,
  ContextFunnel,
  CountUp,
  FolderScopeVisual,
  GrowBar,
  Iceberg,
  Reveal,
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
  render: () => ReactNode;
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
          <span className="slide-body text-slide-bg/75">Simon &amp; Mathias</span>
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

function ProgramSlide() {
  const total = 120;
  const spans = [20, 75, 15];
  return (
    <SlideFrame
      kicker="Program"
      title="Sådan ser de to timer ud"
      lead="Det meste af tiden har I hænderne i tastaturet. Vi holder oplægget kort."
      page={3}
    >
      <div className="flex h-full min-h-0 flex-col justify-between gap-[18px]">
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
        <Reveal delay={0.55}>
          <div className="flex items-baseline gap-[18px] border-t border-slide-rule pt-[14px]">
            <span className="slide-body-lg font-display font-bold text-slide-accent">
              <CountUp to={75} suffix=" min" />
            </span>
            <span className="slide-body text-slide-ink-soft">
              med hænderne i tastaturet. Det er hele pointen.
            </span>
          </div>
        </Reveal>
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
            <p className="slide-body max-w-[620px] text-slide-ink-soft">
              Vi er her hele eftermiddagen. Ræk hånden op, så snart I sidder
              fast.
            </p>
            <img
              src={implementLogo}
              alt=""
              className="mt-[14px] ml-auto h-[48px] w-auto"
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
/* 04: Målet                                                          */
/* ------------------------------------------------------------------ */

function GoalSlide() {
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
          <p className="slide-kicker text-slide-accent-soft">Målet i dag</p>
        </Reveal>
        <Reveal delay={0.18} y={40}>
          <h2 className="slide-title-lg mt-[30px] max-w-[1250px]">
            Byg noget, I selv kan bruge igen
            <BlinkUnderscore />
          </h2>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="slide-subtitle mt-[36px] max-w-[1050px] text-slide-bg/80">
            Tyve minutter fra os. Resten af eftermiddagen er jeres.
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-[80px] grid max-w-[1250px] grid-cols-[1fr_auto_1fr] items-center gap-[50px] border-t border-slide-bg/20 pt-[46px]">
            <div>
              <p className="slide-kicker text-slide-bg/50">Før workshoppen</p>
              <p className="slide-body-lg mt-[14px] text-slide-bg/70">
                I samler opgaven manuelt hver gang
              </p>
            </div>
            <span className="slide-body-lg font-mono text-slide-pink">→</span>
            <div>
              <p className="slide-kicker text-slide-pink">Efter workshoppen</p>
              <p className="slide-body-lg mt-[14px]">
                I har en arbejdsgang, I kan prøve igen
              </p>
            </div>

          </div>
        </Reveal>
      </div>
      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        04
      </span>

    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 05: Mappen                                                         */
/* ------------------------------------------------------------------ */

function FolderSlide() {
  return (
    <SlideFrame
      kicker="Rammen"
      title={
        <>
          Startmappen sætter <span className="slide-mark">rammen</span>
        </>
      }
      page={6}
    >
      <FolderScopeVisual stage="prepared" />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 06: Hvad lægger du i mappen                                        */
/* ------------------------------------------------------------------ */

function DataChoiceSlide() {
  return (
    <SlideFrame
      kicker="Jeres beslutning"
      title={
        <>
          Hvad lægger I i <span className="slide-mark">mappen</span>?
        </>
      }
      page={7}
    >
      <FolderScopeVisual stage="comparison" />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 07: Samme opgave, to udfald                                        */
/* ------------------------------------------------------------------ */

function TwoOutcomesSlide() {
  return (
    <SlideFrame
      kicker="Fra svar til handling"
      title={
        <>
          Chat svarer. Claude Code <span className="slide-mark">udfører</span>.
        </>
      }
      lead="Forskellen er ikke modellen, men værktøjerne."
      page={5}
    >
      <ChatVersusCode />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 08: Hvornår bruger du hvad                                         */
/* ------------------------------------------------------------------ */

function ToolChoiceSlide() {
  const rows: Array<[string, string, string, string]> = [
    [
      "Arbejder med",
      "Det, I skriver eller uploader",
      "Det, I skriver eller uploader",
      "Filer og værktøjer i en arbejdsmappe",
    ],
    [
      "Kan gøre",
      "Svare og lave udkast",
      "Svare og lave udkast",
      "Læse, ændre og køre med tilladelse",
    ],
    [
      "I får med hjem",
      "Et svar i vinduet",
      "Et svar i vinduet",
      "Filer og en synlig arbejdsgang",
    ],
    [
      "God til",
      "Spørgsmål i det godkendte miljø",
      "Sparring og enkeltstående udkast",
      "Opgaver på tværs af flere filer",
    ],
  ];
  return (
    <SlideFrame kicker="Værktøjskassen" title="Hvornår bruger du hvad?" page={8}>
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
                {["Intern GPT", "Claude i browseren", "Claude Code"].map((title, index) => (
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
/* 09: Plan mode                                                      */
/* ------------------------------------------------------------------ */


function PlanSlide() {
  const steps: Array<[string, string]> = [
    ["01", "Åbn projektmappen"],
    ["02", "Skift til Plan mode"],
    ["03", "Iterér planen, til den passer"],
  ];

  // rå markdown-linjer: [markør, tekst]
  const plan: Array<[string, string]> = [
    ["#", "Plan: kvartalsoversigt"],
    ["", ""],
    ["##", "Opgave"],
    ["-", "Saml tallene fra de tre filer"],
    ["-", "Én tabel pr. portefølje"],
    ["", ""],
    ["##", "Fremgangsmåde"],
    ["1.", "Læs filerne, tjek kolonnenavne"],
    ["2.", "Byg tabellen"],
    ["", ""],
    ["##", "Kontrol"],
    ["- [ ]", "Stemmer totalen med rapporten?"],
    ["- [ ]", "Stikprøve på fem rækker"],
  ];

  return (
    <SlideFrame
      kicker="Jeres første tur"
      title="Plan først. Godkend bagefter."
      page={9}
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
                {plan.map(([marker, text], i) => (
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
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.8} className="shrink-0">
          <div className="plan-approval-gate bg-slide-navy px-[40px] py-[22px]">
            <p className="slide-body-lg text-slide-bg">
              Godkend planen, før den rører noget. Tjek bagefter: et tal I
              kender, en stikprøve, formen.
            </p>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  );
}


/* ------------------------------------------------------------------ */
/* 10: Ikke alle valg vejer lige meget                                */
/* ------------------------------------------------------------------ */

function LeverageSlide() {
  const levels: Array<[string, string, string, string]> = [
    [
      "01",
      "Kode",
      "Lokal fejl. Rettes på minutter.",
      "52%",
    ],
    [
      "02",
      "Løsning og plan",
      "Skæv plan opdages, når noget er bygget.",
      "64%",
    ],
    [
      "03",
      "Kildemateriale",
      "Forkerte filer gør resten forkert.",
      "76%",
    ],
    [
      "04",
      "Opgaven",
      "Forkert opgave, løst upåklageligt.",
      "88%",
    ],
    [
      "05",
      "Arbejdsrammen",
      "Skæve rammer gentager fejlen.",
      "100%",
    ],
  ];
  return (
    <SlideFrame
      kicker="Hvor ligger vægten"
      title="Ikke alle valg vejer lige meget"
      lead="Brug tiden dér, hvor den flytter mest: øverst i hierarkiet."
      page={10}
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
            aria-label="Leverage hierarchy from code to operating frame"
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
/* 11: Din første prompt                                              */
/* ------------------------------------------------------------------ */

function PromptSlide() {
  return (
    <SlideFrame
      kicker="Kom i gang"
      title="Din første prompt"
      lead="En god start: fortæl både, hvad den må læse, hvad den skal lave, hvem det er til, og hvad den skal tjekke."
      page={11}
    >
      <AnnotatedPrompt />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 12: Jeres opgaver i dag                                            */
/* ------------------------------------------------------------------ */

type TaskFamily = {
  number: string;
  name: string;
  what: string;
  examples: Array<[string, string]>;
  tone: string;
  numberTone: string;
  ruleTone: string;
  bodyTone: string;
};

function TasksSlide() {
  const families: TaskFamily[] = [
    {
      number: "01",
      name: "Saml og skriv",
      what: "Du har materialet. Der skal komme tekst ud af det.",
      examples: [
        [
          "Fra mødenoter til beslutningsoplæg",
          "Noter, baggrundsmateriale og et tidligere oplæg, der viser formatet.",
        ],
        [
          "Saml en tilbagevendende rapport",
          "Flere kilder samlet ét sted, tjekket og kommenteret.",
        ],
      ],
      tone: "bg-slide-surface border-slide-rule",
      numberTone: "text-slide-ink/25",
      ruleTone: "bg-slide-rule",
      bodyTone: "text-slide-ink-soft",
    },
    {
      number: "02",
      name: "Beregn og modellér",
      what: "Der er tal, og de skal regnes igennem på samme måde hver gang.",
      examples: [
        [
          "Byg et beregningsværktøj",
          "Fra rå data til beregning til et overblik, I kan sende videre.",
        ],
        [
          "Gør en model gentagelig",
          "Beregningen samlet ét sted, så den kan køres igen uden at bygges op forfra.",
        ],
      ],
      tone: "bg-slide-pink border-slide-pink",
      numberTone: "text-slide-ink/35",
      ruleTone: "bg-slide-ink/25",
      bodyTone: "text-slide-ink/75",
    },
    {
      number: "03",
      name: "Følg og kontrollér",
      what: "Det samme tjek skal laves hver gang.",
      examples: [
        [
          "Lav et performanceoverblik",
          "Ét sted at se tallene, i stedet for at samle dem forfra hver gang.",
        ],
        [
          "Saml en screening ét sted",
          "Den faste kontrol hentet fra flere kilder ned i én liste.",
        ],
      ],
      tone: "bg-slide-navy text-slide-bg border-slide-navy",
      numberTone: "text-slide-bg/35",
      ruleTone: "bg-slide-bg/25",
      bodyTone: "text-slide-bg/70",
    },
  ];
  return (
    <SlideFrame
      kicker="OPGAVEEKSEMPLER"
      title="Jeres opgaver i dag"
      lead="Vælg én slags og ét eksempel, I selv har liggende."
      page={12}
    >
      <div className="task-families grid h-full min-h-0 grid-cols-3 gap-[26px] overflow-hidden">
        {families.map((family, index) => (
          <Reveal
            key={family.name}
            delay={0.08 + index * 0.16}
            className="min-h-0"
          >
            <article
              className={cn(
                "flex h-full min-h-0 flex-col border p-[34px]",
                family.tone,
              )}
              data-task-family={family.number}
            >
              <span
                className={cn(
                  "font-display text-[76px] leading-none font-bold",
                  family.numberTone,
                )}
              >
                {family.number}
              </span>
              <h3 className="slide-body-lg mt-[10px] font-display font-bold uppercase leading-none">
                {family.name}
              </h3>
              <p className={cn("slide-caption mt-[14px]", family.bodyTone)}>
                {family.what}
              </p>
              <div className={cn("mt-[26px] h-px w-full", family.ruleTone)} />
              <ul className="mt-[26px] flex min-h-0 flex-col gap-[24px]">
                {family.examples.map(([title, body]) => (
                  <li key={title}>
                    <p className="slide-caption font-semibold leading-tight">
                      {title}
                    </p>
                    <p className={cn("slide-chrome mt-[8px] leading-snug", family.bodyTone)}>
                      {body}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  );

}


/* ------------------------------------------------------------------ */
/* 13: Workshop start                                                 */
/* ------------------------------------------------------------------ */


function WorkshopSlide() {
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
              Nu er det jer
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
            <p className="slide-body mt-[22px] font-mono text-slide-bg/60">
              demo kl. 14.45
            </p>
          </div>
        </Reveal>
      </div>

      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        13
      </span>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 14: Isbjerget                                                      */
/* ------------------------------------------------------------------ */

function IcebergSlide() {
  const hidden: Array<[string, string]> = [
    ["Adgang", "Hvem kan køre den ud over dig?"],
    ["Forkert input", "Fejler den stille, eller siger den fra?"],
    ["Afprøvning", "Den har kun set de tal, I selv gav den."],
    ["Ejerskab", "Hvem samler den op, når den brækker?"],
    ["Data", "Hvor ender de henne?"],
  ];
  return (
    <SlideFrame
      kicker="Fra prototype til drift"
      lead="Prototypen virker. Spørgsmålet er, hvad der ligger under vandlinjen."
      title="Ville du sætte dit navn på det?"
      page={14}
    >
      <Iceberg below={hidden} />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 15: Afslutning                                                     */
/* ------------------------------------------------------------------ */

function ClosingSlide() {
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
        <Reveal delay={0.55}>
          <div className="mt-[80px] grid max-w-[1250px] grid-cols-[1fr_auto_1fr] items-center gap-[50px] border-t border-slide-bg/20 pt-[46px]">
            <div>
              <p className="slide-kicker text-slide-bg/50">I dag</p>
              <p className="slide-body-lg mt-[14px] text-slide-bg/70">
                Vælg opgaven, før du går
              </p>
            </div>
            <span className="slide-body-lg font-mono text-slide-pink">→</span>
            <div>
              <p className="slide-kicker text-slide-pink">En dag i denne uge</p>
              <p className="slide-body-lg mt-[14px]">
                Sæt 30 minutter i kalenderen
              </p>
            </div>
          </div>
        </Reveal>

        <p className="slide-body mt-[56px] font-mono text-slide-bg/70">
          Tak for i dag · amtoft.dev
        </p>
      </div>
      <span className="slide-page absolute right-[130px] bottom-[70px] font-mono text-slide-bg/60">
        15
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
    render: () => <ProgramSlide />,
  },

  {
    id: "maalet",
    title: "Målet i dag",
    render: () => <GoalSlide />,
  },
  {
    id: "to-udfald",
    title: "Fra svar til handling",
    render: () => <TwoOutcomesSlide />,
  },
  {
    id: "mappen",
    title: "Mappen er Claudes verden",
    render: () => <FolderSlide />,
  },
  {
    id: "data",
    title: "Hvad lægger I i mappen",
    render: () => <DataChoiceSlide />,
  },
  {
    id: "vaerktoej",
    title: "Hvornår bruger du hvad",
    render: () => <ToolChoiceSlide />,
  },
  {
    id: "plan-mode",
    title: "Plan først. Tjek bagefter",
    render: () => <PlanSlide />,
  },
  {
    id: "vaegt",
    title: "Ikke alle valg vejer lige meget",
    render: () => <LeverageSlide />,
  },
  {
    id: "foerste-prompt",
    title: "Din første prompt",
    render: () => <PromptSlide />,
  },
  {
    id: "opgaver",
    title: "Jeres opgaver i dag",
    render: () => <TasksSlide />,
  },
  {
    id: "workshop",
    title: "Nu er det jer",
    render: () => <WorkshopSlide />,
  },

  {
    id: "isbjerg",
    title: "Prototype vs. drift",
    render: () => <IcebergSlide />,
  },
  {
    id: "afslutning",
    title: "Prøv det igen inden fredag",
    render: () => <ClosingSlide />,
  },
];

