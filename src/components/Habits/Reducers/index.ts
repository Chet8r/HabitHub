import { combineReducers } from "redux";
import userReducer from "./userReducer";
import navReducer from "./NavReducer";
import habitReducer from "./habitReducer";
import timeboxReducer from "../../TimeBox/reducers/timeboxReducer";

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
  habit: habitReducer,
  timebox: timeboxReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
