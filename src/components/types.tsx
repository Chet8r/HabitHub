// types.ts

export enum DurationType {
  Daily = 0,
  Weekly = 1,
  Monthly = 2,
}

export interface Habit {
  id: number;
  habitName: string;
  status: string;
  score: number;
  updateDate: string;
  sensitive: boolean;
  updateEntryDur: DurationType;
}

export interface HabitLog {
  id: number;
  name: string;
}

export interface HabitLog {
  id: number;
  name: string;
}

export interface User {
  userId: number;
  firstname: string;
  habits: Habit[];
  habitLog: HabitLog[];
  hideSensitive: boolean;
}
// types.ts
