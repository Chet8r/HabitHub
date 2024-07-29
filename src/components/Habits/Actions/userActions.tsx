import axios from "axios";
import { Dispatch } from "redux";
import {
  FETCH_USER,
  UserActionTypes,
} from "../../Shared/actionTypes/userActionTypes";

// Define the action creator with async logic
export const fetchUserData: any = (userId: number) => {
  return async (dispatch: Dispatch<UserActionTypes>) => {
    dispatch({ type: FETCH_USER.START });

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: FETCH_USER.SUCCESS,
        payload: response.data, // Adjust according to your API response
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_USER.FAILURE,
        error: error.message || "An error occurred",
      });
    }
  };
};
