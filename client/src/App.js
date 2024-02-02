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

const App = () => (
  <Router>
    <Navbar />
    <section className="container">
      <Routes>
        <Route exact path="/" element={<Landing />}/>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </section>
  </Router>
);

export default App;
