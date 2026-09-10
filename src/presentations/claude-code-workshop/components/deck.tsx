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
  ToolLadder,
  Trifecta,
  WorkshopCountdown,
  inViewSoft,
} from "./visuals";
import { cn } from "../utils";
import { formatTime, scheduleById, scheduledItems } from "../schedule";
import simonPhoto from "../assets/siap.jpg";
import jeppePhoto from "../assets/jere.jpg";
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

/**
 * Hand-maintained: signals how fresh the product claims are (Chat/Cowork/Code
 * capabilities, permission modes). Bump it when those claims are revised, not
 * on every edit to the deck.
 */
const LAST_REVISED = "september 2026";

function TitleSlide() {
  return (
    <SlideLayout variant="navy">
      {/* Rolig, flad farveblok i Implement-stil, uden effekter. */}
      <div className="absolute top-0 right-0 h-full w-[34%] bg-slide-bg/[0.04]" />
      <div className="absolute top-0 right-[34%] h-full w-px bg-slide-bg/15" />
      <div className="absolute top-0 right-0 h-[16px] w-[34%] bg-slide-pink" />

      <div className="relative flex h-full flex-col justify-between px-[130px] pt-[110px] pb-[90px]">

        <div className="flex items-start justify-between">
          <div>
            <p className="slide-kicker text-slide-pink">Practical workshop</p>
            <p className="slide-caption mt-[16px] font-mono text-slide-bg/80">
              Senest revideret · {LAST_REVISED}
            </p>
          </div>
          <img
            src={implementLogoNegative}
            alt="Implement Consulting Group"
            className="h-[64px] w-auto"
          />
        </div>
        <div>
          <Reveal delay={0.05} y={40}>
            <h1 className="slide-title-lg max-w-[1400px]">
              Claude i praksis
              <BlinkUnderscore />
            </h1>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="slide-subtitle mt-[34px] max-w-[1100px] text-slide-bg/80">
              Chat · Cowork · Code — byg noget i dag, som du kan bruge igen.
            </p>
          </Reveal>
        </div>
      </div>
    </SlideLayout>
  );
}

/* ------------------------------------------------------------------ */
/* 02: Program                                                        */
/* ------------------------------------------------------------------ */

