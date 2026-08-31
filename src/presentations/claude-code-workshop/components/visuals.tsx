import { motion } from "motion/react";
import { type ReactNode } from "react";
import { cn } from "../utils";
import { useSlideMotion } from "./SlideLayout";

/** Entrance animations fire when the element scrolls into view. */
export const inViewSoft = { once: false, amount: 0.15 } as const;

/* ------------------------------------------------------------------ */
/* Reveal: staggered entrance                                         */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const animate = useSlideMotion();
  if (!animate) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewSoft}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.9, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Growing bar                                                         */
/* ------------------------------------------------------------------ */

export function GrowBar({
  fraction,
  delay = 0,
  className,
}: {
  fraction: number;
  delay?: number;
  className?: string;
}) {
  const animate = useSlideMotion();
  return (
    <div className="h-[14px] w-full bg-slide-rule">
      <motion.div
        className={cn("h-full bg-slide-accent", className)}
        initial={{ width: animate ? 0 : `${fraction * 100}%` }}
        whileInView={{ width: `${fraction * 100}%` }}
        viewport={inViewSoft}
        transition={{ duration: 1.1, delay, ease: [0.22, 0.9, 0.24, 1] }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Folder scope: the same prepared folder, then the scope contrast    */
/* ------------------------------------------------------------------ */

const taskFiles = ["q3-nord.xlsx", "q3-syd.xlsx", "q3-vest.xlsx"];

function FileChip({ name }: { name: string }) {
  return (
    <span className="slide-caption rounded-[12px] border border-slide-rule bg-slide-bg px-[22px] py-[11px] font-mono text-slide-ink">
      {name}
    </span>
  );
}

const pillOnEdge = { translate: "0 -50%" };

/** Folder panel with the pill tab straddling its top edge, as in the source deck. */
function FolderPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="relative rounded-[20px] bg-slide-surface px-[40px] pt-[54px] pb-[40px]">
      <span
        // Tailwind's translate utilities rely on @property-registered custom
        // properties, which browsers ignore inside this deck's shadow root.
        style={pillOnEdge}
        className="slide-caption absolute top-0 left-[36px] rounded-full bg-slide-ink px-[34px] py-[14px] font-mono font-medium text-slide-bg"
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function CapabilityRow({
  label,
  lead,
  rest,
  tone,
}: {
  label: string;
  lead: string;
  rest: string;
  tone: "edit" | "read";
}) {
  const row = tone === "edit" ? "bg-slide-sage/40" : "bg-slide-rule/70";
  const pill = tone === "edit" ? "bg-slide-good text-slide-bg" : "bg-slide-ink-soft/45 text-slide-surface";
  return (
    <div className={cn("flex items-start gap-[26px] rounded-[16px] px-[24px] py-[22px]", row)}>
      <span className={cn("slide-caption shrink-0 rounded-full px-[26px] py-[11px] font-semibold", pill)}>
        {label}
      </span>
      <p className="slide-body text-slide-ink">
        <span className="font-semibold">{lead}</span>{" "}
        <span className="text-slide-ink-soft">{rest}</span>
      </p>
    </div>
  );
}

function SentOutArrow() {
  const animate = useSlideMotion();
  return (
    <div className="flex flex-col items-center gap-[14px]">
      <p className="slide-caption italic text-slide-ink">Sendes ud</p>
      <svg viewBox="0 0 200 24" className="h-[24px] w-full" aria-hidden>
        <motion.g
          initial={animate ? { opacity: 0, x: -24 } : false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inViewSoft}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 0.9, 0.24, 1] }}
        >
          <line x1="0" y1="12" x2="182" y2="12" stroke="var(--slide-ink)" strokeWidth="2" />
          <path d="M182 4 L200 12 L182 20 Z" fill="var(--slide-ink)" />
        </motion.g>
      </svg>
      <p className="slide-caption text-center text-slide-ink-soft">når konteksten bruges</p>
    </div>
  );
}

function PreparedFolder() {
  return (
    <FolderPanel label="kvartal-q3/">
      <div className="flex flex-wrap gap-[16px]">
        {taskFiles.map((file) => (
          <FileChip key={file} name={file} />
        ))}
      </div>
      <div className="mt-[28px] flex flex-col gap-[16px]">
        <CapabilityRow
          tone="edit"
          label="Ændringer"
          lead="Claude Code arbejder i mappen."
          rest="I godkender handlinger og ekstra adgang undervejs."
        />
        <CapabilityRow
          tone="read"
          label="Læsning"
          lead="Den kan læse alle filer i mappen,"
          rest="ikke kun dem, den ændrer."
        />
      </div>
    </FolderPanel>
  );
}

