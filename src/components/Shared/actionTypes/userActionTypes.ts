// src/Shared/actionTypes/userActionTypes.ts

import { UserData } from "../types";

export const FETCH_USER = {
  START: "FETCH_USER_START",
  SUCCESS: "FETCH_USER_SUCCESS",
  FAILURE: "FETCH_USER_FAILURE",
} as const;

interface FetchUserStartAction {
  type: typeof FETCH_USER.START;
}

interface FetchUserSuccessAction {
  type: typeof FETCH_USER.SUCCESS;
  payload: UserData; // Adjust based on your API response
}

interface FetchUserFailureAction {
  type: typeof FETCH_USER.FAILURE;
  error: string;
}

export type UserActionTypes =
  | FetchUserStartAction
  | FetchUserSuccessAction
  | FetchUserFailureAction;
