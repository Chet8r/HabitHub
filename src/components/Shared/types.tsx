export interface DurationType {
  name: string;
  value: number;
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

export interface User {
  userId: number;
  firstname: string;
  habits: Habit[];
  habitLog: HabitLog[];
  hideSensitive: boolean;
}

// export interface User {
//   userId: number;
//   name: string;
//   hideSensitive: number;
// }

// export interface Habit {
//   id: number;
//   userId: number;
//   habitName: string;
//   status: string;
//   score: number;
//   updateDate: string;
//   IsSensitive: number;
//   updateEntryDurValue: number;
//   updateEntryDurName: string;
// }

export interface UserData {
  user: User;
  habits: Habit[];
}
