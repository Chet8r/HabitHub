import { Dispatch } from "redux";
import {
  FETCH_USER,
  UserActionTypes,
} from "../../Shared/actionTypes/userActionTypes";
import { fetchUser } from "./api";

export const fetchUserData: any = (userId: number) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: FETCH_USER.START });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const data = await fetchUser(userId, token);

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
