import {
  CLEAR_TIMEBOX,
  GET_TIMEBOX,
  MARK_TASK_TIMEBOX,
  UPDATE_TIMEBOX,
} from "../actions/timeboxActions";
import { Timebox } from "../types/timeboxActionTypes";

// Define action types
interface GetTimeboxAction {
  type: typeof GET_TIMEBOX;
  payload: Timebox;
}

interface UpdateTimeboxAction {
  type: typeof UPDATE_TIMEBOX;
  payload: {
    updatedTimebox: Timebox;
  };
}

interface ClearTimeboxAction {
  type: typeof CLEAR_TIMEBOX;
}

interface UpdateTaskCompletionAction {
  type: typeof MARK_TASK_TIMEBOX;
  payload: {
    taskId: number;
    completed: boolean;
  };
}

export type TimeboxActionTypes =
  | GetTimeboxAction
  | UpdateTimeboxAction
  | ClearTimeboxAction
  | UpdateTaskCompletionAction;

interface TimeboxState {
  timebox: Timebox | null;
}

const initialState: TimeboxState = {
  timebox: null,
};

const timeboxReducer = (
  state = initialState,
  action: TimeboxActionTypes
): TimeboxState => {
  switch (action.type) {
    case GET_TIMEBOX:
      return {
        ...state,
        timebox: action.payload,
      };

    case UPDATE_TIMEBOX:
      return {
        ...state,
        timebox: action.payload.updatedTimebox,
      };

    // case CLEAR_TIMEBOX:
    //   return {
    //     ...state,
    //     timebox: {
    //       startTime: 0,
    //       hours: 0,
    //       notes: "",
    //       tasks: [],
    //       timeboxId: state.timebox?.timeboxId,
    //     },
    //   };

    case MARK_TASK_TIMEBOX:
      if (!state.timebox) return state;

      return {
        ...state,
        timebox: {
          ...state.timebox,
          tasks: state.timebox.tasks.map((task) =>
            task.taskId === action.payload.taskId
              ? { ...task, completed: action.payload.completed }
              : task
          ),
        },
      };

    default:
      return state;
  }
};

export default timeboxReducer;
