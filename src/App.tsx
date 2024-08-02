import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Habit from "./components/Habits/Habit";
import Nav from "./components/Shared/Nav";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import "./index.css";
import store from "./components/Habits/Shared/store";
import { AuthProvider } from "./components/User/AuthContext";
import ProtectedRoute from "./components/User/ProtectedRoute";
import Profile from "./components/User/Profile";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <>
                  <Nav />
                  <Profile />
                </>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={
                  <>
                    <Nav />
                    <Habit />
                  </>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
