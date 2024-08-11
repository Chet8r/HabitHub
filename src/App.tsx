import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Habit from "./components/Habits/Habit";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Profile from "./components/User/Profile";

import "./index.css";
import store from "./components/Habits/Shared/store";
import { AuthProvider } from "./components/User/AuthContext";
import ProtectedRoute from "./components/User/ProtectedRoute";
import MainLayout from "./components/Shared/MainLayout";
import TimeboxDaily from "./components/TimeBox/Timebox";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Habit />} />
                <Route path="/timebox" element={<TimeboxDaily />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
