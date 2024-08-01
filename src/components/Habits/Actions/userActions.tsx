import { Dispatch } from "redux";
import {
  FETCH_USER,
  UserActionTypes,
} from "../../Shared/actionTypes/userActionTypes";
import { fetchUser } from "./api";

export const fetchUserData: any = (
  userId: number
): ((dispatch: Dispatch<UserActionTypes>) => Promise<void>) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: FETCH_USER.START });

    try {
      const data = await fetchUser(userId);

      dispatch({
        type: FETCH_USER.SUCCESS,
        payload: data, // Adjust according to your API response
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_USER.FAILURE,
        error: error.message || "An error occurred",
      });
    }
  };
};
