// Action Types
export const GET_TIMEBOX = "GET_TIMEBOX";
export const UPDATE_TIMEBOX = "UPDATE_TIMEBOX";
export const CLEAR_TIMEBOX = "CLEAR_TIMEBOX";
export const UPDATE_TASK = "UPDATE_TASK";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface Timebox {
  startTime: number;
  hours: number;
  notes: string;
  tasks: Task[];
}

interface GetTimeboxAction {
  type: typeof GET_TIMEBOX;
  payload: Timebox; // Adjust according to your Timebox model
}

interface UpdateTimeboxPayload {
  message?: string;
  updatedTimebox: Timebox; // Adjust according to your Timebox model
}

interface UpdateTimeboxAction {
  type: typeof UPDATE_TIMEBOX;
  payload: UpdateTimeboxPayload;
}

interface ClearTimeboxAction {
  type: typeof CLEAR_TIMEBOX;
  payload: string; // Could be a success message or empty string
}

interface UpdateTaskAction {
  type: typeof UPDATE_TASK;
  payload: Task; // Adjust according to your Task model
}

export type TimeboxActionTypes =
  | GetTimeboxAction
  | UpdateTimeboxAction
  | ClearTimeboxAction
  | UpdateTaskAction;
