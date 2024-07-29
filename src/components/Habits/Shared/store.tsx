import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers/index"; // Adjust path as needed
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
