import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "../utils";
import { useSlideMotion } from "./SlideLayout";

/** Entrance animations fire when the element scrolls into view. */
export const inView = { once: false, amount: 0.35 } as const;
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
/* Count-up number                                                     */
/* ------------------------------------------------------------------ */

export function CountUp({
  to,
  suffix = "",
  duration = 1.2,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const animate = useSlideMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, inViewSoft);
  const [value, setValue] = useState(animate ? 0 : to);

  useEffect(() => {
    if (!animate) return;
    if (!visible) {
      setValue(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, visible, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Folder scope: the same prepared folder, then the scope contrast    */
/* ------------------------------------------------------------------ */

const taskFiles = ["q3.xlsx", "noter.md", "skabelon.xlsx"];
const driveFiles = ["løn.xlsx", "kontrakter/", "bestyrelse/", "kundedata/", "arkiv-2019/"];

function FileChip({
  name,
  muted = false,
  surface = "cream",
}: {
  name: string;
  muted?: boolean;
  surface?: "white" | "cream";
}) {
  return (
    <span
      className={cn(
        "slide-caption rounded-[12px] border px-[22px] py-[11px] font-mono",
        surface === "white" ? "bg-slide-surface" : "bg-slide-bg",
        muted ? "border-slide-ink/10 text-slide-ink-soft/55" : "border-slide-rule text-slide-ink",
      )}
    >
      {name}
    </span>
  );
}

const pillOnEdge = { translate: "0 -50%" };

/** Folder panel with the pill tab straddling its top edge, as in the source deck. */
function FolderPanel({
  label,
  children,
  surface = "white",
  compact = false,
}: {
  label: string;
  children: ReactNode;
  /** The panel needs to contrast with whatever it sits on. */
  surface?: "white" | "cream";
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[20px]",
        surface === "white" ? "bg-slide-surface" : "bg-slide-bg",
        compact ? "px-[26px] pt-[48px] pb-[30px]" : "px-[40px] pt-[54px] pb-[40px]",
      )}
    >
      <span
        // Tailwind's translate utilities rely on @property-registered custom
        // properties, which browsers ignore inside this deck's shadow root.
        style={pillOnEdge}
        className={cn(
          "slide-caption absolute top-0 left-[36px] rounded-full bg-slide-ink font-mono font-medium text-slide-bg",
          compact ? "px-[26px] py-[12px]" : "px-[34px] py-[14px]",
        )}
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

function ScopeMark({ kind }: { kind: "check" | "cross" }) {
  const color = kind === "check" ? "var(--slide-good)" : "var(--slide-warn)";
  return (
    <svg viewBox="0 0 48 48" className="h-[62px] w-[62px] shrink-0" aria-hidden>
      <path
        d={kind === "check" ? "M6 24 L19 38 L42 8" : "M9 9 L39 39 M39 9 L9 39"}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PreparedFolder({
  compact = false,
  surface = "white",
}: {
  compact?: boolean;
  surface?: "white" | "cream";
}) {
  return (
    <FolderPanel label="kvartal-q3/" compact={compact} surface={surface}>
      <div className={cn("flex gap-[12px]", compact ? "flex-col items-start" : "flex-wrap gap-[16px]")}>
        {taskFiles.map((file) => (
          <FileChip key={file} name={file} surface={surface === "white" ? "cream" : "white"} />
        ))}
      </div>
      {!compact && (
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
      )}
    </FolderPanel>
  );
}

export function FolderScopeVisual({ stage }: { stage: "prepared" | "comparison" }) {
  if (stage === "comparison") {
    return (
      <div className="folder-scope-visual flex h-full min-h-0 flex-col justify-center" data-folder-scope="comparison">
        <div className="grid min-h-0 grid-cols-2 items-stretch gap-[36px]">
          <Reveal delay={0.1} className="flex">
            <section className="flex w-full flex-col rounded-[20px] bg-slide-surface px-[40px] pt-[44px] pb-[46px]">
              <div className="mb-[80px] flex min-h-[158px] items-start gap-[26px]">
                <ScopeMark kind="check" />
                <div>
                  <h3 className="slide-subtitle">En mappe til én opgave</h3>
                  <p className="slide-body mt-[14px] text-slide-ink-soft">
                    Læg kun det materiale ind, opgaven kræver. Så ved I selv, hvad der er i spil.
                  </p>
                </div>
              </div>
              <PreparedFolder compact surface="cream" />
              <p className="slide-caption mt-[24px] text-slide-good">Kun det, opgaven har brug for</p>
            </section>
          </Reveal>

          <Reveal delay={0.35} className="flex">
            <section className="flex w-full flex-col rounded-[20px] bg-slide-surface px-[40px] pt-[44px] pb-[46px]">
              <div className="mb-[80px] flex min-h-[158px] items-start gap-[26px]">
                <ScopeMark kind="cross" />
                <div>
                  <h3 className="slide-subtitle">Hele computeren eller et delt drev</h3>
                  <p className="slide-body mt-[14px] text-slide-ink-soft">
                    Det gør langt mere materiale tilgængeligt, end opgaven behøver.
                  </p>
                </div>
              </div>
              <div className="relative rounded-[20px] border-2 border-dashed border-slide-warn/50 bg-slide-bg/50 px-[26px] pt-[48px] pb-[30px]">
                <span
                  style={pillOnEdge}
                  className="slide-caption absolute top-0 left-[36px] rounded-full bg-slide-warn px-[26px] py-[12px] font-mono text-slide-bg"
                >
                  S:/fælles-drev/
                </span>
                <div className="flex flex-wrap gap-[12px]">
                  {taskFiles.map((file) => (
                    <FileChip key={file} name={file} surface="white" />
                  ))}
                  {driveFiles.map((file) => (
                    <FileChip key={file} name={file} surface="white" muted />
                  ))}
                </div>
              </div>
              <p className="slide-caption mt-[24px] text-slide-warn">… og meget mere, I ikke har brug for</p>
            </section>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="folder-scope-visual flex h-full min-h-0 flex-col justify-center" data-folder-scope="prepared">
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
      <p className="slide-body mt-[52px] border-l-[7px] border-slide-good pl-[22px] text-slide-ink-soft">
        Startmappen er et bevidst udgangspunkt — ikke en garanti for teknisk afgrænsning i alle opsætninger.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Annotated prompt: teaches the four pieces of a useful first prompt */
/* ------------------------------------------------------------------ */

const promptAnnotations = [
  { id: "01", label: "Kilde", note: "Hvilke filer må den bruge?", delay: 0.3 },
  { id: "02", label: "Resultat", note: "Hvad skal den lave?", delay: 0.55 },
  { id: "03", label: "Modtager", note: "Hvem skal kunne bruge det?", delay: 0.8 },
  { id: "04", label: "Kontrol", note: "Hvad skal den holde sig til?", delay: 1.05 },
] as const;

export function AnnotatedPrompt() {
  const animate = useSlideMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const annotationRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [connectors, setConnectors] = useState<Array<{ startX: number; startY: number; endX: number; endY: number }>>([]);
  const phraseClass = "border-b-[5px] border-slide-yellow bg-slide-yellow/35 px-[5px] text-slide-ink";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const updateConnectors = () => {
      const bounds = container.getBoundingClientRect();
      const next = phraseRefs.current.map((phrase, index) => {
        const annotation = annotationRefs.current[index];
        if (!phrase || !annotation) return null;
        const phraseLines = phrase.getClientRects();
        const phraseBounds = phraseLines[phraseLines.length - 1];
        const annotationBounds = annotation.getBoundingClientRect();
        if (!phraseBounds) return null;
        const scaleX = container.clientWidth / bounds.width;
        const scaleY = container.clientHeight / bounds.height;
        return {
          startX: (phraseBounds.right - bounds.left + 10) * scaleX,
          startY: (phraseBounds.top - bounds.top + phraseBounds.height / 2) * scaleY,
          endX: (annotationBounds.left - bounds.left + 54) * scaleX,
          endY: (annotationBounds.top - bounds.top + annotationBounds.height / 2) * scaleY,
        };
      }).filter((connector): connector is { startX: number; startY: number; endX: number; endY: number } => connector !== null);
      setConnectors(next);
    };

    updateConnectors();
    const observer = new ResizeObserver(updateConnectors);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="annotated-prompt relative h-full overflow-hidden border border-slide-ink bg-slide-surface px-[64px] py-[30px]">
      <div className="flex items-center justify-between border-b border-slide-rule pb-[16px]">
        <p className="slide-caption font-mono uppercase tracking-[0.16em] text-slide-ink-soft">
          Prompt til Claude Code
        </p>
        <p className="slide-caption font-mono text-slide-accent">01 · skriv opgaven tydeligt</p>
      </div>

      <div className="grid grid-cols-[1fr_430px] gap-[66px] pt-[26px]">
        <div className="relative z-10 pt-[8px]">
          <motion.p
            className="slide-body font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Kig i <span ref={(element) => { phraseRefs.current[0] = element; }} className={phraseClass}>mappen kvartalsrapporter <sup className="text-slide-accent">01</sup></span>.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Lav <span ref={(element) => { phraseRefs.current[1] = element; }} className={phraseClass}>én samlet oversigt over nøgletallene for hvert selskab <sup className="text-slide-accent">02</sup></span>.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 0.9, 0.24, 1] }}
          >
            Den skal kunne sendes videre til <span ref={(element) => { phraseRefs.current[2] = element; }} className={phraseClass}>en kollega <sup className="text-slide-accent">03</sup></span>, så hold den på én side.
          </motion.p>
          <motion.p
            className="slide-body mt-[13px] font-mono leading-[1.4] text-slide-ink"
            initial={animate ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inViewSoft}
            transition={{ duration: 0.5, delay: 0.75, ease: [0.22, 0.9, 0.24, 1] }}
          >
            <span ref={(element) => { phraseRefs.current[3] = element; }} className={phraseClass}>Brug kun filerne i mappen, og skriv til sidst, hvad du er i tvivl om <sup className="text-slide-accent">04</sup></span>.
          </motion.p>
        </div>

        <div className="relative z-10 flex flex-col gap-[16px]">
          {promptAnnotations.map(({ id, label, note, delay }, index) => (
            <motion.div
              key={id}
              ref={(element) => { annotationRefs.current[index] = element; }}
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

      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        {connectors.map(({ startX, startY, endX, endY }, index) => (
          <motion.path
            key={index}
            d={`M ${startX} ${startY} C ${startX + 70} ${startY}, ${endX - 70} ${endY}, ${endX} ${endY}`}
            fill="none"
            stroke="var(--slide-accent)"
            strokeWidth="2"
            strokeDasharray="7 8"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{ duration: 0.45, delay: 0.35 + index * 0.25 }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Terminal: typed prompt                                             */
/* ------------------------------------------------------------------ */

export function TypedTerminal({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const animate = useSlideMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, inViewSoft);
  const full = lines.join("\n");
  const [count, setCount] = useState(animate ? 0 : full.length);

  useEffect(() => {
    if (!animate) return;
    if (!visible) {
      setCount(0);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const total = 2600;
    const tick = (now: number) => {
      const t = Math.min((now - start) / total, 1);
      setCount(Math.round(full.length * t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, visible, full.length]);

  return (
    <div ref={ref} className={cn("flex h-full flex-col bg-slide-navy p-[46px]", className)}>
      <div className="flex items-center gap-[14px]">
        <span className="size-[14px] bg-slide-accent" />
        <span className="size-[14px] bg-slide-yellow" />
        <span className="size-[14px] bg-slide-sage" />
        <p className="slide-chrome ml-[14px] font-mono text-slide-bg/60">
          claude · plan mode
        </p>
      </div>
      <p className="slide-body mt-[30px] font-mono whitespace-pre-wrap text-slide-bg">
        <span className="text-slide-accent-soft">&gt; </span>
        {full.slice(0, count)}
        <motion.span
          className="ml-[2px] inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-slide-yellow"
          animate={animate ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </p>
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
              10%
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
              90%
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
/* AmbientField: levende baggrund til de mørke statement-slides       */
/* ------------------------------------------------------------------ */

export function AmbientField({
  tone = "accent",
}: {
  tone?: "accent" | "pink" | "green";
}) {
  const animate = useSlideMotion();
  const stroke =
    tone === "pink"
      ? "var(--slide-pink)"
      : tone === "green"
        ? "var(--slide-green)"
        : "var(--slide-accent-soft)";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* fint gitter */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.16]" aria-hidden>
        <defs>
          <pattern id={`grid-${tone}`} width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M80 0H0V80" fill="none" stroke={stroke} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${tone})`} />
      </svg>

      {/* langsomt vandrende lysfelt */}
      <motion.div
        className="absolute -inset-y-1/2 w-[46%] blur-[90px]"
        style={{
          background: `radial-gradient(closest-side, ${stroke}, transparent)`,
          opacity: 0.22,
        }}
        initial={animate ? { x: "-20%" } : false}
        animate={animate ? { x: ["-20%", "130%"] } : {}}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      {/* løbende scan-linje */}
      <motion.div
        className="absolute inset-x-0 h-px"
        style={{ background: stroke, opacity: 0.35 }}
        initial={animate ? { top: "8%" } : false}
        animate={animate ? { top: ["8%", "92%", "8%"] } : {}}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HandToBuilt: fra manuelt arbejde til noget, der kan vises           */
/* ------------------------------------------------------------------ */

export function HandToBuilt() {
  const animate = useSlideMotion();
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <div className="flex items-start gap-[46px]">
      {/* manuelt: løse ark */}
      <div className="flex flex-col">
      <div className="relative h-[220px] w-[260px]">
        {[0, 1, 2].map((i) => (

          <motion.div
            key={i}
            className="absolute h-[190px] w-[150px] border border-slide-bg/25 bg-slide-bg/[0.06]"
            style={{ left: i * 34, top: i * 12 }}
            initial={animate ? { opacity: 0, rotate: 0 } : false}
            whileInView={{ opacity: 1, rotate: -8 + i * 7 }}
            viewport={inViewSoft}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
          >
            <div className="flex h-full flex-col justify-center gap-[9px] px-[16px]">
              {rows.map((r) => (
                <div
                  key={r}
                  className="h-px bg-slide-bg/30"
                  style={{ width: `${60 + ((r * 37) % 40)}%` }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
        <p className="slide-caption mt-[18px] font-mono whitespace-nowrap text-slide-bg/60">
          i hånden, hver gang
        </p>
      </div>

      {/* pil */}
      <div className="relative mt-[110px] w-[130px]">

        <motion.div
          className="h-[2px] origin-left bg-slide-accent-soft"
          initial={animate ? { scaleX: 0 } : false}
          whileInView={{ scaleX: 1 }}
          viewport={inViewSoft}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        <motion.div
          className="absolute -top-[5px] right-0 h-[12px] w-[12px] rotate-45 border-t-2 border-r-2 border-slide-accent-soft"
          initial={animate ? { opacity: 0 } : false}
          whileInView={{ opacity: 1 }}
          viewport={inViewSoft}
          transition={{ delay: 1.05, duration: 0.3 }}
        />
      </div>

      {/* bygget: lille værktøj */}
      <div className="flex flex-col">
      <motion.div
        className="w-[330px] border border-slide-pink/70 bg-slide-bg/[0.07]"
        initial={animate ? { opacity: 0, y: 30 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inViewSoft}
        transition={{ delay: 1.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-[8px] border-b border-slide-bg/20 px-[18px] py-[12px]">
          {["var(--slide-pink)", "var(--slide-yellow)", "var(--slide-green)"].map((c) => (
            <span key={c} className="h-[9px] w-[9px] rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex flex-col gap-[14px] p-[24px]">
          {[0.9, 0.62, 0.38].map((f, i) => (
            <div key={f} className="flex items-center gap-[14px]">
              <span className="slide-caption w-[54px] font-mono text-slide-bg/55">
                0{i + 1}
              </span>
              <div className="h-[12px] flex-1 bg-slide-bg/12">
                <motion.div
                  className="h-full"
                  style={{ background: i === 0 ? "var(--slide-green)" : "var(--slide-pink)" }}
                  initial={animate ? { width: 0 } : false}
                  whileInView={{ width: `${f * 100}%` }}
                  viewport={inViewSoft}
                  transition={{ delay: 1.35 + i * 0.14, duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
        <p className="slide-caption mt-[18px] font-mono whitespace-nowrap text-slide-bg/60">
          bygget i dag, brugbart på mandag
        </p>
      </div>
    </div>

  );
}

/* ------------------------------------------------------------------ */
/* TimerRing: nedtælling til demoen                                    */
/* ------------------------------------------------------------------ */

export function TimerRing({ minutes = 75 }: { minutes?: number }) {
  const animate = useSlideMotion();
  const r = 150;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[360px] w-[360px]">
      <svg viewBox="0 0 360 360" className="h-full w-full -rotate-90">
        <circle cx="180" cy="180" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-slide-bg/15" />
        <motion.circle
          cx="180"
          cy="180"
          r={r}
          fill="none"
          stroke="var(--slide-pink)"
          strokeWidth="10"
          strokeDasharray={c}
          initial={animate ? { strokeDashoffset: c } : false}
          whileInView={{ strokeDashoffset: c * 0.12 }}
          viewport={inViewSoft}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="slide-title-lg font-display leading-none text-slide-bg">
          <CountUp to={minutes} duration={1.6} />
        </span>
        <span className="slide-caption mt-[12px] font-mono uppercase tracking-[0.2em] text-slide-bg/65">
          minutter
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WeekStrip: én ting i næste uge                                      */
/* ------------------------------------------------------------------ */

export function WeekStrip() {
  const animate = useSlideMotion();
  const days = ["man", "tir", "ons", "tor", "fre"];
  return (
    <div className="flex items-end gap-[18px]">
      {days.map((d, i) => (
        <motion.div
          key={d}
          className={cn(
            "flex h-[130px] w-[130px] flex-col justify-between p-[18px]",
            i === 0 ? "bg-slide-pink" : "border border-slide-bg/25",
          )}
          initial={animate ? { opacity: 0, y: 24 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inViewSoft}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
        >
          <span
            className={cn(
              "slide-caption font-mono uppercase tracking-[0.2em]",
              i === 0 ? "text-slide-ink" : "text-slide-bg/55",
            )}
          >
            {d}
          </span>
          {i === 0 && (
            <span className="slide-body font-display font-bold uppercase leading-tight text-slide-ink">
              én ting
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AskAgainLoop: chatsvaret, der forsvinder hver gang                 */
/* ------------------------------------------------------------------ */

function useLoopTick(active: boolean, period: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!active) {
      setTick(0);
      return;
    }
    const id = setInterval(() => setTick((t) => t + 1), period);
    return () => clearInterval(id);
  }, [active, period]);
  return tick;
}

export function AskAgainLoop() {
  const animate = useSlideMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, inViewSoft);
  const tick = useLoopTick(animate && visible, 2600);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 flex-col gap-[12px]">
      <span className="slide-caption font-mono uppercase tracking-[0.2em] text-slide-ink-soft">
        Spørg igen
      </span>
      <div className="relative min-h-[150px] flex-1 overflow-hidden border border-slide-rule">
        <motion.div
          key={tick}
          className="absolute inset-0 flex flex-col justify-center gap-[12px] px-[26px]"
          initial={animate ? { opacity: 0, y: 12 } : false}
          animate={
            animate
              ? { opacity: [0, 1, 1, 0], y: [12, 0, 0, -12] }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 2.6, times: [0, 0.18, 0.72, 1] }}
        >
          <span className="slide-body font-mono text-slide-ink-soft">
            → samme spørgsmål
          </span>
          <span className="slide-body font-mono text-slide-ink">
            ← nyt svar nr. {tick + 1}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ReRunLoop: scriptet, der bliver liggende og kan køres igen         */
/* ------------------------------------------------------------------ */

export function ReRunLoop() {
  const animate = useSlideMotion();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, inViewSoft);
  const tick = useLoopTick(animate && visible, 1300);
  const runs = Math.min(tick, 4);

  return (
    <div ref={ref} className="flex min-h-0 flex-1 flex-col gap-[12px]">
      <span className="slide-caption font-mono uppercase tracking-[0.2em] text-slide-ink/70">
        Kør igen
      </span>
      <div className="flex min-h-[150px] flex-1 flex-col justify-center gap-[16px] border border-slide-ink/25 px-[26px]">
        <span className="slide-body font-mono text-slide-ink">
          rapport.py · kan køres igen
        </span>
        <div className="flex items-center gap-[12px]">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className="slide-body font-mono text-slide-ink"
              initial={false}
              animate={{ opacity: i < runs ? 1 : 0.18, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ✓
            </motion.span>
          ))}
          <span className="slide-body font-mono text-slide-ink/60">
            {runs} kørsler
          </span>
        </div>
      </div>
    </div>
  );
}