function ProgramSlide({ page }: { page: number }) {
  const total = scheduledItems.reduce((sum, item) => sum + item.duration, 0);
  return (
    <SlideFrame
      kicker="Program"
      title="Sådan ser eftermiddagen ud"
      page={page}
    >
      <div className="flex h-full min-h-0 flex-col justify-center">
        <div className="program-schedule border border-slide-rule bg-slide-surface">
          {scheduledItems.map((item, index) => (
            <Reveal key={item.id} delay={0.06 + index * 0.12}>
              <div
                className="flex items-center gap-[24px] px-[36px] py-[12px]"
                data-schedule-item={item.id}
                data-start={formatTime(item.start)}
                data-end={formatTime(item.end)}
                data-duration-minutes={item.duration}
              >
                <span className="slide-body-lg w-[340px] shrink-0 whitespace-nowrap font-mono text-slide-accent">
                  {formatTime(item.start)} – {formatTime(item.end)}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="slide-subtitle font-display font-bold uppercase leading-none">
                    {item.heading}
                  </h3>
                  <p className="slide-body mt-[6px] text-slide-ink-soft">{item.note}</p>
                </div>
                <div className="flex w-[300px] shrink-0 items-center gap-[16px]">
                  <div className="flex-1">
                    <GrowBar
                      fraction={item.duration / total}
                      delay={0.28 + index * 0.12}
                      className={item.kind === "exercise" ? "bg-slide-green" : "bg-slide-accent"}
                    />
                  </div>
                  <span className="slide-caption w-[72px] shrink-0 whitespace-nowrap font-mono text-slide-ink-soft">
                    {item.duration} min
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}


/* ------------------------------------------------------------------ */
/* 03: Udbytte og afgrænsning                                        */
/* ------------------------------------------------------------------ */

const outcomes: Array<[string, string, string]> = [
  [
    "01",
    "Et resultat, I har tjekket",
    "En fil eller ændring, I kan åbne, gennemgå og kontrollere — også hvis den ikke er færdig.",
  ],
  [
    "02",
    "En godkendt plan",
    "En overskuelig opgave, delt op i trin, I har set og sagt ja til.",
  ],
  [
    "03",
    "Et næste forsøg",
    "Én opgave fra jeres egen hverdag, I vil prøve igen inden næste fredag.",
  ],
];

function OutcomesSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="I går herfra med"
      title="Noget, I kan bygge videre på"
      lead="Ikke en færdig løsning — men en arbejdsform, I har prøvet på en rigtig opgave: først i Claude Chat, bagefter i Claude Code."
      page={page}
    >
      <div className="flex h-full min-h-0 flex-col justify-center overflow-hidden">
        <div className="grid grid-cols-3 gap-[20px]">
          {outcomes.map(([number, heading, body], index) => (
            <Reveal key={number} delay={0.08 + index * 0.12}>
              <article className="flex h-[310px] flex-col border border-slide-rule bg-slide-surface p-[30px]">
                <span className="slide-caption font-mono text-slide-accent">{number}</span>
                <h3 className="slide-body-lg mt-[30px] font-display font-bold uppercase leading-none">
                  {heading}
                </h3>
                <p className="slide-body mt-auto text-slide-ink-soft">{body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5} className="mt-[28px]">
          <p className="slide-body border-l-[7px] border-slide-accent bg-slide-pink/25 px-[28px] py-[18px] text-slide-ink-soft">
            <span className="font-semibold text-slide-ink">I dag gør vi ikke:</span>{" "}
            Forklarer, hvordan en sprogmodel virker, samler en promptbog eller sætter noget i produktion.
          </p>
        </Reveal>
      </div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 04: Kontakt                                                        */
/* ------------------------------------------------------------------ */

function Host({
  index,
  name,
  role,
  field,
  contact,
  photo,
  tint,
  align = "left",
}: {
  index: number;
  name: string;
  role: string;
  field: string;
  contact: string;
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
      <div className="portrait-text-scrim absolute inset-x-0 bottom-0 h-[560px]" />

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
          <a
            href={`mailto:${contact}`}
            className="slide-body mt-[6px] text-slide-bg/85 underline decoration-slide-pink underline-offset-[6px] transition-colors hover:text-slide-pink focus-visible:text-slide-pink focus-visible:outline-none"
          >
            {contact}
          </a>
          <p className="mt-[14px] max-w-[720px] text-[24px] leading-[1.32] text-slide-bg/75">
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
            <p className="slide-kicker text-slide-accent">Claude i praksis</p>
            <motion.h2
              className="slide-title-lg mt-[16px] font-display uppercase leading-[0.88]"
              initial={animate ? { opacity: 0, y: 30 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inViewSoft}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Tag fat i os
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
            field="Hjælper virksomheder med at finde, hvor AI faktisk passer ind – og bygge det sammen med dem."
            contact="siap@thetechcollective.eu"
            photo={simonPhoto}
            tint="var(--slide-ink)"
          />
          <Host
            index={1}
            name="Jeppe Rasmussen"
            role="AI Engineer, The Tech Collective"
            field="Udvikler AI-agenter og RAG-applikationer."
            contact="jere@thetechcollective.eu"
            photo={jeppePhoto}
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

/* ------------------------------------------------------------------ */
/* 06: Tre værktøjer, tre niveauer                                    */
/* ------------------------------------------------------------------ */

function ThreeToolsSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Tre værktøjer"
      title={
        <>
          Chat svarer. Cowork arbejder. Code <span className="slide-mark">bygger</span>.
        </>
      }
      lead="Samme model — forskellen er, hvor arbejdet lever."
      page={page}
    >
      <ToolLadder />
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

/* ------------------------------------------------------------------ */
/* 07: Hvornår bruger du hvad                                         */
/* ------------------------------------------------------------------ */

function ToolChoiceSlide({ page }: { page: number }) {
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

/* ------------------------------------------------------------------ */
/* 10: Den kombination der ikke må opstå                              */
/* ------------------------------------------------------------------ */

function TrifectaSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Sikkerhed"
      title="Tre ting, der ikke må mødes"
      lead="Hver for sig nyttige. Sammen kan de sende jeres data ud."
      page={page}
    >
      <Trifecta />
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 08: Plan mode                                                      */
/* ------------------------------------------------------------------ */


function ModelEffortSlide({ page }: { page: number }) {
  const levels = ["Low", "Medium", "High", "Extra High", "Max"];
  return (
    <SlideFrame
      kicker="Model og tænketid"
      title="To valg: model og tænketid"
      lead="Mod højre: mere kapacitet eller tænketid — højere omkostning."
      page={page}
      footer="Kilde: code.claude.com/docs/en/model-config · Niveauer afhænger af model og adgang"
    >
      <div className="flex h-full flex-col gap-[32px]">
        <div className="grid grid-cols-[280px_1fr] gap-[40px]">
          <div>
            <h3 className="slide-body-lg">Vælg model</h3>
            <p className="mt-[12px] text-[26px] text-slide-ink-soft">Hvor svær er opgaven?</p>
          </div>
          <div>
            <div className="grid grid-cols-3 gap-[20px]">
              {[
                ["Haiku", "Kræver tæt guidning", "Små, tydelige opgaver. Giv konkrete trin og tjek resultatet.", "bg-slide-accent/5"],
                ["Sonnet", "God til implementering", "Afgrænsede opgaver og dagligt kodearbejde.", "bg-slide-accent/10"],
                ["Opus", "Stærkest til planlægning", "Komplekse planer, uklare krav og svære afvejninger.", "bg-slide-accent/20"],
              ].map(([title, role, text, tint]) => (
                <div key={title} className={cn("border-t-[4px] border-slide-accent p-[24px]", tint)}>
                  <h4 className="text-[36px] font-medium">{title}</h4>
                  <p className="mt-[12px] text-[27px] font-medium">{role}</p>
                  <p className="mt-[10px] text-[26px] leading-[1.35] text-slide-ink-soft">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-[18px] flex items-center gap-[20px] text-[26px] font-medium text-slide-accent">
              <span>Enkle opgaver</span>
              <span aria-hidden="true" className="h-[3px] min-w-[40px] flex-1 bg-slide-accent" />
              <span>Mere kapacitet · højere tokenomkostning →</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[280px_1fr] gap-[40px] border-t border-slide-rule pt-[28px]">
          <div>
            <h3 className="slide-body-lg">Vælg effort</h3>
            <p className="mt-[12px] text-[26px] text-slide-ink-soft">Hvor dybt skal den tænke?</p>
          </div>
          <div>
            <div className="grid grid-cols-5 gap-[12px]">
              {levels.map((level) => (
                <div key={level} className={cn("border px-[12px] py-[18px] text-center text-[30px]", level === "Medium" ? "border-slide-accent bg-slide-accent text-white" : "border-slide-rule bg-slide-surface")}>
                  {level}
                  <p className="mt-[6px] text-[22px]">{level === "Medium" ? "Start her" : level === "Extra High" ? "xhigh" : "\u00a0"}</p>
                </div>
              ))}
            </div>
            <div className="mt-[18px] flex items-center gap-[20px] text-[26px] font-medium text-slide-accent">
              <span>Lavere forbrug</span>
              <span aria-hidden="true" className="h-[3px] min-w-[40px] flex-1 bg-slide-accent" />
              <span>Mere tænketid · flere tokens · højere forbrug →</span>
            </div>
          </div>
        </div>
        <p className="border-l-[4px] border-slide-accent pl-[24px] text-[27px] leading-[1.35] text-slide-ink-soft">
          <strong className="font-medium text-slide-ink">Vælg model efter opgaven. Start med Medium.</strong> Skru op ved svær fejlfinding eller dyre fejl.
        </p>
      </div>
    </SlideFrame>
  );
}

function TokenEconomicsSlide({ page }: { page: number }) {
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
      lead="Godkend planen, før den rører noget. Hold opgaven lille: lange forløb kan samle irrelevant kontekst og gøre fejl dyrere at rette."
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
/* 11 og 19: Briefen før hver øvelse                                  */
/* ------------------------------------------------------------------ */

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

function ExerciseBriefSlide({ page, brief }: { page: number; brief: ExerciseBrief }) {
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


/* ------------------------------------------------------------------ */
/* 12 og 20: Øvelserne                                                */
/* ------------------------------------------------------------------ */

function ExerciseSlide({
  page,
  kicker,
  title,
  lead,
  minutes,
}: {
  page: number;
  kicker: string;
  title: string;
  lead: string;
  minutes: number;
}) {
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
            <p className="slide-kicker text-slide-accent-soft">{kicker}</p>
          </Reveal>
          <Reveal delay={0.18} y={40}>
            <h2 className="slide-title-lg mt-[30px]">
              {title}
              <BlinkUnderscore />
            </h2>
          </Reveal>
          <Reveal delay={0.45}>
            <p className="slide-subtitle mt-[40px] max-w-[1000px] text-slide-bg/80">{lead}</p>
          </Reveal>

        </div>
        <Reveal delay={0.6}>
          <div className="border-l border-slide-bg/20 pl-[46px]">
            <p className="slide-kicker text-slide-pink">Til rådighed</p>
            <WorkshopCountdown minutes={minutes} />
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
/* 14: Fælles opsamling                                               */
/* ------------------------------------------------------------------ */

const debriefQuestions: Array<[string, string, string]> = [
  ["01", "Hvad prøvede I?", "Hvad bad I Claude om at undersøge eller ændre?"],
  ["02", "Hvad tjekkede I?", "Hvad så I i resultatet, filerne eller diffet bagefter?"],
  ["03", "Hvad lærte I?", "Hvad overraskede jer — godt eller mindre godt?"],
  ["04", "Hvad prøver I igen?", "Hvilken opgave vil I tage fat på inden fredag?"],
];

function DebriefSlide({ page }: { page: number }) {
  return (
    <SlideFrame
      kicker="Fælles opsamling"
      title="Hvad fandt I?"
      lead="Et par grupper viser, hvad de byggede, og hvad de lærte."
      page={page}
    >
      <div className="debrief-reflection grid h-full min-h-0 grid-cols-2 grid-rows-2 gap-[18px] overflow-hidden">
        {debriefQuestions.map(([number, heading, body], index) => (
          <Reveal key={number} delay={0.08 + index * 0.1} className="min-h-0">
            <article className="flex h-full min-h-0 items-start gap-[26px] border border-slide-rule bg-slide-surface p-[30px]">
              <span className="slide-caption shrink-0 font-mono text-slide-accent">{number}</span>
              <div>
                <h3 className="slide-body-lg font-display font-bold uppercase leading-none">{heading}</h3>
                <p className="slide-body mt-[18px] text-slide-ink-soft">{body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 15: Hooks                                                         */
/* ------------------------------------------------------------------ */

function RecipeCheckSlide({ page }: { page: number }) {
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

/* ------------------------------------------------------------------ */
/* 16: Isbjerget                                                      */
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
            Prøv det igen inden næste fredag
            <BlinkUnderscore />
          </h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="slide-subtitle mt-[36px] max-w-[1050px] text-slide-bg/80">
            Ikke et projekt. Bare én opgave, du plejer at lave i hånden.
          </p>
        </Reveal>
        <p className="slide-body mt-[56px] font-mono text-slide-bg/70">Tak for i dag</p>
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
    title: "Claude i praksis",
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
    id: "udbytte",
    title: "Noget, I kan bygge videre på",
    render: (page) => <OutcomesSlide page={page} />,
  },
  {
    id: "to-udfald",
    title: "Svaret bliver i vinduet. Filen bliver i mappen",
    render: (page) => <TwoOutcomesSlide page={page} />,
  },
  {
    id: "tre-vaerktoejer",
    title: "Chat svarer. Cowork arbejder. Code bygger",
    render: (page) => <ThreeToolsSlide page={page} />,
  },
  {
    id: "mappen",
    title: "Mappen er Claudes verden",
    render: (page) => <FolderSlide page={page} />,
  },
  {
    id: "vaerktoej",
    title: "Hvornår bruger du hvad",
    render: (page) => <ToolChoiceSlide page={page} />,
  },
  {
    id: "trifecta",
    title: "Tre ting, der ikke må mødes",
    render: (page) => <TrifectaSlide page={page} />,
  },
  {
    id: "opgave-chat",
    title: "Øvelse 1 · Få jord under neglene",
    render: (page) => <ExerciseBriefSlide page={page} brief={chatBrief} />,
  },
  {
    id: "oevelse-chat",
    title: "Øvelse 1 · Chat og Projects",
    render: (page) => (
      <ExerciseSlide
        page={page}
        kicker="Øvelse 1 · Chat og Projects"
        title="Prøv det i Chat"
        lead="Vi går rundt. Sig til, når noget ikke opfører sig, som I forventede."
        minutes={scheduleById["exercise-chat"].duration}
      />
    ),
  },
  {
    id: "tilladelser",
    title: "Hvor meget må Claude gøre selv",
    render: (page) => <PermissionModesSlide page={page} />,
  },
  {
    id: "plan-mode",
    title: "Plan først. Godkend bagefter",
    render: (page) => <PlanSlide page={page} />,
  },
  {
    id: "model-effort",
    title: "Vælg model og tænketid",
    render: (page) => <ModelEffortSlide page={page} />,
  },
  {
    id: "token-economics",
    title: "Små opgaver. Mindre spild",
    render: (page) => <TokenEconomicsSlide page={page} />,
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
    id: "opgave-code",
    title: "Øvelse 2 · Byg noget, I kan gentage",
    render: (page) => <ExerciseBriefSlide page={page} brief={codeBrief} />,
  },
  {
    id: "oevelse-code",
    title: "Øvelse 2 · Claude Code",
    render: (page) => (
      <ExerciseSlide
        page={page}
        kicker="Øvelse 2 · Claude Code"
        title="Byg det i Code"
        lead="Hold pause, når I har brug for det. Har I noget at vise, er der tid til det."
        minutes={scheduleById["exercise-code"].duration}
      />
    ),
  },
  {
    id: "opsamling",
    title: "Hvad fandt I?",
    render: (page) => <DebriefSlide page={page} />,
  },
  {
    id: "skills",
    title: "Skriv opskriften én gang",
    render: (page) => <SkillSlide page={page} />,
  },
  {
    id: "opskrift-og-kontrol",
    title: "Hooks tjekker. Hver gang.",
    render: (page) => <RecipeCheckSlide page={page} />,
  },
  {
    id: "isbjerg",
    title: "Prototype vs. drift",
    render: (page) => <IcebergSlide page={page} />,
  },
  {
    id: "afslutning",
    title: "Prøv det igen inden næste fredag",
    render: (page) => <ClosingSlide page={page} />,
  },
];

