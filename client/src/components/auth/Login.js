import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e){
    e.preventDefault();
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const user = {email, password};
        const body = JSON.stringify(user);
        const res = await axios.post('/api/auth', body, config); // proxy in package.json
        console.log(res.data);
      } catch (error) {
        console.error(error.response.data);
      }
    }

  return (
    <>
      <h1 className="large text-primary">Login</h1>

      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            name="email"
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minlength="6"
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account? 
        <Link to="/register"> Sign Up</Link>
      </p>
    </>
  );
};