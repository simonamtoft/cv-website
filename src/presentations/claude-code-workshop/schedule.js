export const WORKSHOP_START_MINUTES = 13 * 60;

/**
 * The live session runs 13:00–15:00; the closing hour after it is part of the
 * same agenda, so the program slide shows the whole afternoon.
 */
export const workshopSchedule = [
  {
    id: "introduction",
    duration: 30,
    heading: "Introduktion til Claude",
    note: "Chat, Cowork og Code — og hvornår de passer.",
  },
  {
    id: "exercise-chat",
    kind: "exercise",
    duration: 25,
    heading: "Øvelse: Chat og Projects",
    note: "Kom i gang — vi går rundt og hjælper undervejs.",
  },
  {
    id: "claude-code",
    duration: 25,
    heading: "Claude Code i dybden",
    note: "Tilladelser, plan mode, model og tænketid.",
  },
  {
    id: "exercise-code",
    kind: "exercise",
    duration: 40,
    heading: "Øvelse: Claude Code",
    note: "I bygger videre — nu i en mappe.",
  },
  {
    id: "closing",
    duration: 60,
    heading: "Afslutning",
    note: "Skills, drift og næste skridt.",
  },
];

export const scheduledItems = workshopSchedule.reduce((items, item) => {
  const start = items.at(-1)?.end ?? WORKSHOP_START_MINUTES;
  items.push({ ...item, start, end: start + item.duration });
  return items;
}, []);

export const scheduleById = Object.fromEntries(
  scheduledItems.map((item) => [item.id, item]),
);

export const formatTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
