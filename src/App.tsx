import { Provider } from "react-redux";
import Habit from "./components/Habits/Habit";
import Nav from "./components/Shared/Nav";
import "./index.css";
import store from "./components/Habits/Shared/store";

function App() {
  return (
    <Provider store={store}>
      <Nav />
      <Habit />
    </Provider>
  );
}

export default App;
