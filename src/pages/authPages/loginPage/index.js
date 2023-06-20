import React, { useState } from "react";
import "../style.css"; // Import the CSS file
import Spinner from "../../../components/spinner";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { endpoints } from "../../../services/constants";

function LoginPage() {
    const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      let res = await axios.post(
        endpoints.LOGIN,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Example header
          },
        }
      );

      localStorage.setItem("userData", JSON.stringify(res?.data?.data?.user));
      localStorage.setItem("loginToken", res?.data?.data?.token);
      setError("")
      setIsLoading(false);
      navigate("/")

    } catch (error) {
      setIsLoading(false);
      const errMsg = error?.response?.data
    ? error?.response?.data?.message
    : error;
      setError(errMsg)
      console.log("error", error);
    }
  };
  if(isLoading){
    return  <Spinner loading={isLoading} />
  }
  return (
    <form onSubmit={handleSubmit} className="centered-form  signup-form">
 
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {Error && <p style={{color:"red"}}>{Error}</p>}
      <button type="submit">Login</button>
      <Link to="/signup">
        <p>Create new user! Register</p>
      </Link>
    </form>
  );
}

export default LoginPage;
