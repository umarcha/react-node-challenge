import React, { useState } from "react";
import "../style.css"; // Import the CSS file
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../components/spinner";
import axios from "axios";
import { endpoints } from "../../../services/constants";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
      } else if (password.length < 8) {
        setError("Password should be at least 8 characters long");
      } else {
        setIsLoading(true);
        await axios.post(
          endpoints.REGISTER,
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json", // Example header
            },
          }
        );

        setPassword("");
        setConfirmPassword("");
        setError("");
        navigate("/");

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      const errMsg = error?.response?.data
        ? error?.response?.data?.message
        : error;
      setError(errMsg);
      console.log("error", error);
    }
  };
  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }
  return (
    <form onSubmit={handleSubmit} className="centered-form  signup-form">
      <Spinner loading={isLoading} />
      <h2>Sign Up</h2>

      <input
        type="name"
        placeholder="FirstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="name"
        placeholder="LastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {Error && <p style={{ color: "red" }}>{Error}</p>}
      <button type="submit">Sign Up</button>
      <Link to="/">
        <p>Already have an account! SignIn</p>
      </Link>
    </form>
  );
};

export default RegisterPage;
