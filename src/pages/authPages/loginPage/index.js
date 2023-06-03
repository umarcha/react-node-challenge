import React, {useState} from "react";
import "../style.css"; // Import the CSS file
import Spinner from "../../../components/spinner";
import axios from "axios";
import {Link} from "react-router-dom";
import {endpoints} from "../../../services/constants";

function LoginPage({onLogin}) {
 const [isLoading, setIsLoading] = useState(false);
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  localStorage.setItem("loginToken", true);

  var data = JSON.stringify({
   email: email,
   password: password,
  });

  setIsLoading(true);

  let res = await axios.post(endpoints.LOGIN, data, {
   headers: {
    "Content-Type": "application/json", // Example header
   },
  });

  if (res.status == 200) {
   localStorage.setItem("userData", JSON.stringify(res.data));

   onLogin();
  }
  setIsLoading(false);
 };

 return (
  <form onSubmit={handleSubmit} className='centered-form  signup-form'>
   <Spinner loading={isLoading} />
   <h2>Login</h2>
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
   <button type='submit'>Login</button>
   <Link to='/signup'>
    <p>Create new user! Register</p>
   </Link>
  </form>
 );
}

export default LoginPage;
