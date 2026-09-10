import type { ReactNode } from "react";
import { scheduleById } from "../schedule";
import { ChatVersusCodeSlide } from "./slides/ChatVersusCodeSlide";
import { ContextWindowSlide } from "./slides/ContextWindowSlide";
import { ClosingSlide } from "./slides/ClosingSlide";
import { DebriefSlide } from "./slides/DebriefSlide";
import {
  ChatExerciseBriefSlide,
  CodeExerciseBriefSlide,
} from "./slides/ExerciseBriefSlide";
import { ExerciseTimerSlide } from "./slides/ExerciseTimerSlide";
import { FirstPromptSlide } from "./slides/FirstPromptSlide";
import { FolderScopeSlide } from "./slides/FolderScopeSlide";
import { HooksSlide } from "./slides/HooksSlide";
import { HostsSlide } from "./slides/HostsSlide";
import { LeverageSlide } from "./slides/LeverageSlide";
import { ModelEffortSlide } from "./slides/ModelEffortSlide";
import { OutcomesSlide } from "./slides/OutcomesSlide";
import { PermissionModesSlide } from "./slides/PermissionModesSlide";
import { PlanModeSlide } from "./slides/PlanModeSlide";
import { ProgramSlide } from "./slides/ProgramSlide";
import { PrototypeToProductionSlide } from "./slides/PrototypeToProductionSlide";
import { SecurityTrifectaSlide } from "./slides/SecurityTrifectaSlide";
import { SkillsSlide } from "./slides/SkillsSlide";
import { TitleSlide } from "./slides/TitleSlide";
import { TokenEconomicsSlide } from "./slides/TokenEconomicsSlide";
import { ToolChoiceSlide } from "./slides/ToolChoiceSlide";
import { ToolLevelsSlide } from "./slides/ToolLevelsSlide";

export type Slide = {
  id: string;
  title: string;
  /** The deck owns slide order, so each slide is told its own page number. */
  render: (page: number) => ReactNode;
};

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
    render: (page) => <ChatVersusCodeSlide page={page} />,
  },
  {
    id: "tre-vaerktoejer",
    title: "Chat svarer. Cowork arbejder. Code bygger",
    render: (page) => <ToolLevelsSlide page={page} />,
  },
  {
    id: "mappen",
    title: "Mappen er Claudes verden",
    render: (page) => <FolderScopeSlide page={page} />,
  },
  {
    id: "context-window",
    title: "Hver besked og læst fil fylder",
    render: (page) => <ContextWindowSlide page={page} />,
  },
  {
    id: "vaerktoej",
    title: "Hvornår bruger du hvad",
    render: (page) => <ToolChoiceSlide page={page} />,
  },
  {
    id: "trifecta",
    title: "Tre ting, der ikke må mødes",
    render: (page) => <SecurityTrifectaSlide page={page} />,
  },
  {
    id: "opgave-chat",
    title: "Øvelse 1 · Få jord under neglene",
    render: (page) => <ChatExerciseBriefSlide page={page} />,
  },
  {
    id: "oevelse-chat",
    title: "Øvelse 1 · Chat og Projects",
    render: (page) => (
      <ExerciseTimerSlide
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
    render: (page) => <PlanModeSlide page={page} />,
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
    render: (page) => <FirstPromptSlide page={page} />,
  },
  {
    id: "opgave-code",
    title: "Øvelse 2 · Byg noget, I kan gentage",
    render: (page) => <CodeExerciseBriefSlide page={page} />,
  },
  {
    id: "oevelse-code",
    title: "Øvelse 2 · Claude Code",
    render: (page) => (
      <ExerciseTimerSlide
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
    render: (page) => <SkillsSlide page={page} />,
  },
  {
    id: "opskrift-og-kontrol",
    title: "Hooks tjekker. Hver gang.",
    render: (page) => <HooksSlide page={page} />,
  },
  {
    id: "isbjerg",
    title: "Prototype vs. drift",
    render: (page) => <PrototypeToProductionSlide page={page} />,
  },
  {
    id: "afslutning",
    title: "Prøv det igen inden næste fredag",
    render: (page) => <ClosingSlide page={page} />,
  },
];
