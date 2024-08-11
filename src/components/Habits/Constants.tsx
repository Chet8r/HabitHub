import { DurationType } from "../Shared/types";

export const habitHubConstants = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  CUSTOM: "Custom",
};

export enum StatusLevel {
  Failing = "Failing",
  Progress = "Progress",
  Consistency = "Consistency",
  Habit = "Habit",
}

export const statusLevels = ["Failing", "Progress", "Consistency", "Habit"];
export const EntryDuration: DurationType[] = [
  { name: "Daily", value: 1 },
  { name: "Weekly", value: 7 },
  { name: "Monthly", value: 30 },
  { name: "Custom", value: 0 },
];
