// demoData.ts

import { User } from "./components/Shared/types";
import { habitHubConstants, StatusLevel } from "./components/Habits/Constants";

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
      habitName: "Workout",
      status: StatusLevel.Consistency,
      score: 4,
      updateDate: getDateDaysAgo(0), // Today
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.DAILY, value: 1 },
    },
    {
      id: 2,
      habitName: "Meditate",
      status: StatusLevel.Failing,
      score: 0,
      updateDate: getDateDaysAgo(14), // Two weeks ago
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.WEEKLY, value: 7 },
    },
    {
      id: 3,
      habitName: "Sleep 11am",
      status: StatusLevel.Progress,
      score: 2,
      updateDate: getDateDaysAgo(1), // Yesterday
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.DAILY, value: 1 },
    },
    {
      id: 4,
      habitName: "Shorts Scrolling",
      status: StatusLevel.Failing,
      score: 3,
      updateDate: getDateDaysAgo(0), // Today
      sensitive: true,
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
