import type { ReactNode } from "react";
import { motion } from "motion/react";
import { SlideFrame, useSlideMotion } from "../SlideLayout";
import { inViewSoft, Reveal } from "../SlideMotion";
import { cn } from "../../utils";

export function FolderScopeSlide({ page }: { page: number }) {
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

function FolderScopeVisual() {
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
