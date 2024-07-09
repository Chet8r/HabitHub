// demoData.ts

import { User } from "./components/Shared/types";
import { habitHubConstants } from "./components/Habits/Constants";

export const getDateDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

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
      updateDate: getDateDaysAgo(0), // Today
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.DAILY, value: 1 },
    },
    {
      id: 2,
      habitName: "Read a book",
      status: "Momentum",
      score: 2,
      updateDate: getDateDaysAgo(1), // Yesterday
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.DAILY, value: 1 },
    },
    {
      id: 3,
      habitName: "Meditate",
      status: "Struggle",
      score: 0,
      updateDate: getDateDaysAgo(14), // Two weeks ago
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.WEEKLY, value: 7 },
    },
    {
      id: 4,
      habitName: "Drink Water",
      status: "Habit",
      score: 5,
      updateDate: getDateDaysAgo(30), // A month ago
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.DAILY, value: 1 },
    },
    {
      id: 5,
      habitName: "Sleep Early",
      status: "Momentum",
      score: 3,
      updateDate: getDateDaysAgo(0), // Today
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.DAILY, value: 1 },
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
