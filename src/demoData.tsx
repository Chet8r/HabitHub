// demoData.ts

import { User } from "./components/types";

export const userData: User = {
  userId: 123,
  firstname: "John",
  hideSensitive: false,
  habits: [
    {
      id: 1,
      habitName: "Exercise",
      status: "Habit",
      score: 4,
      updateDate: new Date().toISOString(),
      sensitive: false,
      updateEntryDur: 0,
    },
    {
      id: 2,
      habitName: "Read a book",
      status: "Momentum",
      score: 2,
      updateDate: new Date().toISOString(),
      sensitive: false,
      updateEntryDur: 0,
    },
    {
      id: 3,
      habitName: "Meditate",
      status: "Struggle",
      score: 0,
      updateDate: new Date().toISOString(),
      sensitive: false,
      updateEntryDur: 0,
    },
    {
      id: 4,
      habitName: "Drink Water",
      status: "Habit",
      score: 5,
      updateDate: new Date().toISOString(),
      sensitive: false,
      updateEntryDur: 0,
    },
    {
      id: 5,
      habitName: "Sleep Early",
      status: "Momentum",
      score: 3,
      updateDate: new Date().toISOString(),
      sensitive: false,
      updateEntryDur: 0,
    },
  ],
  habitLog: [
    {
      id: 1,
      name: "Exercise Log",
    },
    {
      id: 2,
      name: "Reading Log",
    },
  ],
};
