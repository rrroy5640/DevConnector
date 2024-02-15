import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Alert } from "./components/layout/Alert";
import { Dashboard } from "./components/dashboard/Dashboard";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import setAuthToken from "./utils/setAuthToken";
import useProfile from "./hooks/useProfile";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { CreateProfileRoute } from "./components/routing/CreateProfileRoute";
import { CreateProfile } from "./components/layout/profileForm/CreateProfile";
import { EditProfile } from "./components/layout/profileForm/EditProfile";
import { AddEducation } from "./components/layout/profileForm/AddEducation";
import { AddExperience } from "./components/layout/profileForm/AddExperience";
import { Profiles } from "./components/profile/Profiles";
import { ProfilePage } from "./components/profile/ProfilePage";

const App = () => {
  const { loadUser } = useAuth();
  const { getProfile } = useProfile();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        loadUser();
        getProfile();
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <section className="container">
        <Alert />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-profile"
            element={
              <CreateProfileRoute>
                <CreateProfile />
              </CreateProfileRoute>
            }
          />
          <Route path="edit-profile" element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
            }/>
            <Route path="add-education" element={
            <PrivateRoute>
              <AddEducation />
            </PrivateRoute>
            } />
            <Route path="add-experience" element={
            <PrivateRoute>
              <AddExperience />
            </PrivateRoute>
            } />
            <Route path="profiles" element={
            <Profiles />
            } />
            <Route path="profile/:id" element={
            <PrivateRoute>
              <ProfilePage/>
            </PrivateRoute>
            } />
        </Routes>
      </section>
    </Router>
  );
};

export default App;
