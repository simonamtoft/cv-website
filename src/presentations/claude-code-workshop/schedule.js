export const WORKSHOP_START_MINUTES = 13 * 60;

export const workshopSchedule = [
  {
    id: "introduction",
    duration: 30,
    heading: "Kort om at arbejde med Claude",
    note: "Chat, Cowork og Code — og hvornår de passer.",
  },
  {
    id: "workshop",
    duration: 110,
    heading: "Workshop",
    note: "I bygger. Vi går rundt og hjælper undervejs.",
  },
  {
    id: "closing",
    duration: 40,
    heading: "Refleksion, deling, skills og næste skridt",
    note: "Tal sammen to og to — og lad et par grupper dele, hvad de byggede og lærte.",
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
