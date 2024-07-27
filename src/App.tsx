import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Habit from "./components/Habits/Habit";
import Nav from "./components/Shared/Nav";
import "./index.css";
import store from "./components/Habits/Shared/store";
import Login from "./components/User/Login";
import Register from "./components/User/Register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Habit />
              </>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
