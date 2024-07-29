import { combineReducers } from "redux";
import userReducer from "./userReducer";
import navReducer from "./NavReducer";

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
