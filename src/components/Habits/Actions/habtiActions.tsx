import axios from "axios";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { Habit } from "../../Shared/types";
import { RootState } from "../Reducers";

// Action Types
export const GET_HABITS = "GET_HABITS";
export const UPDATE_HABIT = "UPDATE_HABIT";
export const CREATE_HABIT = "CREATE_HABIT";
export const DELETE_HABIT = "DELETE_HABIT";

interface GetHabitsAction {
  type: typeof GET_HABITS;
  payload: Habit[];
}

interface UpdateHabitAction {
  type: typeof UPDATE_HABIT;
  payload: Habit;
}

interface CreateHabitAction {
  type: typeof CREATE_HABIT;
  payload: Habit;
}

interface DeleteHabitAction {
  type: typeof DELETE_HABIT;
  payload: number;
}

export type HabitActionTypes =
  | GetHabitsAction
  | UpdateHabitAction
  | CreateHabitAction
  | DeleteHabitAction;

// Action Creators
export const getHabits = (
  userId: number
): ThunkAction<void, RootState, unknown, HabitActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`/api/users/${userId}/habits`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: GET_HABITS, payload: response.data });
    } catch (error) {
      console.error("Error fetching habits:", error);
    }
  };
};

export const updateHabit = (
  userId: number,
  habitId: number,
  change: number
): ThunkAction<void, RootState, unknown, HabitActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.patch(
        `/api/users/${userId}/habits/${habitId}`,
        { change },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: UPDATE_HABIT, payload: response.data });
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };
};

export const createHabit = (
  userId: number,
  habitData: Habit
): ThunkAction<void, RootState, unknown, HabitActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `/api/users/${userId}/habits`,
        habitData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch({ type: CREATE_HABIT, payload: response.data });
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };
};

export const deleteHabit = (
  userId: number,
  habitId: number
): ThunkAction<void, RootState, unknown, HabitActionTypes> => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`/api/users/${userId}/habits/${habitId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch({ type: DELETE_HABIT, payload: habitId });
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };
};
