import { SlideFrame } from "../SlideLayout";
import { cn } from "../../utils";

export function ModelEffortSlide({ page }: { page: number }) {
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
