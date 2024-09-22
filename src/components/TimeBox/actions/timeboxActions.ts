import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../Habits/Reducers";
import { API_URL } from "../../Habits/Actions/api";

// Action Types
export const GET_TIMEBOX = "GET_TIMEBOX";
export const UPDATE_TIMEBOX = "UPDATE_TIMEBOX";
export const CLEAR_TIMEBOX = "CLEAR_TIMEBOX";
export const MARK_TASK_TIMEBOX = "MARK_TASK_TIMEBOX";

// Interfaces for actions
interface GetTimeboxAction {
  type: typeof GET_TIMEBOX;
  payload: TimeboxData;
}

interface UpdateTimeboxAction {
  type: typeof UPDATE_TIMEBOX;
  payload: TimeboxData;
}

interface ClearTimeboxAction {
  type: typeof CLEAR_TIMEBOX;
}

// Type for all timebox actions
export type TimeboxActionTypes =
  | GetTimeboxAction
  | UpdateTimeboxAction
  | ClearTimeboxAction;

// Interface for timebox data
export interface TimeboxData {
  startTime: number;
  hours: number;
  notes: string;
  tasks: Task[];
}

interface Task {
  text: string;
  completed: boolean;
}

// Action Creators

// Get Timebox
export const getTimebox: any = (
  userId: number
): ThunkAction<void, RootState, unknown, TimeboxActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/timebox/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: GET_TIMEBOX, payload: response.data });
    } catch (error) {
      console.error("Error fetching timebox data:", error);
    }
  };
};

// Update Timebox
export const updateTimebox: any = (
  userId: number,
  timeboxData: TimeboxData
): ThunkAction<void, RootState, unknown, TimeboxActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/timebox/${userId}`,
        timeboxData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: UPDATE_TIMEBOX, payload: response.data });
    } catch (error) {
      console.error("Error updating timebox data:", error);
    }
  };
};

// Clear Timebox
export const clearTimebox: any = (): TimeboxActionTypes => ({
  type: CLEAR_TIMEBOX,
});

// mark complate
export const updateTaskCompletion: any = (
  userId: number,
  taskIndex: number,
  completed: boolean
): ThunkAction<void, RootState, unknown, TimeboxActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `${API_URL}/timebox/${userId}/tasks`,
        {
          taskIndex,
          completed,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: MARK_TASK_TIMEBOX, payload: response.data });
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };
};
