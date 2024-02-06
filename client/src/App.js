import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Alert } from "./components/layout/Alert";
import { useEffect } from "react";
import useAuth from "./useAuth";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  const { loadUser } = useAuth();

  if (localStorage.token) {
    setAuthToken(localStorage.getItem("token"));
  }

  useEffect(() => {
    if(localStorage.token){
      loadUser();
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
        </Routes>
      </section>
    </Router>
  );
};

export default App;
