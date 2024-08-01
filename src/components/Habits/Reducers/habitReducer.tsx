import { Habit } from "../../Shared/types";
import {
  CREATE_HABIT,
  DELETE_HABIT,
  GET_HABITS,
  HabitActionTypes,
  UPDATE_HABIT,
} from "../Actions/habtiActions";

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitReducer = (
  state = initialState,
  action: HabitActionTypes
): HabitState => {
  switch (action.type) {
    case GET_HABITS:
      return {
        ...state,
        habits: action.payload,
      };
    case UPDATE_HABIT:
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.updatedHabit.id
            ? action.payload.updatedHabit
            : habit
        ),
      };
    case CREATE_HABIT:
      return {
        ...state,
        habits: [...state.habits, action.payload.newHabit],
      };
    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };
    default:
      return state;
  }
};

export default habitReducer;
