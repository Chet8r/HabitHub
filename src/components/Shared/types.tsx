export interface Habit {
  id: number;
  habitName: string;
  status: string;
  score: number;
  updateDate: string;
  sensitive: boolean;
  updateEntryDur: string;
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