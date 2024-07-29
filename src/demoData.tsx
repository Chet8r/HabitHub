// demoData.ts

import { habitHubConstants, StatusLevel } from "./components/Habits/Constants";

export const getDateDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const userData: any = {
  userId: 123,
  firstname: "John",
  hideSensitive: false,
  habits: [
    {
      id: 0,
      habitName: "Demo Habit",
      status: StatusLevel.Failing,
      score: 0,
      updateDate: getDateDaysAgo(0), // Today
      sensitive: false,
      updateEntryDur: { name: habitHubConstants.CUSTOM, value: 0 },
    },
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
      habitName: "Sleep 11pm",
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

export const friends = [
  {
    id: 1,
    name: "Alice",
    lastActive: "2 hr",
    scoreUp: 5,
    scoreDown: 3,
  },
  {
    id: 2,
    name: "Bob",
    lastActive: "13 hr",
    scoreUp: 2,
    scoreDown: 6,
  },
  {
    id: 3,
    name: "Charlie",
    lastActive: "5 hr",
    scoreUp: 4,
    scoreDown: 1,
  },
];
