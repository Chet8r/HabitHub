// src/reducers/userReducer.ts
import {
  UserActionTypes,
  FETCH_USER,
} from "../../Shared/actionTypes/userActionTypes";
import { UserData } from "../../Shared/types";

interface UserState {
  loading: boolean;
  data: UserData | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  data: null,
  error: null,
};

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USER.START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USER.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