export function FolderScopeVisual() {
  return (
    <div className="folder-scope-visual flex h-full min-h-0 flex-col justify-center">
      <div className="grid grid-cols-[1fr_190px_470px] items-center gap-[36px]">
        <Reveal delay={0.05}>
          <PreparedFolder />
        </Reveal>
        <Reveal delay={0.5}>
          <SentOutArrow />
        </Reveal>
        <Reveal delay={0.85}>
          <div className="rounded-[20px] border-2 border-dashed border-slide-ink/35 p-[38px]">
            <p className="slide-kicker text-slide-accent">Modelbehandling</p>
            <p className="slide-subtitle mt-[16px]">Anthropic</p>
            <p className="slide-body mt-[18px] text-slide-ink-soft">
              Firmaet bag Claude. Data behandles efter jeres aftale og opsætning.
            </p>
          </div>
        </Reveal>
      </div>
      <div className="mt-[40px] flex flex-col gap-[16px]">
        <p className="slide-body border-l-[7px] border-solid border-slide-warn pl-[22px] text-slide-ink-soft">
          Peger I den mod et fælles drev, er løn, kontrakter og kundedata også i spil.
        </p>
        <p className="slide-body border-l-[7px] border-solid border-slide-good pl-[22px] text-slide-ink-soft">
          Startmappen er et bevidst udgangspunkt — ikke en garanti for teknisk afgrænsning i alle
          opsætninger.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Skill folder: en mappe med opskrift (md) og et script                */
/* ------------------------------------------------------------------ */

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

export function SkillFolderVisual() {
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

/* ------------------------------------------------------------------ */
/* Annotated prompt: teaches the four pieces of a useful first prompt */
/* ------------------------------------------------------------------ */

const promptAnnotations = [
  { id: "01", label: "Kilde", note: "Hvad tager opgaven udgangspunkt i?", delay: 0.3 },
  { id: "02", label: "Resultat", note: "Hvad skal den lave?", delay: 0.55 },
  { id: "03", label: "Modtager", note: "Hvem skal kunne bruge det?", delay: 0.8 },
  { id: "04", label: "Levering", note: "Hvad skal den gemme, og hvor?", delay: 1.05 },
] as const;

export function AnnotatedPrompt() {
  const animate = useSlideMotion();
  const phraseClass = "border-b-[5px] border-slide-yellow bg-slide-yellow/35 px-[5px] text-slide-ink";

  return (
    <div className="annotated-prompt relative flex h-full flex-col overflow-hidden border border-slide-ink bg-slide-surface px-[64px] py-[30px]">
      <div className="border-b border-slide-rule pb-[16px]">
        <p className="slide-caption font-mono uppercase tracking-[0.16em] text-slide-ink-soft">
          Prompt til Claude Code
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_430px] gap-[66px] pt-[26px]">
        <div className="relative z-10 pt-[8px]">
          <motion.p
            className="slide-body font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Kig i <span className={phraseClass}>mappen kvartal-q3 <sup className="text-slide-accent">01</sup></span>.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Lav <span className={phraseClass}>én samlet oversigt over nøgletallene for hvert selskab <sup className="text-slide-accent">02</sup></span>.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Den skal kunne sendes videre til <span className={phraseClass}>en kollega <sup className="text-slide-accent">03</sup></span>, så hold den på én side.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 0.9, 0.24, 1] }}
          >
            <span className={phraseClass}>Skriv et script, der bygger oversigten, og gem resultatet som kvartal-oversigt.xlsx <sup className="text-slide-accent">04</sup></span>.
          </motion.p>
        </div>

        <div
          className="relative z-10 flex flex-col justify-center gap-[16px]"
          style={{ transform: "translateY(-38px)" }}
        >
          {promptAnnotations.map(({ id, label, note, delay }, index) => (
            <motion.div
              key={id}
              initial={animate ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay, ease: [0.22, 0.9, 0.24, 1] }}
            >
              <div className="flex items-start gap-[18px] border-l-[4px] border-slide-accent pl-[20px]">
                <span className="slide-body font-mono text-slide-accent">{id}</span>
                <div>
                  <p className="slide-body font-display font-bold uppercase leading-none">{label}</p>
                  <p className="slide-caption mt-[6px] text-slide-ink-soft">{note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Context funnel: many context lines converge into one plan          */
/* ------------------------------------------------------------------ */

export function ContextFunnel() {
  const animate = useSlideMotion();
  const lines = [-150, -110, -72, -36, 0, 36, 72, 110, 150];
  return (
    <div className="context-funnel relative h-full w-full overflow-hidden bg-slide-navy">
      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <motion.path
          d="M0,40 C150,40 210,180 300,196 L300,204 C210,220 150,360 0,360 Z"
          fill="var(--slide-pink)"
          opacity={0.18}
          initial={{ opacity: animate ? 0 : 0.18 }}
          whileInView={{ opacity: 0.18 }}
          viewport={inViewSoft}
          transition={{ duration: 0.8 }}
        />
        {lines.map((offset, i) => (
          <motion.path
            key={offset}
            d={`M-4,${200 + offset} C150,${200 + offset} 190,200 302,200`}
            fill="none"
            stroke="var(--slide-pink)"
            strokeWidth={offset === 0 ? 2.4 : 1.2}
            opacity={offset === 0 ? 1 : 0.55}
            initial={{ pathLength: animate ? 0 : 1, opacity: animate ? 0 : 1 }}
            whileInView={{ pathLength: 1, opacity: offset === 0 ? 1 : 0.55 }}
            viewport={inViewSoft}
            transition={{
              duration: 1.1,
              delay: 0.15 + i * 0.07,
              ease: [0.22, 0.9, 0.24, 1],
            }}
          />
        ))}
        <motion.circle
          cx="302"
          cy="200"
          r="7"
          fill="var(--slide-accent)"
          initial={{ scale: animate ? 0 : 1, opacity: animate ? 0 : 1 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={inViewSoft}
          transition={{ duration: 0.5, delay: 1.1, ease: "backOut" }}
        />
        <motion.line
          x1="302"
          y1="200"
          x2="382"
          y2="200"
          stroke="var(--slide-accent)"
          strokeWidth="2.4"
          initial={{ pathLength: animate ? 0 : 1 }}
          whileInView={{ pathLength: 1 }}
          viewport={inViewSoft}
          transition={{ duration: 0.5, delay: 1.25, ease: "easeOut" }}
        />
      </svg>

      <motion.div
        className="absolute top-1/2 right-[26px] -translate-y-1/2 border border-slide-pink/50 bg-slide-bg px-[14px] py-[10px]"
        initial={{ opacity: animate ? 0 : 1, x: animate ? 12 : 0 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inViewSoft}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <span className="slide-kicker text-slide-ink">Plan</span>
      </motion.div>

      <span className="slide-kicker absolute top-[28px] left-[32px] text-slide-bg/80">
        Mere kontekst
      </span>
      <span className="slide-kicker absolute bottom-[26px] left-[32px] text-slide-bg/45">
        Filer · mål · regler
      </span>
    </div>
  );
}

export function Iceberg({ below }: { below: Array<[string, string]> }) {
  const animate = useSlideMotion();
  const ease = [0.22, 0.9, 0.24, 1] as const;

  return (
    <div className="grid h-full grid-cols-[820px_1fr] gap-[56px]">
      <div className="relative h-full overflow-hidden border border-slide-rule bg-slide-surface">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%]"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--slide-sage) 16%, transparent), color-mix(in oklab, var(--slide-green) 34%, transparent))",
          }}
        />

        <svg viewBox="0 0 820 620" className="h-full w-full">
          <defs>
            <linearGradient id="ice-air" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--slide-bg)" />
              <stop offset="100%" stopColor="var(--slide-sage)" />
            </linearGradient>
            <linearGradient id="ice-water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--slide-sage)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--slide-green)" stopOpacity="0.34" />
            </linearGradient>
            <linearGradient id="ice-deep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--slide-green)" />
              <stop offset="100%" stopColor="var(--slide-ink)" />
            </linearGradient>
            <clipPath id="ice-below-clip">
              <rect x="0" y="236" width="820" height="384" />
            </clipPath>
            <clipPath id="ice-above-clip">
              <rect x="0" y="0" width="820" height="236" />
            </clipPath>
          </defs>

          {/* water body */}
          <rect x="0" y="236" width="820" height="384" fill="url(#ice-water)" />

          {/* bobbing iceberg */}
          <motion.g
            initial={animate ? { y: 26, opacity: 0 } : false}
            viewport={inViewSoft}
            whileInView={
              animate
                ? { y: [26, 0, -5, 0], opacity: 1 }
                : { y: 0, opacity: 1 }
            }
            transition={
              animate
                ? {
                    opacity: { duration: 0.6, ease },
                    y: {
                      duration: 7,
                      times: [0, 0.16, 0.6, 1],
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "mirror",
                    },
                  }
                : { duration: 0 }
            }

          >
            {/* submerged mass */}
            <g clipPath="url(#ice-below-clip)">
              <path
                d="M232 236 L300 214 L520 214 L590 236 L664 330 L676 430 L604 528 L470 588 L322 566 L214 486 L162 372 Z"
                fill="url(#ice-deep)"
                opacity="0.9"
              />
              <path
                d="M420 236 L470 588 L322 566 Z"
                fill="var(--slide-bg)"
                opacity="0.07"
              />
              <path
                d="M590 236 L664 330 L676 430 L560 320 Z"
                fill="var(--slide-ink)"
                opacity="0.25"
              />
            </g>

            {/* tip above water */}
            <g clipPath="url(#ice-above-clip)">
              <path
                d="M410 78 L520 214 L590 236 L232 236 L300 214 Z"
                fill="url(#ice-air)"
                stroke="var(--slide-ink)"
                strokeWidth="2"
              />
              <path
                d="M410 78 L440 236 L300 214 Z"
                fill="var(--slide-bg)"
                opacity="0.75"
              />
              <path
                d="M410 78 L520 214 L470 236 L440 236 Z"
                fill="var(--slide-ink)"
                opacity="0.1"
              />
            </g>
          </motion.g>

          {/* waterline */}
          <motion.path
            d="M0 236 C 120 226, 200 246, 320 236 S 520 226, 640 238 S 760 246, 820 236"
            fill="none"
            stroke="var(--slide-accent)"
            strokeWidth="3"
            initial={animate ? { pathLength: 0 } : false}
            whileInView={{ pathLength: 1 }}
            viewport={inViewSoft}
            transition={{ duration: 1, delay: 0.2, ease }}
          />
          <motion.path
            d="M0 250 C 140 242, 220 258, 340 250 S 540 242, 660 252 S 770 258, 820 250"
            fill="none"
            stroke="var(--slide-accent)"
            strokeWidth="1.5"
            opacity="0.35"
            initial={animate ? { pathLength: 0 } : false}
            whileInView={{ pathLength: 1 }}
            viewport={inViewSoft}
            transition={{ duration: 1.2, delay: 0.4, ease }}
          />

          {/* Labels sit left of the iceberg. */}
          <motion.g
            initial={animate ? { opacity: 0, x: -18 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            <text x="30" y="120" fill="var(--slide-accent)" fontSize="62" fontFamily="var(--font-display)">
              20%
            </text>
            <text x="30" y="148" fill="var(--slide-ink-soft)" fontSize="16" letterSpacing="3" fontFamily="var(--font-mono)">
              PROTOTYPEN
            </text>
          </motion.g>

          <motion.g
            initial={animate ? { opacity: 0, x: -18 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.6, delay: 0.85, ease }}
          >
            <text x="30" y="352" fill="var(--slide-ink)" fontSize="62" fontFamily="var(--font-display)">
              80%
            </text>
            <text x="30" y="380" fill="var(--slide-ink-soft)" fontSize="16" letterSpacing="3" fontFamily="var(--font-mono)">
              RESTEN AF
            </text>
            <text x="30" y="402" fill="var(--slide-ink-soft)" fontSize="16" letterSpacing="3" fontFamily="var(--font-mono)">
              ARBEJDET
            </text>
          </motion.g>

          <text
            x="790"
            y="226"
            fill="var(--slide-accent)"
            fontSize="16"
            letterSpacing="3"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            VANDLINJEN
          </text>

        </svg>
      </div>
      <div className="grid min-h-0 grid-rows-5 gap-[16px]">
        {below.map(([label, note], i) => (
          <Reveal key={label} delay={0.5 + i * 0.12} className="min-h-0">
            <div className="flex h-full flex-col justify-center border-l-[6px] border-slide-accent bg-slide-surface px-[30px] py-[16px]">
              <p className="slide-body font-semibold">{label}</p>
              <p className="slide-caption mt-[8px] text-slide-ink-soft">{note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}


/* ------------------------------------------------------------------ */
/* ChatVersusCode: samme opgave i to grænseflader                     */
/* ------------------------------------------------------------------ */

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

function WindowChrome({
  label,
  tone,
}: {
  label: string;
  tone: "light" | "dark";
}) {
  const dot = tone === "dark" ? "bg-slide-bg/30" : "bg-slide-ink/20";
  return (
    <div
      className={cn(
        "flex items-center gap-[10px] border-b px-[28px] py-[16px]",
        tone === "dark" ? "border-slide-bg/15" : "border-slide-rule",
      )}
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className={cn("size-[12px] rounded-full", dot)} />
      ))}
      <span
        className={cn(
          "slide-chrome ml-[12px] font-mono",
          tone === "dark" ? "text-slide-bg/60" : "text-slide-ink-soft",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function ChatVersusCode() {
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
