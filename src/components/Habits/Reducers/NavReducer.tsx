import {
  TOGGLE_FRIEND_ACTIVITY,
  TOGGLE_SENSITIVE_DATA,
} from "../Actions/actions";

export interface AppState {
  sensitiveDataHidden: boolean;
  friendActivityVisible: boolean;
}

const initialState: AppState = {
  sensitiveDataHidden: false,
  friendActivityVisible: false,
};

interface Action {
  type: string;
  payload?: any;
}

const NavReducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case TOGGLE_SENSITIVE_DATA:
      return {
        ...state,
        sensitiveDataHidden: !state.sensitiveDataHidden,
      };
    case TOGGLE_FRIEND_ACTIVITY:
      return {
        ...state,
        friendActivityVisible: !state.friendActivityVisible,
      };
    default:
      return state;
  }
};

export default NavReducer;
