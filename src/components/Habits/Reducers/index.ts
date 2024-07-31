import { combineReducers } from "redux";
import userReducer from "./userReducer";
import navReducer from "./NavReducer";
import habitReducer from "./habitReducer";

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
  habit: habitReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
