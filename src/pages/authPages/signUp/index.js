import React, {useState} from "react";
import "../style.css"; // Import the CSS file
import {Link, useNavigate} from "react-router-dom";
import Spinner from "../../../components/spinner";
import axios from "axios";
import {endpoints} from "../../../services/constants";
const RegisterPage = () => {
 const navigate = useNavigate();

 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [confirmPassword, setConfirmPassword] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
   setPasswordError("Passwords do not match");
  } else if (password.length < 8) {
   setPasswordError("Password should be at least 8 characters long");
  } else {
   // Perform form submission logic here

   var data = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
   });

   setIsLoading(true);
   let res = await axios.post(endpoints.REGISTER, data, {
    headers: {
     "Content-Type": "application/json", // Example header
    },
   });

   if (res?.status === 200) {
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    navigate("/");
   }
   setIsLoading(false);
  }
 };

 return (
  <form onSubmit={handleSubmit} className='centered-form  signup-form'>
   <Spinner loading={isLoading} />
   <h2>Sign Up</h2>

   <input
    type='name'
    placeholder='FirstName'
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    required
   />
   <input
    type='name'
    placeholder='LastName'
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    required
   />
   <input
    type='email'
    placeholder='Email'
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
   />
   <input
    type='password'
    placeholder='Password'
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
   />
   <input
    type='password'
    placeholder='Confirm Password'
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
   />
   {passwordError && <p className='error'>{passwordError}</p>}
   <button type='submit'>Sign Up</button>
   <Link to='/'>
    <p>Already have an account! SignIn</p>
   </Link>
  </form>
 );
};

export default RegisterPage;
