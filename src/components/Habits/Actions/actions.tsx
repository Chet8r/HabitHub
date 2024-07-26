// src/redux/actions.ts
export const TOGGLE_SENSITIVE_DATA = "TOGGLE_SENSITIVE_DATA";
export const TOGGLE_FRIEND_ACTIVITY = "TOGGLE_FRIEND_ACTIVITY";

export const toggleSensitiveData = () => ({
  type: TOGGLE_SENSITIVE_DATA,
});

export const toggleFriendActivity = () => ({
  type: TOGGLE_FRIEND_ACTIVITY,
});
